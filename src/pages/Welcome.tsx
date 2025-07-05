import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <img 
            src={heroImage} 
            alt="Happy roommates" 
            className="w-64 h-36 mx-auto rounded-2xl shadow-medium object-cover"
          />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">RoomMate Finder</h1>
            <p className="text-xl text-white/90">Find your perfect roommate</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-white/80 text-lg leading-relaxed">
            Connect with compatible roommates based on your lifestyle preferences, 
            study habits, and living style.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => navigate("/auth")}
            className="w-full bg-white text-primary hover:bg-white/95 text-lg py-6 shadow-soft"
            size="lg"
          >
            Get Started
          </Button>
          
          <p className="text-white/60 text-sm">
            Join thousands of students finding their ideal roommate
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;