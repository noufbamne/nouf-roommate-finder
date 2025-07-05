import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication - in real app would validate credentials
    navigate("/preferences");
  };

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-medium">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Sign in to find your perfect roommate" 
              : "Join to start finding compatible roommates"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-muted focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-muted focus:ring-primary"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary text-white shadow-soft"
              size="lg"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:bg-primary/10"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full border-muted hover:bg-muted/50"
            onClick={() => navigate("/preferences")}
          >
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;