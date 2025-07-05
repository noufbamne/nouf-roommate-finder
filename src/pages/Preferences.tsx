import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles, Clock, BookOpen, Users, CheckCircle } from "lucide-react";

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    cleanliness: "",
    sleepSchedule: "",
    studyStyle: "",
    socialNature: ""
  });
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(preferences).every(value => value !== "")) {
      navigate("/matches");
    }
  };

  const updatePreference = (key: string, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const getProgress = () => {
    const completed = Object.values(preferences).filter(value => value !== "").length;
    return (completed / 4) * 100;
  };

  const PreferenceCard = ({ 
    title, 
    description, 
    options, 
    value, 
    onChange,
    icon: Icon
  }: {
    title: string;
    description: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    icon: any;
  }) => (
    <Card className="shadow-lg border-0 bg-gradient-card hover:shadow-xl transition-spring group">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-spring">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-display text-foreground flex items-center gap-2">
              {title}
              {value && <CheckCircle className="w-4 h-4 text-success" />}
            </CardTitle>
            <CardDescription className="font-body">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/30 transition-smooth group/option">
              <RadioGroupItem value={option} id={option} className="text-primary" />
              <Label 
                htmlFor={option} 
                className="cursor-pointer font-body flex-1 group-hover/option:text-primary transition-smooth"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );

  const isComplete = Object.values(preferences).every(value => value !== "");
  const progress = getProgress();

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-sm border-b border-white/20 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/auth")}
              className="p-2 hover:bg-white/50 transition-smooth"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                  <span>Setup Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>

            <div className="w-10" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 shadow-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Personalize your experience
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground">
            Tell us about
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              yourself
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Help us find your most compatible roommates by sharing your 
            lifestyle preferences and living habits.
          </p>
        </div>

        {/* Preference Cards */}
        <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PreferenceCard
              title="Cleanliness Level"
              description="How do you prefer to keep your living space?"
              options={["Low", "Medium", "High"]}
              value={preferences.cleanliness}
              onChange={(value) => updatePreference("cleanliness", value)}
              icon={Sparkles}
            />

            <PreferenceCard
              title="Sleep Schedule"
              description="When do you typically go to bed?"
              options={["Early Sleeper", "Late Sleeper"]}
              value={preferences.sleepSchedule}
              onChange={(value) => updatePreference("sleepSchedule", value)}
              icon={Clock}
            />

            <PreferenceCard
              title="Study Style"
              description="How do you prefer to study?"
              options={["Quiet & Alone", "Group Study", "Scheduled Study", "Flexible"]}
              value={preferences.studyStyle}
              onChange={(value) => updatePreference("studyStyle", value)}
              icon={BookOpen}
            />

            <PreferenceCard
              title="Social Nature"
              description="How would you describe your social personality?"
              options={["Introvert", "Extrovert", "Neutral"]}
              value={preferences.socialNature}
              onChange={(value) => updatePreference("socialNature", value)}
              icon={Users}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-8">
            <Button
              type="submit"
              disabled={!isComplete}
              size="lg"
              className={`px-12 py-4 text-lg font-semibold transition-spring group ${
                isComplete 
                  ? "bg-gradient-primary text-white shadow-colored hover:shadow-glow" 
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {isComplete ? (
                <>
                  Find My Matches
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
                </>
              ) : (
                "Complete all preferences first"
              )}
            </Button>
            
            {isComplete && (
              <p className="text-sm text-muted-foreground mt-4 animate-fade-in">
                Get ready to discover your perfect roommate matches!
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Preferences;