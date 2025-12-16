import { cn } from "@/lib/utils";
import { Droplets } from "lucide-react";

interface WaterGlassProps {
  filled: boolean;
  index: number;
  onClick?: () => void;
}

export const WaterGlass = ({ filled, index, onClick }: WaterGlassProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-16 h-20 rounded-b-2xl rounded-t-lg border-2 transition-all duration-300 overflow-hidden group",
        filled 
          ? "border-primary shadow-glow" 
          : "border-border hover:border-primary/50 hover:shadow-soft"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Water fill */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 water-gradient transition-all duration-500 origin-bottom",
          filled ? "h-full opacity-100" : "h-0 opacity-0"
        )}
      />
      
      {/* Ripple effect on fill */}
      {filled && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-primary-foreground/30 animate-ripple" />
        </div>
      )}
      
      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Droplets 
          className={cn(
            "w-6 h-6 transition-all duration-300",
            filled ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
          )}
        />
      </div>
      
      {/* Glass shine effect */}
      <div className="absolute top-1 left-1 w-2 h-6 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
    </button>
  );
};
