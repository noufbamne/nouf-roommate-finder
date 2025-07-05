import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { sampleUsers } from "@/data/users";
import { ArrowLeft, Send, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  
  const user = sampleUsers.find(u => u.id === userId);
  
  // Sample conversation starter
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I saw we're a great match. I'd love to chat about being roommates!",
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    }
  ]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">User not found</h1>
          <Button onClick={() => navigate("/matches")} className="mt-4">
            Back to Matches
          </Button>
        </div>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-secondary flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-soft p-4">
        <div className="max-w-2xl mx-auto flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/matches")}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-primary">{user.name}</h1>
              <p className="text-sm text-muted-foreground">
                {user.compatibilityScore}% compatible
              </p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/profile/${user.id}`)}
          >
            View Profile
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-xs p-3 ${
                msg.sender === 'user' 
                  ? 'bg-gradient-primary text-white' 
                  : 'bg-white shadow-soft'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {formatTime(msg.timestamp)}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border-muted focus:ring-primary"
            />
            <Button 
              type="submit" 
              disabled={!message.trim()}
              className="bg-gradient-primary text-white px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;