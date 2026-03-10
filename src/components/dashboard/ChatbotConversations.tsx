import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Message {
  role: string;
  content: string;
}

interface Conversation {
  id: string;
  session_id: string;
  messages: Message[];
  visitor_section: string | null;
  message_count: number;
  created_at: string;
  updated_at: string;
}

export function ChatbotConversations() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ['chatbot-conversations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chatbot_conversations')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return (data as unknown as Conversation[]) || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('chatbot_conversations').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbot-conversations'] });
      toast.success('Conversation deleted');
    },
  });

  const filtered = conversations.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    const msgs = Array.isArray(c.messages) ? c.messages : [];
    return (
      msgs.some((m: Message) => m.content?.toLowerCase().includes(q)) ||
      c.visitor_section?.toLowerCase().includes(q)
    );
  });

  const getPreview = (msgs: Message[]) => {
    const first = (Array.isArray(msgs) ? msgs : []).find((m) => m.role === 'user');
    if (!first) return 'No user message';
    return first.content.length > 80 ? first.content.slice(0, 80) + '…' : first.content;
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading conversations...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="mx-auto h-10 w-10 mb-2 opacity-50" />
          <p>No conversations yet</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead>Section</TableHead>
                <TableHead className="text-center">Messages</TableHead>
                <TableHead className="w-[80px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <React.Fragment key={c.id}>
                  <TableRow
                    className="cursor-pointer"
                    onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                  >
                    <TableCell className="whitespace-nowrap text-sm">
                      {format(new Date(c.updated_at), 'MMM d, yyyy h:mm a')}
                    </TableCell>
                    <TableCell className="text-sm max-w-[300px] truncate">
                      {getPreview(c.messages)}
                    </TableCell>
                    <TableCell>
                      {c.visitor_section && (
                        <Badge variant="outline" className="text-xs">{c.visitor_section}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{c.message_count}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {expandedId === c.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={(e) => { e.stopPropagation(); deleteMutation.mutate(c.id); }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedId === c.id && (
                    <TableRow>
                      <TableCell colSpan={5} className="bg-muted/30 p-4">
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {(Array.isArray(c.messages) ? c.messages : []).map((m: Message, i: number) => (
                            <div key={i} className={`flex gap-3 ${m.role === 'assistant' ? '' : 'flex-row-reverse'}`}>
                              <Badge variant={m.role === 'user' ? 'default' : 'secondary'} className="h-6 shrink-0">
                                {m.role === 'user' ? 'User' : 'Biz'}
                              </Badge>
                              <p className={`text-sm whitespace-pre-wrap rounded-lg p-3 max-w-[80%] ${
                                m.role === 'user' ? 'bg-primary/10' : 'bg-muted'
                              }`}>
                                {m.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
