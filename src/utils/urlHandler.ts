/**
 * Utility functions for handling app store URLs and fallbacks
 */

export interface PlatformInfo {
  isAndroid: boolean;
  isIOS: boolean;
  isDesktop: boolean;
  isEmulator: boolean;
  isRealDevice: boolean;
  userAgent: string;
}

/**
 * Detect the current platform
 */
export function detectPlatform(): PlatformInfo {
  const userAgent = navigator.userAgent;
  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isDesktop = !isAndroid && !isIOS;

  // Detect if running on emulator/simulator
  const isEmulator =
    isDesktop ||
    userAgent.includes("Android SDK") ||
    userAgent.includes("iPhone Simulator") ||
    userAgent.includes("iPad Simulator") ||
    userAgent.includes("iPod Simulator");

  const isRealDevice = !isEmulator;

  return {
    isAndroid,
    isIOS,
    isDesktop,
    isEmulator,
    isRealDevice,
    userAgent,
  };
}

/**
 * Create a safe app store URL with proper fallbacks
 */
export function createAppStoreUrl(
  packageName: string,
  appStoreId?: string,
  referrer?: string
): string {
  const platform = detectPlatform();

  if (platform.isIOS && appStoreId) {
    return `https://apps.apple.com/app/id${appStoreId}`;
  } else if (platform.isAndroid) {
    // Use intent URL with web fallback
    const intentUrl = `intent://details?id=${packageName}${
      referrer ? `&referrer=${encodeURIComponent(referrer)}` : ""
    }#Intent;scheme=market;package=com.android.vending;end`;
    const webUrl = `https://play.google.com/store/apps/details?id=${packageName}`;
    return `${intentUrl}|${webUrl}`;
  } else {
    // Desktop/other platforms
    return `https://play.google.com/store/apps/details?id=${packageName}`;
  }
}

/**
 * Safely navigate to a URL with error handling
 */
export function safeNavigate(url: string, fallbackUrl?: string): void {
  try {
    window.location.href = url;
  } catch (error) {
    console.warn("Failed to navigate to URL:", url, error);
    if (fallbackUrl) {
      try {
        window.location.href = fallbackUrl;
      } catch (fallbackError) {
        console.error(
          "Failed to navigate to fallback URL:",
          fallbackUrl,
          fallbackError
        );
      }
    }
  }
}

/**
 * Check if a URL scheme is supported
 */
export function isUrlSchemeSupported(scheme: string): boolean {
  try {
    const link = document.createElement("a");
    link.href = scheme;
    return link.protocol === scheme.split(":")[0] + ":";
  } catch {
    return false;
  }
}

/**
 * Handle market:// URL with proper fallbacks
 */
export function handleMarketUrl(
  marketUrl: string,
  packageName: string,
  referrer?: string
): void {
  const platform = detectPlatform();

  if (platform.isAndroid) {
    if (platform.isRealDevice) {
      // On real Android device: try market:// first, then intent, then web
      const intentUrl = `intent://details?id=${packageName}${
        referrer ? `&referrer=${encodeURIComponent(referrer)}` : ""
      }#Intent;scheme=market;package=com.android.vending;end`;
      const webUrl = `https://play.google.com/store/apps/details?id=${packageName}`;

      // Try market:// first on real device
      try {
        window.location.href = marketUrl;
      } catch (error) {
        console.warn("market:// URL failed, trying intent URL:", error);
        try {
          window.location.href = intentUrl;
        } catch (intentError) {
          console.warn("intent URL failed, using web URL:", intentError);
          window.location.href = webUrl;
        }
      }
    } else {
      // On emulator/desktop: skip market:// and go directly to web
      console.log("Running on emulator/desktop, using web URL directly");
      const webUrl = `https://play.google.com/store/apps/details?id=${packageName}`;
      window.location.href = webUrl;
    }
  } else {
    // For non-Android platforms, use web URL
    const webUrl = `https://play.google.com/store/apps/details?id=${packageName}`;
    window.location.href = webUrl;
  }
}
