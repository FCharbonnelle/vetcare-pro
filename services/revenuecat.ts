import { Platform } from 'react-native';
import Purchases, { PurchasesOffering } from 'react-native-purchases';

const API_KEYS = {
  apple: process.env.EXPO_PUBLIC_REVENUECAT_APPLE_KEY || '',
  google: process.env.EXPO_PUBLIC_REVENUECAT_GOOGLE_KEY || '',
};

export const initRevenueCat = async () => {
  if (Platform.OS === 'ios') {
    await Purchases.configure({ apiKey: API_KEYS.apple });
  } else if (Platform.OS === 'android') {
    await Purchases.configure({ apiKey: API_KEYS.google });
  }
};

export const getOfferings = async (): Promise<PurchasesOffering | null> => {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current !== null) {
      return offerings.current;
    }
  } catch (e) {
    console.error('Error fetching offerings', e);
  }
  return null;
};

export const purchasePackage = async (packageToPurchase: any) => {
  try {
    const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
    return customerInfo.entitlements.active['pro'] !== undefined;
  } catch (e: any) {
    if (!e.userCancelled) {
      console.error('Error purchasing package', e);
    }
    return false;
  }
};

export const checkSubscriptionStatus = async (): Promise<boolean> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.entitlements.active['pro'] !== undefined;
  } catch (e) {
    console.error('Error checking subscription status', e);
    return false;
  }
};
