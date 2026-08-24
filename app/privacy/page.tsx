import type { Metadata } from "next";

import { LegalPage, type LegalSection } from "../components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy · TokenSupply",
  description:
    "How TokenSupply collects, uses, and protects your data and your buyers' data.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "TokenSupply Private Limited (\"TokenSupply\", \"we\", \"us\") operates the automated key delivery service described on this site. This policy explains what personal data we collect, why we collect it, and what rights you have over it.",
      "For data you upload about your own buyers, you are the data controller and we act as your processor, handling that data only to run the Service on your instructions.",
    ],
  },
  {
    heading: "Information we collect",
    body: ["We collect three broad categories of data:"],
    bullets: [
      "Account data: the name, email address, company name, and billing details you give us when joining the waitlist or creating an account.",
      "Order and inventory data: the keys, product listings, stock counts, order IDs, and buyer email addresses we receive from the marketplaces you connect, so we can fulfil deliveries.",
      "Usage and technical data: log entries, IP address, browser type, and pages visited, which help us diagnose faults and keep the Service secure.",
    ],
  },
  {
    heading: "How we use your information",
    body: ["We use the data above to:"],
    bullets: [
      "Deliver keys to your buyers and keep stock levels synchronised across your channels.",
      "Provide, maintain, and improve the Service, including debugging and performance work.",
      "Communicate with you about your account, early access availability, and material service changes.",
      "Detect and prevent fraud, abuse, and security incidents.",
      "Meet our legal, tax, and accounting obligations.",
    ],
  },
  {
    heading: "Legal bases",
    body: [
      "Where the GDPR or a similar law applies, we rely on: performance of our contract with you (running the Service); our legitimate interests (securing and improving the Service); your consent (optional marketing email, which you can withdraw at any time); and compliance with legal obligations.",
    ],
  },
  {
    heading: "Sharing your information",
    body: [
      "We do not sell your personal data, and we do not sell or share your buyers' data for advertising.",
      "We share data only with service providers who help us operate, such as cloud hosting, payment processing, error monitoring, and email delivery, and with the marketplaces you explicitly connect. These providers act on our instructions and are bound by confidentiality obligations.",
      "We may also disclose data if required by law, or as part of a merger or acquisition, in which case we will notify you before your data becomes subject to a different policy.",
    ],
  },
  {
    heading: "International transfers",
    body: [
      "Our providers may process data in countries other than yours. Where we transfer personal data out of a region with data-export restrictions, we rely on appropriate safeguards such as standard contractual clauses.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We keep account data for as long as your account is active, and for a reasonable period afterwards to handle disputes and meet record-keeping duties.",
      "Order records and delivered-key logs are retained so you and your buyers can resolve fulfilment questions. You can ask us to delete specific records earlier, subject to any legal obligation to retain them.",
    ],
  },
  {
    heading: "Security",
    body: [
      "Keys and credentials are encrypted in transit and at rest, and access to production systems is restricted to staff who need it.",
      "No system is perfectly secure, so we cannot guarantee absolute security, but if a breach affects your data, we will notify you and the relevant authorities as the law requires.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on where you live, you may have the right to access, correct, export, or delete your personal data, to object to or restrict certain processing, and to withdraw consent.",
      "To exercise any of these, email support@tokensupply.io. We will respond within the period the applicable law allows. You also have the right to complain to your local data protection authority.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "We use a small number of cookies and similar technologies to keep you signed in, remember your theme preference, and understand aggregate usage. You can clear or block cookies in your browser, though signing in may stop working if you do.",
    ],
  },
  {
    heading: "Children",
    body: [
      "The Service is intended for businesses and is not directed at children. We do not knowingly collect personal data from anyone under 18. If you believe a child has given us data, contact us and we will delete it.",
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      "We will update this policy as the Service evolves and will revise the date above whenever we do. If a change materially affects how we use your data, we will tell you directly.",
      "Privacy questions and requests can be sent to support@tokensupply.io.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What we collect, why we collect it, and the control you keep over your data and your buyers' data."
      updated="15 August 2026"
      sections={SECTIONS}
    />
  );
}
