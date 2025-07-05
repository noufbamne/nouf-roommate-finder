import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

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

  const PreferenceCard = ({ 
    title, 
    description, 
    options, 
    value, 
    onChange 
  }: {
    title: string;
    description: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
  }) => (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-primary">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={value} onValueChange={onChange}>
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );

  const isComplete = Object.values(preferences).every(value => value !== "");

  return (
    <div className="min-h-screen bg-gradient-secondary p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Tell us about yourself</h1>
          <p className="text-muted-foreground">
            Help us find your most compatible roommates
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <PreferenceCard
            title="Cleanliness Level"
            description="How do you prefer to keep your living space?"
            options={["Low", "Medium", "High"]}
            value={preferences.cleanliness}
            onChange={(value) => updatePreference("cleanliness", value)}
          />

          <PreferenceCard
            title="Sleep Schedule"
            description="When do you typically go to bed?"
            options={["Early Sleeper", "Late Sleeper"]}
            value={preferences.sleepSchedule}
            onChange={(value) => updatePreference("sleepSchedule", value)}
          />

          <PreferenceCard
            title="Study Style"
            description="How do you prefer to study?"
            options={["Quiet & Alone", "Group Study", "Scheduled Study", "Flexible"]}
            value={preferences.studyStyle}
            onChange={(value) => updatePreference("studyStyle", value)}
          />

          <PreferenceCard
            title="Social Nature"
            description="How would you describe your social personality?"
            options={["Introvert", "Extrovert", "Neutral"]}
            value={preferences.socialNature}
            onChange={(value) => updatePreference("socialNature", value)}
          />

          <Button
            type="submit"
            disabled={!isComplete}
            className="w-full bg-gradient-primary text-white shadow-medium disabled:opacity-50"
            size="lg"
          >
            Find My Matches
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;