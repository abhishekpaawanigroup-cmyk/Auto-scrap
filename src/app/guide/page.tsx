import Image from "next/image";
import {
  BadgeCheck,
  BatteryCharging,
  CarFront,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Gauge,
  Handshake,
  Leaf,
  MapPin,
  MessageCircle,
  Recycle,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import "../globals.css";

type Icon = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

const brand = "carcrush24";

function Mark({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={`guide-mark ${inverse ? "guide-mark-inverse" : ""}`}>
      <span className="guide-mark-symbol">C</span>
      <span>{brand}</span>
    </div>
  );
}

function PageFooter({ dark = false }: { dark?: boolean }) {
  return (
    <footer className={`guide-footer ${dark ? "guide-footer-dark" : ""}`}>
      <span>{brand} &nbsp; / &nbsp; Responsible Vehicle Recycling</span>
      <span className="guide-footer-page">CARCRUSH24 • GUIDE</span>
    </footer>
  );
}

function Page({ children, className = "", dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  return <section className={`guide-page ${dark ? "guide-page-dark" : ""} ${className}`}>{children}<PageFooter dark={dark} /></section>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`guide-eyebrow ${light ? "guide-eyebrow-light" : ""}`}>{children}</p>;
}

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className={`guide-heading ${light ? "guide-heading-light" : ""}`}><Eyebrow light={light}>{eyebrow}</Eyebrow><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <Image src={src} alt={alt} width={1200} height={800} className={`guide-photo ${className}`} unoptimized />;
}

const reasons: { icon: Icon; title: string; copy: string }[] = [
  { icon: CircleDollarSign, title: "Recover value", copy: "Turn an unwanted vehicle into a clear, considered estimate." },
  { icon: Wrench, title: "Lower upkeep", copy: "Move on when repairs cost more than the vehicle is worth." },
  { icon: Leaf, title: "Reduce waste", copy: "Give reusable materials a route back into the economy." },
  { icon: ShieldCheck, title: "Stay informed", copy: "Keep the handover, verification and paperwork transparent." },
  { icon: Recycle, title: "Recycle responsibly", copy: "Support careful handling of fluids, parts and materials." },
];

const journey = ["Vehicle reception", "Depollution", "Dismantling", "Material segregation", "Metal recycling", "Responsible disposal"];
const process = [
  ["01", "Submit your vehicle details", "Share the make, model, location and condition."],
  ["02", "Get an initial estimate", "Receive a preliminary view based on the details provided."],
  ["03", "Document & vehicle verification", "The details and vehicle are checked before collection."],
  ["04", "Schedule vehicle pickup", "Choose a practical time and confirm the collection location."],
  ["05", "Vehicle reaches the facility", "The vehicle is transported to the appropriate scrapping facility."],
  ["06", "Scrapping, recycling & documentation", "The vehicle is processed and the relevant handover records are shared."],
];

const faqs = [
  ["What types of vehicles can be scrapped?", "Cars, bikes and commercial vehicles may be considered, subject to vehicle details, ownership and applicable requirements."],
  ["How is the scrap value estimated?", "The estimate can consider vehicle type, make, model, condition, usable parts, material value and current market factors."],
  ["What documents are required?", "Typically, registration and identity documents are requested. The exact list depends on the vehicle and applicable regulations."],
  ["Can my vehicle be picked up from my location?", "Pickup may be arranged based on location, access, vehicle condition and scheduling availability."],
  ["How long does the process take?", "Timing varies with verification, location, vehicle condition and facility scheduling. The team can confirm the expected next step."],
  ["What happens after scrapping?", "The vehicle is depolluted, dismantled and sorted so recoverable materials can be recycled and other components handled appropriately."],
  ["Will I receive documentation?", "Relevant handover or processing documentation can be discussed during verification. Keep copies of all records provided."],
  ["Can damaged or non-running vehicles be scrapped?", "They may be eligible. Share the condition early so the collection method and safety requirements can be assessed."],
  ["How do I start?", "Submit your vehicle details through the website or contact channel, then follow the verification steps."],
];

export default function VehicleScrappingGuide() {
  return (
    <main className="guide-document">
      <Page className="guide-cover" dark>
        <div className="guide-cover-image"><Photo src="/images/gallery/pickup.png" alt="Professional vehicle pickup truck collecting an end-of-life car" /></div>
        <div className="guide-cover-shade" />
        <div className="guide-cover-content"><Mark inverse /><div className="guide-cover-kicker">Responsible vehicle recycling</div><h1>Complete<br /><em>Vehicle Scrapping</em><br />Guide</h1><p>A simple guide to safe, legal and hassle-free vehicle scrapping.</p><div className="guide-cover-meta"><span>12 chapters</span><span>Cars • Bikes • Commercial vehicles</span></div></div>
        <div className="guide-cover-badge"><Recycle size={18} /> Responsible Vehicle Recycling</div>
      </Page>

      <Page><div className="guide-inner"><SectionHeading eyebrow="01 / The right time" title="Why should you scrap your end-of-life vehicle?" copy="When a vehicle has reached the end of its useful life, a considered handover is better for your wallet, your records and the materials inside the vehicle." /><div className="guide-reason-grid">{reasons.map(({ icon: ReasonIcon, title, copy }) => <article className="guide-card guide-reason-card" key={title}><div className="guide-icon"><ReasonIcon size={22} /></div><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="guide-callout"><span className="guide-callout-number">01</span><p><strong>A responsible end is part of the vehicle’s lifecycle.</strong> Professional processing helps recover useful materials while reducing unnecessary waste.</p></div></div></Page>

      <Page className="guide-process-page"><div className="guide-inner"><SectionHeading eyebrow="02 / The basics" title="What is vehicle scrapping?" copy="Vehicle scrapping is the controlled process of taking an old, damaged or unwanted vehicle out of use, removing recoverable components and preparing materials for recycling or appropriate disposal." /><div className="guide-flow">{["Old vehicle", "Collection", "Verification", "Depollution", "Dismantling", "Recycling"].map((item, index) => <div className="guide-flow-step" key={item}><span className="guide-flow-index">0{index + 1}</span><div className="guide-flow-icon">{index === 0 ? <CarFront size={24} /> : index === 1 ? <Truck size={24} /> : index === 2 ? <ClipboardCheck size={24} /> : index === 3 ? <BatteryCharging size={24} /> : index === 4 ? <Wrench size={24} /> : <Recycle size={24} />}</div><strong>{item}</strong>{index < 5 && <span className="guide-flow-arrow">→</span>}</div>)}</div><div className="guide-split-note"><div><Gauge size={22} /><strong>A clear sequence</strong><p>Each stage creates a practical checkpoint for communication and record keeping.</p></div><div><ShieldCheck size={22} /><strong>Handled with care</strong><p>Vehicle condition and safety needs are considered before movement or processing.</p></div></div></div></Page>

      <Page><div className="guide-inner"><SectionHeading eyebrow="03 / Eligibility" title="Who can scrap a vehicle?" copy="The starting point is simple: you should be the owner or have the authority to act for the owner, and the vehicle should be suitable for an end-of-life assessment." /><div className="guide-eligibility"><div className="guide-list">{["Private vehicle owners", "Commercial vehicle owners", "Owners of old or end-of-life vehicles", "Damaged or non-roadworthy vehicles", "Vehicles no longer economical to maintain"].map((item) => <div className="guide-list-item" key={item}><Check size={17} />{item}</div>)}</div><div className="guide-document-card"><FileText size={28} /><Eyebrow>Keep ready</Eyebrow><h3>Documents you may need</h3><p>Registration, identity and vehicle-related documents may be requested during verification. Authorization may be needed where applicable.</p><span className="guide-chip">Requirements can vary</span></div></div><div className="guide-note"><BadgeCheck size={19} /><span>Eligibility and paperwork are confirmed case by case. Ask the CarCrush24 team what applies to your vehicle before collection.</span></div></div></Page>

      <Page className="guide-documents-page"><div className="guide-inner"><div className="guide-document-intro"><div><SectionHeading eyebrow="04 / Before you begin" title="Documents required" copy="Having the right records close at hand makes verification smoother. Keep original documents secure and share copies only through a trusted channel." /></div><div className="guide-file-stamp"><FileCheck2 size={26} /><span>CHECKLIST</span></div></div><div className="guide-checklist">{["Registration Certificate (RC)", "Valid identity proof", "Vehicle-related documents", "Authorization documents, where applicable"].map((item, index) => <div className="guide-check-item" key={item}><span>0{index + 1}</span><div className="guide-check-box"><Check size={17} /></div><strong>{item}</strong><small>Confirm during verification</small></div>)}</div><div className="guide-legal-note"><ShieldCheck size={20} /><div><strong>A practical note on requirements</strong><p>Exact document requirements may vary depending on the vehicle and applicable regulations. CarCrush24 will confirm the next step for your specific case.</p></div></div><div className="guide-paper-lines" /></div></Page>

      <Page className="guide-timeline-page" dark><div className="guide-inner"><SectionHeading eyebrow="05 / Your journey" title="How the CarCrush24 process works" copy="A six-step route from your first message to responsible processing and documentation." light /><div className="guide-timeline">{process.map(([number, title, copy]) => <div className="guide-timeline-item" key={number}><span className="guide-timeline-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div><div className="guide-timeline-foot"><MessageCircle size={18} /> Clear updates at every meaningful checkpoint.</div></div></Page>

      <Page className="guide-pickup-page"><div className="guide-pickup-image"><Photo src="/images/gallery/pickup.png" alt="Vehicle pickup truck ready for a safe collection" /></div><div className="guide-inner guide-pickup-inner"><SectionHeading eyebrow="06 / Collection" title="Vehicle pickup, made clear" copy="Once the details are verified, collection is arranged around your location, the vehicle’s condition and safe access to the pickup point." /><div className="guide-pickup-points">{[[MapPin, "Pickup scheduling", "Agree a practical date, time and location."], [ClipboardCheck, "Required verification", "Keep the vehicle and requested records ready."], [Truck, "Safe transportation", "The right collection method depends on access and vehicle condition."]].map(([PickupIcon, title, copy]) => { const IconComponent = PickupIcon as Icon; return <div className="guide-pickup-point" key={title as string}><div className="guide-icon"><IconComponent size={22} /></div><div><h3>{title as string}</h3><p>{copy as string}</p></div></div>; })}</div></div></Page>

      <Page className="guide-journey-page"><div className="guide-inner"><SectionHeading eyebrow="07 / Behind the scenes" title="What happens to your vehicle?" copy="After reception, the vehicle moves through a sequence designed to separate useful materials and handle components thoughtfully." /><div className="guide-journey-layout"><div className="guide-journey-list">{journey.map((item, index) => <div className="guide-journey-item" key={item}><span className="guide-journey-num">0{index + 1}</span><div><strong>{item}</strong><small>{index === 0 ? "Logged and assessed" : index === 1 ? "Fluids and sensitive components addressed" : index === 2 ? "Parts separated with care" : index === 3 ? "Materials grouped by type" : index === 4 ? "Recoverable metals prepared" : "Non-recoverable components managed appropriately"}</small></div>{index < journey.length - 1 && <ChevronDown size={16} />}</div>)}</div><div className="guide-journey-image"><Photo src="/images/scrap/scrap3.png" alt="Vehicle dismantling and sorted recycling materials" /><div className="guide-image-label"><Recycle size={18} /> Material recovery</div></div></div></div></Page>

      <Page className="guide-environment-page" dark><div className="guide-environment-art"><Photo src="/images/gallery/eco.png" alt="Recycling facility with sorted vehicle materials" /></div><div className="guide-inner guide-environment-inner"><SectionHeading eyebrow="08 / The bigger picture" title="Scrapping responsibly helps build a cleaner future" copy="A vehicle contains valuable metals, glass, plastics, rubber and components that can have a second life when they are recovered through a considered process." light /><div className="guide-benefit-grid">{[[Recycle, "Recover materials", "Return useful resources to productive use."], [Leaf, "Reduce waste", "Keep end-of-life components out of unmanaged disposal routes."], [BatteryCharging, "Handle fluids carefully", "Sensitive fluids and components need appropriate attention."], [Handshake, "Support circularity", "Make the most of materials already in circulation."]].map(([BenefitIcon, title, copy]) => { const IconComponent = BenefitIcon as Icon; return <div className="guide-benefit" key={title as string}><IconComponent size={21} /><strong>{title as string}</strong><p>{copy as string}</p></div>; })}</div></div></Page>

      <Page><div className="guide-inner"><SectionHeading eyebrow="09 / What to expect" title="Safety & transparency" copy="A professional vehicle scrapping experience should feel understandable from the first conversation to the final record." /><div className="guide-safety-grid">{[[ShieldCheck, "Transparent process", "Know what happens next and why."], [FileCheck2, "Proper documentation", "Keep a clear record of the vehicle handover."], [ClipboardCheck, "Vehicle verification", "Match the vehicle and details before processing."], [Recycle, "Responsible recycling", "Separate recoverable materials from other components."], [MessageCircle, "Customer communication", "Receive timely updates on meaningful steps."], [BadgeCheck, "Secure information handling", "Share personal and vehicle details through trusted channels."]].map(([SafetyIcon, title, copy]) => { const IconComponent = SafetyIcon as Icon; return <div className="guide-card guide-safety-card" key={title as string}><IconComponent size={23} /><div><h3>{title as string}</h3><p>{copy as string}</p></div></div>; })}</div><div className="guide-transparency-bar"><span>CARCRUSH24 STANDARD</span><strong>Clear handover. Considered processing. Fewer surprises.</strong></div></div></Page>

      <Page className="guide-faq-page"><div className="guide-inner"><SectionHeading eyebrow="10 / Common questions" title="Frequently asked questions" copy="Short answers to help you prepare. Your exact requirements are confirmed during the vehicle review." /><div className="guide-faq-grid">{faqs.map(([question, answer], index) => <div className="guide-faq" key={question}><div className="guide-faq-top"><span>Q{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><ChevronDown size={17} /></div><p>{answer}</p></div>)}</div></div></Page>

      <Page className="guide-cta-page" dark><div className="guide-cta-image"><Photo src="/images/scrap/scrap1.png" alt="End-of-life vehicle ready for responsible recycling" /></div><div className="guide-cta-overlay" /><div className="guide-inner guide-cta-inner"><Mark inverse /><Eyebrow light>12 / Start here</Eyebrow><h2>Ready to scrap<br /><em>your vehicle?</em></h2><p>Start your vehicle scrapping journey with carcrush24.</p><div className="guide-cta-button">GET MY ESTIMATE <span>→</span></div><div className="guide-contact-grid"><div><span>Website</span><strong>carcrush24.com</strong></div><div><span>Phone</span><strong>[YOUR PHONE NUMBER]</strong></div><div><span>WhatsApp</span><strong>[YOUR WHATSAPP NUMBER]</strong></div><div><span>Email</span><strong>[YOUR EMAIL]</strong></div></div><div className="guide-qr-wrap"><div className="guide-qr" aria-label="QR code placeholder"><i /><i /><i /><i /><b /><b /><b /><b /></div><span>Scan to<br />get your estimate</span></div></div></Page>
    </main>
  );
}