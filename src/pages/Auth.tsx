import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, Chrome, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication - in real app would validate credentials
    navigate("/preferences");
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="p-2 hover:bg-white/50 transition-smooth"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm animate-scale-in">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-colored">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <CardTitle className="text-3xl font-display font-bold text-foreground">
                {isLogin ? "Welcome back" : "Get started"}
              </CardTitle>
              <CardDescription className="text-lg font-body text-muted-foreground">
                {isLogin 
                  ? "Sign in to find your perfect roommate" 
                  : "Create your account to start matching"
                }
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground font-body">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="you@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 border-border/50 focus:ring-primary/20 focus:border-primary transition-smooth font-body"
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground font-body">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 h-12 border-border/50 focus:ring-primary/20 focus:border-primary transition-smooth font-body"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-primary text-white font-semibold shadow-colored hover:shadow-glow transition-spring font-body"
                size="lg"
              >
                {isLogin ? "Sign in to your account" : "Create your account"}
              </Button>
            </form>

            {/* Toggle Auth Mode */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-primary-dark font-medium transition-smooth font-body"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-muted-foreground font-body">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <Button 
              variant="outline" 
              className="w-full h-12 border-border/50 hover:bg-muted/30 transition-smooth group font-body"
              onClick={() => navigate("/preferences")}
            >
              <Chrome className="w-5 h-5 mr-3 group-hover:scale-110 transition-spring" />
              Continue with Google
            </Button>

            {/* Trust Badges */}
            <div className="pt-4 text-center space-y-2">
              <p className="text-xs text-muted-foreground font-body">
                Trusted by thousands of students nationwide
              </p>
              <div className="flex justify-center items-center space-x-1 text-xs text-muted-foreground">
                <span>🔒 Secure</span>
                <span>•</span>
                <span>🎓 Student-verified</span>
                <span>•</span>
                <span>💯 Free</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;