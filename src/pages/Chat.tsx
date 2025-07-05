import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { sampleUsers } from "@/data/users";
import { ArrowLeft, Send, User, MoreVertical, Phone, Video, Smile } from "lucide-react";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const user = sampleUsers.find(u => u.id === userId);
  
  // Sample conversation with more realistic flow
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I saw we're a great match for roommates. I'd love to chat about living together! 😊",
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 45) // 45 minutes ago
    },
    {
      id: "2",
      text: "What kind of living arrangement are you looking for?",
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 43) // 43 minutes ago
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">User not found</h1>
          <p className="text-muted-foreground font-body">This conversation may have been removed.</p>
          <Button onClick={() => navigate("/matches")} className="bg-gradient-primary text-white">
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
        text: message.trim(),
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

  const formatDate = (timestamp: Date) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-white/20 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/matches")}
                className="p-2 hover:bg-white/50 transition-smooth group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-spring" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-md">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white" />
                </div>
                <div>
                  <h1 className="font-display font-semibold text-foreground text-lg">{user.name}</h1>
                  <p className="text-sm text-muted-foreground font-body">
                    {user.compatibilityScore}% compatible • Online now
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-white/50 transition-smooth"
              >
                <Phone className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-white/50 transition-smooth"
              >
                <Video className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`/profile/${user.id}`)}
                className="bg-white/50 border-border/50 hover:bg-white/80 transition-smooth font-body"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {/* Date Header */}
          <div className="px-6 py-4 text-center">
            <div className="inline-block bg-white/60 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 shadow-sm">
              <span className="text-sm font-medium text-muted-foreground font-body">
                {formatDate(messages[0]?.timestamp || new Date())}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-sm lg:max-w-md ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <Card className={`p-4 shadow-md border-0 transition-spring hover:shadow-lg ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-primary text-white' 
                        : 'bg-white/80 backdrop-blur-sm text-foreground'
                    }`}>
                      <p className="font-body leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-2 ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </Card>
                  </div>
                  
                  {msg.sender === 'other' && (
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mr-3 mt-1 shadow-sm flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white/90 backdrop-blur-md border-t border-white/20 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message ${user.name}...`}
                className="pr-12 h-12 border-border/50 focus:ring-primary/20 focus:border-primary transition-smooth font-body bg-white/50 backdrop-blur-sm"
                maxLength={500}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-muted/50 transition-smooth"
              >
                <Smile className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
            
            <Button 
              type="submit" 
              disabled={!message.trim()}
              className="h-12 px-6 bg-gradient-primary text-white shadow-colored hover:shadow-glow transition-spring disabled:opacity-50 disabled:cursor-not-allowed group font-body"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-spring" />
            </Button>
          </form>
          
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground font-body">
            <span>Press Enter to send</span>
            <span>{message.length}/500</span>
          </div>
        </div>
      </div>

      {/* Quick Actions (floating) */}
      <div className="fixed bottom-24 right-6 space-y-2 z-10">
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`/profile/${user.id}`)}
          className="bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-spring"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default Chat;