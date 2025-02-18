import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[100dvh] bg-primary flex items-center justify-center">
      <div className="w-[90%] sm:w-[80%] bg-black/30 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 shadow-lg sm:h-[80%]">
        <h1 className="sm:text-6xl text-4xl font-bold text-cyan tracking-wider">404 | Not Found</h1>
        <p className="text-lg text-white/80 mb-4">Oops! The page you're looking for doesn't exist.</p>
        <Button
          size="lg"
          variant="outline"
          className="cursor-pointer px-6 py-3 text-lg font-semibold bg-cyan text-primary border-cyan hover:bg-primary hover:text-cyan transition-colors"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
