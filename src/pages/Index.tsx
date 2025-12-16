import { WaterTracker } from "@/components/WaterTracker";
import { FoodLogger } from "@/components/FoodLogger";
import { ActivityFeed } from "@/components/ActivityFeed";
import { useWaterTracker } from "@/hooks/useWaterTracker";
import { Droplets, Sparkles } from "lucide-react";
import { format } from "date-fns";

const Index = () => {
  const { waterChecks, foodLogs, waterCount, isLoading, addWaterCheck, addFoodLog } = useWaterTracker();

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Stay Hydrated
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Hydration <span className="text-primary">Tracker</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Track your daily water intake and meals. Goal: 6+ glasses of water every day.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </p>
        </header>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 rounded-full water-gradient animate-pulse flex items-center justify-center">
              <Droplets className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Water Tracker */}
            <div className="lg:col-span-1">
              <WaterTracker 
                waterCount={waterCount} 
                onAddWater={addWaterCheck} 
              />
            </div>

            {/* Middle column - Food Logger */}
            <div className="lg:col-span-1">
              <FoodLogger onAddFood={addFoodLog} />
            </div>

            {/* Right column - Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeed 
                waterChecks={waterChecks} 
                foodLogs={foodLogs} 
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>Updates in real-time • Data refreshes automatically</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
