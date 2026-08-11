import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function WhatsAppIconButton({ className }: { className?: string }) {
  return (
    <a
      href={getWhatsAppHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white",
        className
      )}
    >
      <FaWhatsapp className="h-5 w-5" />
    </a>
  );
}
