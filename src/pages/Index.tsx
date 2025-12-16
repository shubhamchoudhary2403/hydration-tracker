import { WaterTracker } from "@/components/WaterTracker";
import { FoodLogger } from "@/components/FoodLogger";
import { ActivityFeed } from "@/components/ActivityFeed";
import { FloatingBubbles } from "@/components/FloatingBubbles";
import { useWaterTracker } from "@/hooks/useWaterTracker";
import { Droplets, Sparkles, Waves } from "lucide-react";
import { format } from "date-fns";

const Index = () => {
  const { waterChecks, foodLogs, waterCount, isLoading, addWaterCheck, addFoodLog } = useWaterTracker();

  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      {/* Animated floating bubbles */}
      <FloatingBubbles />
      
      {/* Animated background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full gradient-water opacity-20 blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-secondary opacity-15 blur-3xl animate-float-reverse" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full gradient-food opacity-15 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-20 right-10 w-96 h-96 rounded-full gradient-water opacity-10 blur-3xl animate-float" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass shadow-card mb-6 animate-bounce-soft">
            <Waves className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-gradient-water">Stay Hydrated & Healthy</span>
            <Sparkles className="w-4 h-4 text-secondary" />
          </div>
          
          {/* Title */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-foreground">Hydration</span>
            <br />
            <span className="text-gradient-water">Tracker</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto mb-3">
            Track your daily water intake and meals with style.
            <br className="hidden md:block" />
            Goal: <span className="font-semibold text-primary">6+ glasses</span> of water every day.
          </p>
          
          {/* Date */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 text-sm text-muted-foreground">
            <span className="font-medium">{format(new Date(), "EEEE, MMMM d, yyyy")}</span>
          </div>
        </header>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative">
              <div className="w-20 h-20 rounded-full gradient-water animate-pulse flex items-center justify-center glow-water">
                <Droplets className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="absolute -inset-4 rounded-full gradient-water opacity-30 animate-ripple-out" />
            </div>
            <p className="mt-6 text-muted-foreground font-medium animate-pulse">Loading your data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
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
        <footer className="text-center mt-16 pb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass shadow-card">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p className="text-sm text-muted-foreground font-medium">
              Real-time sync enabled • Updates automatically
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
