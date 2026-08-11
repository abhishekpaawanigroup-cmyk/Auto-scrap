import { SITE_CONFIG } from "@/constants/site";

export function getWhatsAppHref(
  message: string = `Hi ${SITE_CONFIG.name}, I'd like to know more about scrapping my vehicle.`
) {
  const digits = SITE_CONFIG.contact.phoneRaw.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
