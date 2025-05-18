
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail } from 'lucide-react';

interface ClientCommunicationProps {
  clientId: string;
  clientName: string;
}

const ClientCommunication: React.FC<ClientCommunicationProps> = ({ clientId, clientName }) => {
  const [message, setMessage] = useState('');
  
  // This would be a real API call in a production app
  const messages = [
    {
      id: '1',
      sender: 'Joe Smith',
      role: 'Marketing Specialist',
      content: 'Hello! I\'ve uploaded the revised campaign strategy based on our discussion. Please take a look when you have a chance.',
      timestamp: '2025-05-16T10:30:00',
      isClient: false
    },
    {
      id: '2',
      sender: clientName,
      role: 'Client',
      content: 'Thank you! I\'ll review it today and get back to you with feedback.',
      timestamp: '2025-05-16T11:15:00',
      isClient: true
    },
    {
      id: '3',
      sender: 'Joe Smith',
      role: 'Marketing Specialist',
      content: 'Great! Looking forward to your thoughts. Also, we should schedule our monthly review meeting for next week.',
      timestamp: '2025-05-16T11:20:00',
      isClient: false
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // In a real app, you would send this message to your backend
    console.log('Sending message:', message);
    
    // Clear the input
    setMessage('');
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-320px)] min-h-[500px]">
      <CardHeader>
        <CardTitle>Communication</CardTitle>
        <CardDescription>Message history with {clientName}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow overflow-hidden">
        <div className="flex-grow overflow-y-auto mb-4 space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`flex ${msg.isClient ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-4 ${
                  msg.isClient 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                <div className="flex items-center mb-1">
                  <p className="font-medium text-sm">{msg.sender}</p>
                  <span className="mx-2 text-xs">•</span>
                  <p className="text-xs">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No messages yet</p>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="mt-auto">
          <div className="flex gap-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="min-h-[60px]"
            />
            <Button type="submit" className="self-end" disabled={!message.trim()}>
              <Mail className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClientCommunication;
