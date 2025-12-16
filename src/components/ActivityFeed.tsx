import { format } from "date-fns";
import { Droplets, UtensilsCrossed, Clock, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface WaterCheck {
  id: string;
  checked_at: string;
}

interface FoodLog {
  id: string;
  comment: string;
  logged_at: string;
}

interface ActivityFeedProps {
  waterChecks: WaterCheck[];
  foodLogs: FoodLog[];
}

type ActivityItem = {
  id: string;
  type: "water" | "food";
  timestamp: string;
  comment?: string;
};

export const ActivityFeed = ({ waterChecks, foodLogs }: ActivityFeedProps) => {
  // Combine and sort activities
  const activities: ActivityItem[] = [
    ...waterChecks.map((w) => ({
      id: w.id,
      type: "water" as const,
      timestamp: w.checked_at,
    })),
    ...foodLogs.map((f) => ({
      id: f.id,
      type: "food" as const,
      timestamp: f.logged_at,
      comment: f.comment,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  if (activities.length === 0) {
    return (
      <div 
        className="glass rounded-3xl p-6 shadow-elevated animate-fade-in-up relative overflow-hidden"
        style={{ animationDelay: "0.3s" }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-secondary opacity-10 blur-2xl" />
        
        <div className="relative flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
            <Activity className="w-6 h-6 text-muted-foreground" />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground">Today's Activity</h2>
        </div>
        
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center animate-float">
            <Clock className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="text-foreground font-medium text-lg mb-1">No activity yet</p>
          <p className="text-sm text-muted-foreground">Start tracking your water and food!</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="glass rounded-3xl p-6 shadow-elevated animate-fade-in-up relative overflow-hidden"
      style={{ animationDelay: "0.3s" }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-secondary opacity-10 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full gradient-water opacity-5 blur-2xl" />
      
      {/* Header */}
      <div className="relative flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center glow-accent">
            <Activity className="w-6 h-6 text-foreground" />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground">Today's Activity</h2>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-muted-foreground">
          {activities.length} entries
        </span>
      </div>

      {/* Activity list */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              "flex items-start gap-3 p-4 rounded-2xl transition-all duration-500 transform hover:scale-[1.02]",
              "border border-transparent hover:border-border",
              activity.type === "water" 
                ? "bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15" 
                : "bg-gradient-to-r from-accent/5 to-accent/10 hover:from-accent/10 hover:to-accent/15"
            )}
            style={{ 
              opacity: 0,
              animation: `fade-in 0.4s ease-out ${index * 0.05}s forwards`
            }}
          >
            {/* Icon */}
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300",
                activity.type === "water" ? "gradient-water glow-water" : "gradient-food glow-food"
              )}
            >
              {activity.type === "water" ? (
                <Droplets className="w-5 h-5 text-primary-foreground" />
              ) : (
                <UtensilsCrossed className="w-5 h-5 text-accent-foreground" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">
                  {activity.type === "water" ? "Drank water" : "Logged meal"}
                </p>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-medium",
                  activity.type === "water" 
                    ? "bg-primary/20 text-primary" 
                    : "bg-accent/20 text-accent"
                )}>
                  {activity.type === "water" ? "💧" : "🍽️"}
                </span>
              </div>
              {activity.comment && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{activity.comment}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {format(new Date(activity.timestamp), "h:mm a")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
