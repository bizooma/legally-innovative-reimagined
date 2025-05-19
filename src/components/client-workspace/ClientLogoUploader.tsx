
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ClientLogoUploaderProps {
  clientId: string;
  existingLogoUrl?: string | null;
  onLogoUpdated: (logoUrl: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const ClientLogoUploader: React.FC<ClientLogoUploaderProps> = ({
  clientId,
  existingLogoUrl,
  onLogoUpdated,
  size = 'md',
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const getAvatarSize = () => {
    switch (size) {
      case 'sm': return 'h-10 w-10';
      case 'lg': return 'h-20 w-20';
      default: return 'h-16 w-16';
    }
  };

  const getInitial = (companyName: string) => {
    return companyName?.charAt(0)?.toUpperCase() || '?';
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Logo image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Create a unique file path for the logo
      const fileExt = file.name.split('.').pop();
      const filePath = `${clientId}/logo-${Date.now()}.${fileExt}`;
      
      // Upload the file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('client_logos')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;
      
      // Get the public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('client_logos')
        .getPublicUrl(filePath);
      
      const logoUrl = publicUrlData.publicUrl;
      
      // Update the client record with the new logo URL
      const { error: updateError } = await supabase
        .from('clients')
        .update({ logo_url: logoUrl })
        .eq('id', clientId);
        
      if (updateError) throw updateError;
      
      // Call the onLogoUpdated callback with the new URL
      onLogoUpdated(logoUrl);
      
      toast({
        title: "Logo uploaded",
        description: "Client logo has been updated successfully",
      });
      
    } catch (error: any) {
      console.error("Error uploading logo:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Could not upload logo",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${getAvatarSize()}`}>
        <Avatar className={`${getAvatarSize()} border-2 border-primary/10`}>
          {existingLogoUrl ? (
            <AvatarImage src={existingLogoUrl} alt="Client logo" />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-primary">
            <Image className="h-6 w-6 text-muted-foreground/70" />
          </AvatarFallback>
        </Avatar>
        
        <label 
          htmlFor={`logo-upload-${clientId}`}
          className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer shadow-md hover:bg-primary/90 transition-colors"
        >
          <Upload size={14} />
          <input 
            id={`logo-upload-${clientId}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>
      
      {isUploading && (
        <p className="text-xs text-muted-foreground animate-pulse">Uploading...</p>
      )}
    </div>
  );
};

export default ClientLogoUploader;
