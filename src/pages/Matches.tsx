import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompatibilityBadge } from "@/components/ui/compatibility-badge";
import { sampleUsers } from "@/data/users";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, User, Settings, Sparkles, Star, TrendingUp } from "lucide-react";

const Matches = () => {
  const navigate = useNavigate();
  
  const sortedMatches = [...sampleUsers].sort((a, b) => (b.compatibilityScore || 0) - (a.compatibilityScore || 0));

  const getHighlights = (user: typeof sampleUsers[0]) => {
    const highlights = [];
    if (user.preferences.sleepSchedule === "Late Sleeper") highlights.push("Night Owl");
    if (user.preferences.cleanliness === "High") highlights.push("Very Clean");
    if (user.preferences.studyStyle === "Quiet & Alone") highlights.push("Quiet Studier");
    if (user.preferences.socialNature === "Extrovert") highlights.push("Social");
    return highlights.slice(0, 2);
  };

  const getMatchIcon = (score: number) => {
    if (score >= 90) return <Star className="w-4 h-4" />;
    if (score >= 80) return <TrendingUp className="w-4 h-4" />;
    return <Heart className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-display font-bold text-foreground">Your Matches</h1>
              <p className="text-muted-foreground font-body">
                Found {sortedMatches.length} highly compatible roommates
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/preferences")}
              className="bg-white/50 border-border/50 hover:bg-white/80 transition-smooth group"
            >
              <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-spring" />
              Update Preferences
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
            <div className="text-2xl font-display font-bold text-primary">
              {sortedMatches.filter(u => (u.compatibilityScore || 0) >= 80).length}
            </div>
            <div className="text-sm text-muted-foreground font-body">Great Matches</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
            <div className="text-2xl font-display font-bold text-success">
              {Math.round(sortedMatches.reduce((acc, u) => acc + (u.compatibilityScore || 0), 0) / sortedMatches.length)}%
            </div>
            <div className="text-sm text-muted-foreground font-body">Avg. Compatibility</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
            <div className="text-2xl font-display font-bold text-info">
              {sortedMatches.filter(u => (u.compatibilityScore || 0) >= 90).length}
            </div>
            <div className="text-sm text-muted-foreground font-body">Perfect Matches</div>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="space-y-6">
          {sortedMatches.map((user, index) => {
            const highlights = getHighlights(user);
            const isTopMatch = index === 0;
            
            return (
              <Card 
                key={user.id} 
                className={`shadow-lg border-0 bg-gradient-card hover:shadow-2xl transition-spring cursor-pointer group relative overflow-hidden ${
                  isTopMatch ? 'ring-2 ring-primary/20 shadow-colored' : ''
                }`}
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                {isTopMatch && (
                  <div className="absolute top-0 right-0 bg-gradient-primary text-white px-3 py-1 rounded-bl-2xl">
                    <div className="flex items-center space-x-1 text-xs font-medium">
                      <Star className="w-3 h-3" />
                      <span>Top Match</span>
                    </div>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-spring">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-background flex items-center justify-center">
                          {getMatchIcon(user.compatibilityScore || 0)}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-xl font-display text-foreground group-hover:text-primary transition-smooth">
                          {user.name}
                        </CardTitle>
                        <CardDescription className="font-body">
                          Age {user.age} • Looking for roommate
                        </CardDescription>
                      </div>
                    </div>
                    
                    <CompatibilityBadge score={user.compatibilityScore || 0} />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {user.bio}
                  </p>
                  
                  {highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {highlights.map((highlight) => (
                        <Badge 
                          key={highlight} 
                          variant="secondary" 
                          className="bg-primary/10 text-primary border-primary/20 font-body"
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex space-x-3 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${user.id}`);
                      }}
                      className="flex-1 border-border/50 hover:bg-muted/30 transition-smooth font-body"
                    >
                      View Profile
                    </Button>
                    
                    <Button 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/chat/${user.id}`);
                      }}
                      className="flex-1 bg-gradient-primary text-white shadow-colored hover:shadow-glow transition-spring group/btn font-body"
                    >
                      <MessageCircle className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-spring" />
                      Start Chat
                    </Button>
                  </div>
                </CardContent>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-primary/5 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />
              </Card>
            );
          })}
        </div>

        {/* Empty State Fallback */}
        {sortedMatches.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground">No matches yet</h3>
            <p className="text-muted-foreground font-body">
              Update your preferences to find compatible roommates
            </p>
            <Button onClick={() => navigate("/preferences")} className="bg-gradient-primary text-white">
              Update Preferences
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;