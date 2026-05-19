/**
 * Google Analytics 4 (gtag.js)
 * 1. Create a property at https://analytics.google.com/
 * 2. Copy your Measurement ID (format: G-XXXXXXXXXX)
 * 3. Paste it below and deploy
 */
(function () {
  const GA_MEASUREMENT_ID = "G-MGM05MW5Z6";

  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.includes("XXXX")) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });
})();
