import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { UtensilsCrossed, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FoodLoggerProps {
  onAddFood: (comment: string) => void;
}

export const FoodLogger = ({ onAddFood }: FoodLoggerProps) => {
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (comment.trim()) {
      onAddFood(comment.trim());
      setComment("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div 
      className="glass rounded-3xl p-6 shadow-elevated animate-fade-in-up relative overflow-hidden"
      style={{ animationDelay: "0.2s" }}
    >
      {/* Decorative background blobs */}
      <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full gradient-food opacity-10 blur-2xl" />
      <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-secondary opacity-10 blur-2xl" />
      
      {/* Header */}
      <div className="relative flex items-center gap-3 mb-5">
        <div className={cn(
          "w-12 h-12 rounded-2xl gradient-food flex items-center justify-center shadow-card transition-all duration-500",
          isFocused && "glow-food scale-105"
        )}>
          <UtensilsCrossed className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-foreground">Food Log</h2>
          <p className="text-sm text-muted-foreground">What did you eat?</p>
        </div>
      </div>

      {/* Input area */}
      <div className="relative space-y-4">
        <div className={cn(
          "relative rounded-2xl transition-all duration-500",
          isFocused && "glow-food"
        )}>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="e.g., Oatmeal with berries for breakfast..."
            className={cn(
              "min-h-[120px] resize-none rounded-2xl border-2 bg-background/50 transition-all duration-300",
              "focus:border-accent focus:ring-0 focus:ring-offset-0",
              "placeholder:text-muted-foreground/60",
              isFocused ? "border-accent" : "border-border"
            )}
          />
          
          {/* Character hint */}
          {comment.length > 0 && (
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground animate-fade-in">
              Press Enter to log
            </div>
          )}
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={!comment.trim()}
          className={cn(
            "w-full h-14 rounded-2xl font-semibold text-base transition-all duration-500 transform",
            "hover:scale-[1.02] active:scale-[0.98]",
            "relative overflow-hidden group",
            "gradient-food glow-food",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:glow-none"
          )}
        >
          {/* Button shimmer */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 animate-shimmer" />
          </div>
          
          <span className="relative flex items-center justify-center gap-2">
            <Send className={cn(
              "w-5 h-5 transition-transform duration-300",
              comment.trim() && "group-hover:translate-x-1"
            )} />
            Log Meal
          </span>
        </Button>
      </div>
    </div>
  );
};
