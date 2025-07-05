import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompatibilityBadge } from "@/components/ui/compatibility-badge";
import { sampleUsers } from "@/data/users";
import { ArrowLeft, MessageCircle, User, Clock, BookOpen, Users, Sparkles } from "lucide-react";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const user = sampleUsers.find(u => u.id === userId);
  
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

  const preferenceIcons = {
    cleanliness: Sparkles,
    sleepSchedule: Clock,
    studyStyle: BookOpen,
    socialNature: Users
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
    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
      <Icon className="w-5 h-5 text-primary" />
      <div>
        <p className="font-medium text-sm">{label}</p>
        <p className="text-muted-foreground text-xs">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-secondary p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/matches")}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-primary">Profile Details</h1>
        </div>

        <Card className="shadow-medium">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <User className="w-10 h-10 text-primary" />
            </div>
            
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="text-lg">Age {user.age}</CardDescription>
            </div>
            
            <CompatibilityBadge 
              score={user.compatibilityScore || 0} 
              className="mx-auto"
            />
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-primary mb-3">About</h3>
              <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-3">Living Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <PreferenceItem
                  label="Cleanliness"
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
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Button 
                onClick={() => navigate(`/chat/${user.id}`)}
                className="flex-1 bg-gradient-primary text-white shadow-medium"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;