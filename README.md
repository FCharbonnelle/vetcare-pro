# VetCare Pro 🐾

VetCare Pro is a premium cross-platform application designed to be the ultimate companion for pet owners.
Built with a "Freemium First" mindset, it leverages cutting-edge AI (Gemini/OpenAI) and OCR to simplify pet healthcare management.

## 🌟 Vision
To create a high-MRR subscription ecosystem by solving the most stressful problems for pet owners: emergency triage, health tracking, and vaccine management.

---

## 🛠 Project Structure

```text
vetcare-pro/
├── app/                  # Expo Router directory (screens/routes)
│   ├── (auth)/           # Authentication flows (Login, Sign Up, Onboarding)
│   ├── (tabs)/           # Main Application Tab Navigator
│   │   ├── dashboard/    # Main Overview Screen
│   │   ├── history/      # Health Record List
│   │   ├── ai-assist/    # Vet Assistant Chat Interface
│   │   └── settings/     # Profile & Subscriptions
│   ├── paywall/          # Premium Subscription Upsell Screen
│   └── _layout.tsx       # Root Layout with State Providers
├── components/           # Reusable UI components
│   ├── ui/               # Primary interface atoms (Glassmorphism, buttons)
│   ├── forms/            # Pet registration, weight entry
│   └── shared/           # Header, Navigation, Modals
├── hooks/                # Custom React hooks (Supabase, RevenueCat)
├── services/             # API clients (Supabase, RevenueCat, AI)
├── store/                # State management (Zustand or Context)
├── types/                # TypeScript interfaces
├── utils/                # Helper functions (Date formatting, OCR parsers)
├── constants/            # Theme colors, config, hardcoded data
├── assets/               # Images, icons, and local media
└── supabase/             # Edge Functions and DB Migrations
```

---

## 🚀 Roadmap

### Phase 1: Planning & Scaffolding (Current)
- [x] Database Schema Design
- [x] Project Structure Definition
- [ ] Expo/NativeWind Initialization
- [ ] Dependencies Installation

### Phase 2: Core UI & Onboarding
- [ ] Onboarding (Gamified Pet Profile Creation)
- [ ] Dashboard (Freemium: Weight Graph, Vet Directory)
- [ ] Premium Paywall Screen (Design Focused)

### Phase 3: Backend & AI Integration
- [ ] Supabase Auth & DB Wiring
- [ ] AI Vet Assistant Triage (Premium Only)
- [ ] OCR for Health Records (Premium Only)
- [ ] RevenueCat Integration

---

## 🧪 Tech Stack
- **Frontend**: React Native + Expo Router
- **Styling**: NativeWind (Tailwind CSS)
- **Backend/DB**: Supabase (PostgreSQL, Auth, Storage)
- **Monetization**: RevenueCat
- **IA**: Gemini 1.5 Flash (OCR & Triage)
- **Animations**: Reanimated & Framer Motion (Moti)
