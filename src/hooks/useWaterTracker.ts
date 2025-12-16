import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { startOfDay, endOfDay } from "date-fns";

interface WaterCheck {
  id: string;
  checked_at: string;
}

interface FoodLog {
  id: string;
  comment: string;
  logged_at: string;
}

export const useWaterTracker = () => {
  const [waterChecks, setWaterChecks] = useState<WaterCheck[]>([]);
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const today = new Date();
  const todayStart = startOfDay(today).toISOString();
  const todayEnd = endOfDay(today).toISOString();

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      const [waterResult, foodResult] = await Promise.all([
        supabase
          .from("water_checks")
          .select("*")
          .gte("checked_at", todayStart)
          .lte("checked_at", todayEnd)
          .order("checked_at", { ascending: false }),
        supabase
          .from("food_logs")
          .select("*")
          .gte("logged_at", todayStart)
          .lte("logged_at", todayEnd)
          .order("logged_at", { ascending: false }),
      ]);

      if (waterResult.data) setWaterChecks(waterResult.data);
      if (foodResult.data) setFoodLogs(foodResult.data);
      
      setIsLoading(false);
    };

    fetchData();
  }, [todayStart, todayEnd]);

  // Set up realtime subscriptions
  useEffect(() => {
    const waterChannel = supabase
      .channel("water-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "water_checks",
        },
        (payload) => {
          const newCheck = payload.new as WaterCheck;
          setWaterChecks((prev) => [newCheck, ...prev]);
        }
      )
      .subscribe();

    const foodChannel = supabase
      .channel("food-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "food_logs",
        },
        (payload) => {
          const newLog = payload.new as FoodLog;
          setFoodLogs((prev) => [newLog, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(waterChannel);
      supabase.removeChannel(foodChannel);
    };
  }, []);

  const addWaterCheck = async () => {
    const { error } = await supabase.from("water_checks").insert({});
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log water. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "💧 Water logged!",
      description: `Great job! ${waterChecks.length + 1} glasses today.`,
    });
  };

  const addFoodLog = async (comment: string) => {
    const { error } = await supabase.from("food_logs").insert({ comment });
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log food. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "🍽️ Meal logged!",
      description: "Your meal has been recorded.",
    });
  };

  return {
    waterChecks,
    foodLogs,
    waterCount: waterChecks.length,
    isLoading,
    addWaterCheck,
    addFoodLog,
  };
};
