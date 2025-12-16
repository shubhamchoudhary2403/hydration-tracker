-- Create water_checks table for tracking water intake
CREATE TABLE public.water_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  checked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create food_logs table for tracking food with comments
CREATE TABLE public.food_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  comment TEXT NOT NULL,
  logged_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security but allow public access for this simple tracker
ALTER TABLE public.water_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view and insert (simple public tracker)
CREATE POLICY "Anyone can view water checks" ON public.water_checks FOR SELECT USING (true);
CREATE POLICY "Anyone can insert water checks" ON public.water_checks FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete water checks" ON public.water_checks FOR DELETE USING (true);

CREATE POLICY "Anyone can view food logs" ON public.food_logs FOR SELECT USING (true);
CREATE POLICY "Anyone can insert food logs" ON public.food_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete food logs" ON public.food_logs FOR DELETE USING (true);

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.water_checks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.food_logs;