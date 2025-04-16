
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-brand-purple to-brand-dark-purple bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button asChild className="bg-brand-purple hover:bg-brand-dark-purple">
          <a href="/" className="flex items-center gap-2">
            <Home size={16} />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
