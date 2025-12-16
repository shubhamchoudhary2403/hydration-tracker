import { WaterGlass } from "./WaterGlass";
import { Button } from "./ui/button";
import { Plus, Droplets, Sparkles, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface WaterTrackerProps {
  waterCount: number;
  onAddWater: () => void;
  goal?: number;
}

export const WaterTracker = ({ waterCount, onAddWater, goal = 6 }: WaterTrackerProps) => {
  const isGoalReached = waterCount >= goal;
  const progressPercent = Math.min((waterCount / goal) * 100, 100);

  return (
    <div 
      className="glass rounded-3xl p-6 shadow-elevated animate-fade-in-up relative overflow-hidden"
      style={{ animationDelay: "0.1s" }}
    >
      {/* Decorative background blobs */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full gradient-water opacity-10 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-secondary opacity-10 blur-2xl" />
      
      {/* Header */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-2xl gradient-water flex items-center justify-center transition-all duration-500",
            isGoalReached ? "glow-water animate-bounce-soft" : "shadow-card"
          )}>
            <Droplets className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">Water Intake</h2>
            <p className="text-sm text-muted-foreground">Min {goal} glasses daily</p>
          </div>
        </div>
        
        {/* Status badge */}
        <div className={cn(
          "px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-500 transform",
          isGoalReached 
            ? "gradient-food text-accent-foreground glow-food scale-105 animate-bounce-soft" 
            : "bg-muted text-muted-foreground"
        )}>
          {isGoalReached ? (
            <span className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              Complete!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <span className="text-lg font-bold text-gradient-water">{waterCount}</span>
              <span className="text-muted-foreground">/ {goal}</span>
            </span>
          )}
        </div>
      </div>

      {/* Animated progress bar */}
      <div className="h-3 bg-muted rounded-full mb-6 overflow-hidden relative">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out relative",
            isGoalReached ? "gradient-food" : "gradient-water"
          )}
          style={{ width: `${progressPercent}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 animate-shimmer" />
          
          {/* Glow at the end */}
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/40 blur-sm" />
        </div>
      </div>

      {/* Water glasses grid */}
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-6">
        {Array.from({ length: goal }).map((_, index) => (
          <WaterGlass
            key={index}
            index={index}
            filled={index < waterCount}
            onClick={index === waterCount ? onAddWater : undefined}
          />
        ))}
      </div>

      {/* Add button */}
      <Button 
        onClick={onAddWater}
        className={cn(
          "w-full h-14 rounded-2xl font-semibold text-base transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]",
          "relative overflow-hidden group",
          isGoalReached 
            ? "gradient-food glow-food" 
            : "gradient-water glow-water"
        )}
      >
        {/* Button shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 animate-shimmer" />
        </div>
        
        <span className="relative flex items-center justify-center gap-2">
          {isGoalReached ? (
            <>
              <Sparkles className="w-5 h-5 animate-wiggle" />
              Keep Going!
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Log Water
            </>
          )}
        </span>
      </Button>
    </div>
  );
};
