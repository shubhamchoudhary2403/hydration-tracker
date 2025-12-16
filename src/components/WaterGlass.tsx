import { cn } from "@/lib/utils";
import { Droplets, Check } from "lucide-react";
import { useState } from "react";

interface WaterGlassProps {
  filled: boolean;
  index: number;
  onClick?: () => void;
}

export const WaterGlass = ({ filled, index, onClick }: WaterGlassProps) => {
  const [justFilled, setJustFilled] = useState(false);

  const handleClick = () => {
    if (!filled && onClick) {
      setJustFilled(true);
      onClick();
      setTimeout(() => setJustFilled(false), 600);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={filled}
      className={cn(
        "relative w-14 h-18 md:w-16 md:h-20 rounded-b-2xl rounded-t-lg border-2 transition-all duration-500 overflow-hidden group",
        "transform hover:scale-110 hover:-translate-y-1",
        filled 
          ? "border-primary/50 glow-water cursor-default" 
          : "border-border hover:border-primary/60 hover:shadow-elevated cursor-pointer"
      )}
      style={{ 
        animationDelay: `${index * 80}ms`,
        opacity: 0,
        animation: 'fade-in-up 0.5s ease-out forwards',
      }}
    >
      {/* Water fill with wave effect */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 gradient-water transition-all duration-700 origin-bottom",
          filled ? "h-full" : "h-0",
          filled && "animate-water-wave"
        )}
      >
        {/* Shimmer overlay */}
        {filled && (
          <div className="absolute inset-0 animate-shimmer opacity-60" />
        )}
      </div>
      
      {/* Success ripple */}
      {justFilled && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full rounded-b-2xl rounded-t-lg gradient-water animate-ripple-out" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Check className="w-6 h-6 text-primary-foreground animate-success-pop" />
          </div>
        </>
      )}
      
      {/* Icon */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center transition-all duration-300",
        justFilled && "opacity-0"
      )}>
        <Droplets 
          className={cn(
            "w-5 h-5 md:w-6 md:h-6 transition-all duration-300",
            filled ? "text-primary-foreground drop-shadow-lg" : "text-muted-foreground group-hover:text-primary group-hover:scale-110"
          )}
        />
      </div>
      
      {/* Glass shine effect */}
      <div className="absolute top-1 left-1 w-1.5 h-5 bg-gradient-to-b from-white/50 to-transparent rounded-full" />
      
      {/* Pulse ring for unfilled */}
      {!filled && (
        <div className="absolute -inset-1 rounded-b-2xl rounded-t-lg border-2 border-primary/20 animate-pulse-ring opacity-0 group-hover:opacity-100" />
      )}
    </button>
  );
};
