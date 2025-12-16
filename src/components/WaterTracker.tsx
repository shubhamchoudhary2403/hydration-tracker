import { WaterGlass } from "./WaterGlass";
import { Button } from "./ui/button";
import { Plus, Droplets, Check, Sparkles } from "lucide-react";
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
    <div className="glass rounded-2xl p-6 shadow-soft animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl water-gradient flex items-center justify-center shadow-glow">
            <Droplets className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-lg text-foreground">Water Intake</h2>
            <p className="text-sm text-muted-foreground">Minimum {goal} glasses daily</p>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className={cn(
          "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
          isGoalReached 
            ? "bg-accent text-accent-foreground" 
            : "bg-secondary text-secondary-foreground"
        )}>
          {isGoalReached ? (
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Goal reached!
            </span>
          ) : (
            `${waterCount} / ${goal}`
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full water-gradient rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Water glasses */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {Array.from({ length: goal }).map((_, index) => (
          <WaterGlass
            key={index}
            index={index}
            filled={index < waterCount}
          />
        ))}
      </div>

      {/* Add button */}
      <Button 
        onClick={onAddWater}
        className={cn(
          "w-full h-12 rounded-xl font-medium text-base transition-all duration-300",
          isGoalReached 
            ? "bg-accent hover:bg-accent/90" 
            : "water-gradient hover:opacity-90 shadow-glow"
        )}
      >
        <Plus className="w-5 h-5 mr-2" />
        {isGoalReached ? "Keep going!" : "Log Water"}
      </Button>
    </div>
  );
};
