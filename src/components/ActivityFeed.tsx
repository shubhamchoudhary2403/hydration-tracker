import { format } from "date-fns";
import { Droplets, UtensilsCrossed, Clock } from "lucide-react";
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

type Activity = {
  id: string;
  type: "water" | "food";
  timestamp: string;
  comment?: string;
};

export const ActivityFeed = ({ waterChecks, foodLogs }: ActivityFeedProps) => {
  // Combine and sort activities
  const activities: Activity[] = [
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
      <div className="glass rounded-2xl p-6 shadow-soft animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h2 className="font-display font-semibold text-lg text-foreground mb-4">Today's Activity</h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No activity yet today.</p>
          <p className="text-sm text-muted-foreground mt-1">Start tracking your water and food!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 shadow-soft animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-lg text-foreground">Today's Activity</h2>
        <span className="text-sm text-muted-foreground">{activities.length} entries</span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-xl transition-all duration-300 animate-fade-in",
              activity.type === "water" ? "bg-primary/5" : "bg-accent/5"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Icon */}
            <div
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                activity.type === "water" ? "water-gradient" : "food-gradient"
              )}
            >
              {activity.type === "water" ? (
                <Droplets className="w-4 h-4 text-primary-foreground" />
              ) : (
                <UtensilsCrossed className="w-4 h-4 text-accent-foreground" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">
                {activity.type === "water" ? "Drank water" : "Logged meal"}
              </p>
              {activity.comment && (
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{activity.comment}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {format(new Date(activity.timestamp), "h:mm a")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
