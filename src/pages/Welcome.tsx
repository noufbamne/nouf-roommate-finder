import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import { Heart, Users, Sparkles, ArrowRight } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-mesh flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-6 lg:p-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">RoomMate</span>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate("/auth")}
          className="border-border/50 hover:bg-muted/50 transition-smooth"
        >
          Sign In
        </Button>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 shadow-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  Find your perfect match
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-foreground leading-tight">
                Find Your Perfect
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Roommate
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-body">
                Connect with compatible roommates based on your lifestyle preferences, 
                study habits, and living style using our advanced matching algorithm.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-primary/20 blur-3xl rounded-full"></div>
              <img 
                src={heroImage} 
                alt="Happy roommates" 
                className="relative w-full h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-smooth">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Smart Matching</h3>
                <p className="text-muted-foreground text-sm">
                  Advanced algorithm matches you with compatible roommates
                </p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-smooth">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Perfect Matches</h3>
                <p className="text-muted-foreground text-sm">
                  Find roommates who share your lifestyle and preferences
                </p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-smooth">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Easy Chat</h3>
                <p className="text-muted-foreground text-sm">
                  Connect and chat with potential roommates safely
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-6">
              <Button 
                onClick={() => navigate("/auth")}
                size="lg"
                className="bg-gradient-primary text-white font-semibold px-12 py-4 text-lg shadow-colored hover:shadow-glow transition-spring group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
              
              <p className="text-muted-foreground text-sm">
                Join thousands of students finding their ideal roommate
                <br />
                <span className="text-primary font-medium">100% Free • No Credit Card Required</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 lg:p-8 text-center">
        <p className="text-muted-foreground text-sm">
          © 2024 RoomMate Finder. Made with ❤️ for students.
        </p>
      </footer>
    </div>
  );
};

export default Welcome;