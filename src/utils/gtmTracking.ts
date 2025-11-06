/**
 * Google Tag Manager Event Tracking Utility
 * Push events to dataLayer for GTM tracking
 */

declare global {
  interface Window {
    dataLayer: any[];
  }
}

type EventCategory = 
  | 'engagement'
  | 'lead_generation'
  | 'navigation'
  | 'form'
  | 'cta'
  | 'contact';

interface GTMEvent {
  event: string;
  event_category: EventCategory;
  event_label?: string;
  event_value?: number;
  page_path?: string;
  [key: string]: any;
}

/**
 * Push event to GTM dataLayer
 */
export const trackEvent = (eventData: GTMEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      ...eventData,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
    console.log('GTM Event:', eventData);
  }
};

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent({
    event: 'cta_click',
    event_category: 'cta',
    event_label: ctaName,
    cta_location: location,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string, formType: 'contact' | 'newsletter' | 'lead') => {
  trackEvent({
    event: 'form_submission',
    event_category: 'form',
    event_label: formName,
    form_type: formType,
  });
};

/**
 * Track phone number clicks
 */
export const trackPhoneClick = (phoneNumber: string, location: string) => {
  trackEvent({
    event: 'phone_click',
    event_category: 'contact',
    event_label: phoneNumber,
    contact_location: location,
  });
};

/**
 * Track email clicks
 */
export const trackEmailClick = (location: string) => {
  trackEvent({
    event: 'email_click',
    event_category: 'contact',
    event_label: 'joe@bizooma.com',
    contact_location: location,
  });
};

/**
 * Track calendar booking clicks
 */
export const trackCalendarClick = (location: string) => {
  trackEvent({
    event: 'calendar_click',
    event_category: 'lead_generation',
    event_label: 'Calendly Booking',
    booking_location: location,
  });
};

/**
 * Track service page views
 */
export const trackServiceView = (serviceName: string) => {
  trackEvent({
    event: 'service_view',
    event_category: 'engagement',
    event_label: serviceName,
  });
};

/**
 * Track navigation clicks
 */
export const trackNavigation = (destination: string, linkText: string) => {
  trackEvent({
    event: 'navigation_click',
    event_category: 'navigation',
    event_label: linkText,
    destination_url: destination,
  });
};

/**
 * Track video plays
 */
export const trackVideoPlay = (videoTitle: string) => {
  trackEvent({
    event: 'video_play',
    event_category: 'engagement',
    event_label: videoTitle,
  });
};

/**
 * Track downloads
 */
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent({
    event: 'file_download',
    event_category: 'engagement',
    event_label: fileName,
    file_type: fileType,
  });
};
