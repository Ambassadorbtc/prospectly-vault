
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const SignOut = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate a sign out process
    const timer = setTimeout(() => {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
      
      // Redirect to the home page after signing out
      navigate("/");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="animate-spin mb-6 p-6 bg-muted rounded-full">
        <LogOut className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Signing Out</h1>
      <p className="text-muted-foreground">Please wait while we securely sign you out...</p>
    </div>
  );
};

export default SignOut;
