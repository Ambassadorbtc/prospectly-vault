
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate sign out process
    const signOut = async () => {
      // Add a small delay to simulate the sign out process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast.success("Signed out successfully");
      
      // Redirect to home page
      navigate("/");
    };
    
    signOut();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center">
        <LogOut className="h-16 w-16 mx-auto mb-6 text-crm-purple-600" />
        <h1 className="text-2xl font-bold mb-2">Signing Out...</h1>
        <p className="text-muted-foreground">Please wait while we sign you out.</p>
      </div>
    </div>
  );
};

export default SignOut;
