-- ==========================================
-- GYM PROGRESS DATABASE SCHEMA (SUPABASE / POSTGRESQL)
-- Production-Ready with Row-Level Security (RLS) & Triggers
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  gender TEXT DEFAULT 'Nam',
  age INTEGER,
  height_cm NUMERIC,
  weight_kg NUMERIC,
  goal TEXT NOT NULL DEFAULT 'Tăng cơ',
  experience TEXT NOT NULL DEFAULT 'Intermediate',
  training_days_per_week INTEGER DEFAULT 4,
  unit TEXT NOT NULL DEFAULT 'kg',
  active_program_id TEXT,
  sound_enabled BOOLEAN DEFAULT true,
  haptics_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EXERCISES (Global seed & custom user exercises)
CREATE TABLE IF NOT EXISTS public.exercises (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  primary_muscle TEXT NOT NULL,
  secondary_muscles TEXT[] DEFAULT '{}',
  equipment TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'Intermediate',
  instructions TEXT[] DEFAULT '{}',
  tips TEXT[] DEFAULT '{}',
  common_mistakes TEXT[] DEFAULT '{}',
  is_custom BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EXERCISE IMAGES
CREATE TABLE IF NOT EXISTS public.exercise_images (
  id TEXT PRIMARY KEY,
  exercise_id TEXT REFERENCES public.exercises(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  fallback_svg TEXT,
  type TEXT DEFAULT 'image',
  provider TEXT DEFAULT 'unsplash',
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROGRAMS
CREATE TABLE IF NOT EXISTS public.programs (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'Custom',
  days_per_week INTEGER DEFAULT 4,
  is_template BOOLEAN DEFAULT false,
  is_custom BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. WORKOUTS (Days inside a program)
CREATE TABLE IF NOT EXISTS public.workouts (
  id TEXT PRIMARY KEY,
  program_id TEXT REFERENCES public.programs(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  name TEXT NOT NULL,
  is_rest_day BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. WORKOUT EXERCISES (Join table inside workouts)
CREATE TABLE IF NOT EXISTS public.workout_exercises (
  id TEXT PRIMARY KEY,
  workout_id TEXT REFERENCES public.workouts(id) ON DELETE CASCADE,
  exercise_id TEXT REFERENCES public.exercises(id) ON DELETE RESTRICT,
  target_sets INTEGER DEFAULT 3,
  rep_range TEXT DEFAULT '8-12',
  default_rest_seconds INTEGER DEFAULT 90,
  order_index INTEGER NOT NULL,
  notes TEXT
);

-- 7. WORKOUT SESSIONS (Logged workouts)
CREATE TABLE IF NOT EXISTS public.workout_sessions (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_id TEXT REFERENCES public.workouts(id) ON DELETE SET NULL,
  workout_name TEXT NOT NULL,
  program_id TEXT REFERENCES public.programs(id) ON DELETE SET NULL,
  program_name TEXT,
  start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  duration_seconds INTEGER DEFAULT 0,
  total_volume_kg NUMERIC DEFAULT 0,
  sets_completed INTEGER DEFAULT 0,
  rpe_avg NUMERIC,
  notes TEXT,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SET LOGS (Set-by-set entries)
CREATE TABLE IF NOT EXISTS public.set_logs (
  id TEXT PRIMARY KEY,
  session_id TEXT REFERENCES public.workout_sessions(id) ON DELETE CASCADE,
  exercise_id TEXT REFERENCES public.exercises(id) ON DELETE RESTRICT,
  set_number INTEGER NOT NULL,
  weight_kg NUMERIC NOT NULL DEFAULT 0,
  reps INTEGER NOT NULL DEFAULT 0,
  rpe NUMERIC,
  set_type TEXT DEFAULT 'regular',
  is_completed BOOLEAN DEFAULT false,
  is_pr BOOLEAN DEFAULT false,
  pr_type TEXT,
  completed_at TIMESTAMPTZ
);

-- 9. PERSONAL RECORDS (PRs)
CREATE TABLE IF NOT EXISTS public.personal_records (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id TEXT REFERENCES public.exercises(id) ON DELETE RESTRICT,
  exercise_name TEXT NOT NULL,
  type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  weight_kg NUMERIC NOT NULL,
  reps INTEGER NOT NULL,
  estimated_1rm NUMERIC NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW(),
  previous_value NUMERIC,
  session_id TEXT REFERENCES public.workout_sessions(id) ON DELETE SET NULL
);

-- 10. BODY MEASUREMENTS
CREATE TABLE IF NOT EXISTS public.body_measurements (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  weight_kg NUMERIC NOT NULL,
  body_fat_percent NUMERIC,
  chest_cm NUMERIC,
  waist_cm NUMERIC,
  arm_cm NUMERIC,
  thigh_cm NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. PROGRESS PHOTOS
CREATE TABLE IF NOT EXISTS public.progress_photos (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  type TEXT NOT NULL, -- 'front', 'side', 'back'
  photo_url TEXT NOT NULL,
  weight_kg NUMERIC,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.set_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_photos ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only read/write their own profile
CREATE POLICY "Users can manage own profile"
  ON public.profiles FOR ALL
  USING (auth.uid() = id);

-- Programs: Users can read templates or their own custom programs
CREATE POLICY "Users can read templates and own programs"
  ON public.programs FOR SELECT
  USING (is_template = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage own programs"
  ON public.programs FOR ALL
  USING (auth.uid() = user_id);

-- Sessions: Users can only see & manage their own sessions
CREATE POLICY "Users can manage own workout sessions"
  ON public.workout_sessions FOR ALL
  USING (auth.uid() = user_id);

-- Set logs: Isolation via workout session user_id
CREATE POLICY "Users can manage own set logs"
  ON public.set_logs FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.workout_sessions s
      WHERE s.id = set_logs.session_id AND s.user_id = auth.uid()
    )
  );

-- Personal Records: Users can only access own PRs
CREATE POLICY "Users can manage own personal records"
  ON public.personal_records FOR ALL
  USING (auth.uid() = user_id);

-- Body Measurements: User isolation
CREATE POLICY "Users can manage own body measurements"
  ON public.body_measurements FOR ALL
  USING (auth.uid() = user_id);

-- Progress Photos: Protected
CREATE POLICY "Users can manage own progress photos"
  ON public.progress_photos FOR ALL
  USING (auth.uid() = user_id);

-- ==========================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_sessions_user_time ON public.workout_sessions(user_id, start_time DESC);
CREATE INDEX IF NOT EXISTS idx_setlogs_session ON public.set_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_setlogs_exercise ON public.set_logs(exercise_id);
CREATE INDEX IF NOT EXISTS idx_prs_user_exercise ON public.personal_records(user_id, exercise_id);
CREATE INDEX IF NOT EXISTS idx_measurements_user_date ON public.body_measurements(user_id, date DESC);
