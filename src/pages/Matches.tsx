import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompatibilityBadge } from "@/components/ui/compatibility-badge";
import { sampleUsers } from "@/data/users";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, User } from "lucide-react";

const Matches = () => {
  const navigate = useNavigate();
  
  const sortedMatches = [...sampleUsers].sort((a, b) => (b.compatibilityScore || 0) - (a.compatibilityScore || 0));

  const getHighlights = (user: typeof sampleUsers[0]) => {
    const highlights = [];
    if (user.preferences.sleepSchedule === "Late Sleeper") highlights.push("Night Owl");
    if (user.preferences.cleanliness === "High") highlights.push("Very Clean");
    if (user.preferences.studyStyle === "Quiet & Alone") highlights.push("Quiet Studier");
    return highlights.slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-secondary p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Your Matches</h1>
          <p className="text-muted-foreground">
            Found {sortedMatches.length} compatible roommates for you
          </p>
        </div>

        <div className="space-y-4">
          {sortedMatches.map((user) => {
            const highlights = getHighlights(user);
            
            return (
              <Card key={user.id} className="shadow-medium hover:shadow-strong transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{user.name}</CardTitle>
                        <CardDescription>Age {user.age}</CardDescription>
                      </div>
                    </div>
                    
                    <CompatibilityBadge score={user.compatibilityScore || 0} />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {user.bio}
                  </p>
                  
                  {highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {highlights.map((highlight) => (
                        <Badge key={highlight} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex space-x-3 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/profile/${user.id}`)}
                      className="flex-1"
                    >
                      View Profile
                    </Button>
                    
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/chat/${user.id}`)}
                      className="flex-1 bg-gradient-primary text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/preferences")}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Update Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Matches;