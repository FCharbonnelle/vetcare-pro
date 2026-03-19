-- VetCare Pro Database Schema (PostgreSQL for Supabase)

-- Enable RLS (Row Level Security)
-- -----------------------------------------------------------------------------

-- 1. Profiles Table (Extends Auth Users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  subscription_status TEXT DEFAULT 'free', -- free, premium
  revenue_cat_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Pets Table
CREATE TABLE public.pets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  species TEXT NOT NULL, -- "Dog", "Cat", "NAC"
  breed TEXT,
  birth_date DATE,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Unknown')),
  is_neutered BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;

-- 3. Weight History
CREATE TABLE public.weight_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  weight NUMERIC NOT NULL,
  unit TEXT DEFAULT 'kg',
  measurement_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.weight_history ENABLE ROW LEVEL SECURITY;

-- 4. Health Records (OCR / Smart Journal)
CREATE TABLE public.health_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  record_type TEXT NOT NULL, -- "Invoice", "Prescription", "Vaccination", "Other"
  document_url TEXT,
  extracted_text JSONB,
  visit_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;

-- 5. AI Triage History
CREATE TABLE public.triage_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  symptoms TEXT NOT NULL,
  advice TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('Low', 'Medium', 'High', 'Emergency')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.triage_history ENABLE ROW LEVEL SECURITY;

-- 6. Vet Directory (Bookmarks)
CREATE TABLE public.vet_bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  vet_name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.vet_bookmarks ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES (Example: Users can only see their own data)
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage own pets" ON public.pets FOR ALL USING (owner_id = auth.uid());
CREATE POLICY "Users can manage own pet's weight" ON public.weight_history FOR ALL USING (
  pet_id IN (SELECT id FROM public.pets WHERE owner_id = auth.uid())
);
CREATE POLICY "Users can manage own pet's health records" ON public.health_records FOR ALL USING (
  pet_id IN (SELECT id FROM public.pets WHERE owner_id = auth.uid())
);
CREATE POLICY "Users can manage own triage history" ON public.triage_history FOR ALL USING (
  pet_id IN (SELECT id FROM public.pets WHERE owner_id = auth.uid())
);
CREATE POLICY "Users can manage own vet bookmarks" ON public.vet_bookmarks FOR ALL USING (profile_id = auth.uid());
