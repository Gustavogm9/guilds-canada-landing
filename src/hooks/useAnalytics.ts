export function useAnalytics() {
  const trackWhatsAppClick = (section: string, message: string) => {
    // console.log('WhatsApp Click:', section, message);
  };

  const trackCTAClick = (label: string, props: any) => {};
  const trackNewsletterSubscribe = (section: string) => {};

  return { trackWhatsAppClick, trackCTAClick, trackNewsletterSubscribe };
}
