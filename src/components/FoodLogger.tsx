import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { UtensilsCrossed, Send } from "lucide-react";

interface FoodLoggerProps {
  onAddFood: (comment: string) => void;
}

export const FoodLogger = ({ onAddFood }: FoodLoggerProps) => {
  const [comment, setComment] = useState("");

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
    <div className="glass rounded-2xl p-6 shadow-soft animate-fade-in" style={{ animationDelay: "100ms" }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl food-gradient flex items-center justify-center">
          <UtensilsCrossed className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-lg text-foreground">Food Log</h2>
          <p className="text-sm text-muted-foreground">What did you eat?</p>
        </div>
      </div>

      {/* Input area */}
      <div className="space-y-3">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Oatmeal with berries for breakfast..."
          className="min-h-[100px] resize-none rounded-xl border-border bg-background/50 focus:border-accent focus:ring-accent/20 transition-all duration-200"
        />
        <Button
          onClick={handleSubmit}
          disabled={!comment.trim()}
          className="w-full h-12 rounded-xl font-medium text-base food-gradient hover:opacity-90 transition-all duration-300 disabled:opacity-50"
        >
          <Send className="w-5 h-5 mr-2" />
          Log Meal
        </Button>
      </div>
    </div>
  );
};
