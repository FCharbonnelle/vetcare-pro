import { Redirect } from 'expo-router';

export default function Entry() {
  // Logic to determine if onboarding is needed
  // For the MVP, we start with onboarding every time or go straight to dashboard
  return <Redirect href="/onboarding" />;
}
