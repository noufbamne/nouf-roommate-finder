import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompatibilityBadge } from "@/components/ui/compatibility-badge";
import { sampleUsers } from "@/data/users";
import { ArrowLeft, MessageCircle, User, Clock, BookOpen, Users, Sparkles, Heart, Star, CheckCircle2 } from "lucide-react";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const user = sampleUsers.find(u => u.id === userId);
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-mesh flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">User not found</h1>
          <p className="text-muted-foreground font-body">This profile may have been removed or doesn't exist.</p>
          <Button onClick={() => navigate("/matches")} className="bg-gradient-primary text-white">
            Back to Matches
          </Button>
        </div>
      </div>
    );
  }

  const preferenceIcons = {
    cleanliness: Sparkles,
    sleepSchedule: Clock,
    studyStyle: BookOpen,
    socialNature: Users
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "text-compatibility-excellent";
    if (score >= 80) return "text-compatibility-high";
    if (score >= 70) return "text-compatibility-good";
    if (score >= 60) return "text-compatibility-medium";
    return "text-compatibility-low";
  };

  const PreferenceItem = ({ 
    label, 
    value, 
    icon: Icon 
  }: { 
    label: string; 
    value: string; 
    icon: any;
  }) => (
    <div className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/70 transition-smooth group">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-spring">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground font-body">{label}</p>
          <p className="text-sm text-muted-foreground font-body">{value}</p>
        </div>
        <CheckCircle2 className="w-5 h-5 text-success" />
      </div>
    </div>
  );

  const compatibilityScore = user.compatibilityScore || 0;

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/matches")}
              className="p-2 hover:bg-white/50 transition-smooth group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-spring" />
            </Button>
            
            <h1 className="text-xl font-display font-semibold text-foreground">Profile Details</h1>
            
            <div className="w-10" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Profile Header */}
        <Card className="shadow-2xl border-0 bg-gradient-card overflow-hidden relative">
          {compatibilityScore >= 90 && (
            <div className="absolute top-0 right-0 bg-gradient-primary text-white px-4 py-2 rounded-bl-3xl">
              <div className="flex items-center space-x-1 text-sm font-medium">
                <Star className="w-4 h-4" />
                <span>Perfect Match</span>
              </div>
            </div>
          )}

          <CardHeader className="text-center space-y-6 pb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-colored">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border-4 border-background flex items-center justify-center">
                <Heart className={`w-4 h-4 ${getCompatibilityColor(compatibilityScore)}`} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <CardTitle className="text-3xl font-display font-bold text-foreground">{user.name}</CardTitle>
                <CardDescription className="text-lg font-body text-muted-foreground">
                  {user.age} years old • Looking for roommate
                </CardDescription>
              </div>
              
              <CompatibilityBadge 
                score={compatibilityScore} 
                className="mx-auto shadow-md"
              />
            </div>
          </CardHeader>
        </Card>

        {/* About Section */}
        <Card className="shadow-lg border-0 bg-gradient-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-display text-foreground flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              About {user.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed font-body text-lg">
              {user.bio}
            </p>
          </CardContent>
        </Card>
        
        {/* Living Preferences */}
        <Card className="shadow-lg border-0 bg-gradient-card">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-display text-foreground flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              Living Preferences
            </CardTitle>
            <CardDescription className="font-body">
              See how your preferences align with {user.name}'s lifestyle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PreferenceItem
                label="Cleanliness Level"
                value={user.preferences.cleanliness}
                icon={preferenceIcons.cleanliness}
              />
              <PreferenceItem
                label="Sleep Schedule"
                value={user.preferences.sleepSchedule}
                icon={preferenceIcons.sleepSchedule}
              />
              <PreferenceItem
                label="Study Style"
                value={user.preferences.studyStyle}
                icon={preferenceIcons.studyStyle}
              />
              <PreferenceItem
                label="Social Nature"
                value={user.preferences.socialNature}
                icon={preferenceIcons.socialNature}
              />
            </div>
          </CardContent>
        </Card>

        {/* Compatibility Insights */}
        <Card className="shadow-lg border-0 bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-xl font-display text-foreground flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              Why You're Compatible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-body text-foreground">Similar lifestyle preferences</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-info/10 border border-info/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-info" />
                <span className="font-body text-foreground">Compatible study habits</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-warning" />
                <span className="font-body text-foreground">Matching social energy levels</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            onClick={() => navigate(`/chat/${user.id}`)}
            className="flex-1 h-14 bg-gradient-primary text-white font-semibold shadow-colored hover:shadow-glow transition-spring group font-body text-lg"
            size="lg"
          >
            <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-spring" />
            Start Conversation
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate("/matches")}
            className="flex-1 h-14 border-border/50 hover:bg-muted/30 transition-smooth font-body text-lg"
            size="lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Matches
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;