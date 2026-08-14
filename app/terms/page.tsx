import type { Metadata } from "next";

import { LegalPage, type LegalSection } from "../components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service · TokenSupply",
  description:
    "The terms that govern your use of TokenSupply's automated key delivery service.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Agreement to these terms",
    body: [
      "These terms form an agreement between you and TokenSupply Private Limited (\"TokenSupply\", \"we\", \"us\") covering your use of our website, dashboard, and automated key delivery service (together, the \"Service\").",
      "By joining the waitlist, creating an account, or connecting a sales channel, you accept these terms. If you are agreeing on behalf of a company, you confirm you have the authority to bind that company.",
    ],
  },
  {
    heading: "The service",
    body: [
      "TokenSupply connects the marketplaces you already sell on, such as G2A, Eneba, Kinguin, eBay and Shopify, and delivers digital keys to your buyers automatically when an order is placed. We also synchronise stock levels across connected channels to reduce the risk of overselling.",
      "The Service is currently in early access. Features may change, and availability targets described on our marketing pages are goals rather than contractual guarantees.",
    ],
  },
  {
    heading: "Your account",
    body: [
      "You are responsible for the accuracy of the information you give us and for all activity that happens under your account.",
    ],
    bullets: [
      "Keep your credentials and marketplace API keys confidential.",
      "Tell us promptly if you believe your account has been accessed without your permission.",
      "You must be at least 18 years old, or the age of majority where you live, to use the Service.",
    ],
  },
  {
    heading: "Your content and keys",
    body: [
      "You keep ownership of the keys, product data, and other content you upload. You grant us a limited licence to store, process, and transmit that content strictly so we can operate the Service on your behalf; for example, delivering a key to the buyer who purchased it.",
      "You are responsible for having the right to sell everything you upload. Do not upload keys you did not lawfully obtain, or that you are not authorised to resell.",
    ],
  },
  {
    heading: "Acceptable use",
    body: ["You agree not to use the Service to:"],
    bullets: [
      "Sell stolen, fraudulently obtained, counterfeit, or region-restricted keys in breach of a publisher's terms.",
      "Break the rules of any marketplace you connect, or misrepresent what a buyer is purchasing.",
      "Interfere with, overload, or attempt to gain unauthorised access to the Service or another user's data.",
      "Resell or white-label the Service without our written agreement.",
    ],
  },
  {
    heading: "Third-party marketplaces",
    body: [
      "The Service works by connecting to marketplaces we do not control. Your relationship with each marketplace is governed by that marketplace's own terms, and they may change their APIs, fees, or policies at any time.",
      "We are not responsible for a marketplace suspending your account, changing its rules, or experiencing an outage, though we will make reasonable efforts to keep our integrations working.",
    ],
  },
  {
    heading: "Fees and billing",
    body: [
      "Pricing for paid plans will be shown before you subscribe. Fees are billed in advance and, except where the law requires otherwise, are non-refundable for the period already served.",
      "During early access, some or all features may be provided free of charge. We will give you reasonable notice before charging for something that was previously free.",
    ],
  },
  {
    heading: "Availability and support",
    body: [
      "We aim to keep the Service running continuously, but we may need to pause it for maintenance, upgrades, or urgent security work. We will give advance notice of planned downtime where practical.",
      "We do not guarantee uninterrupted or error-free operation, and delivery speeds quoted on our marketing pages describe typical performance rather than a committed service level.",
    ],
  },
  {
    heading: "Suspension and termination",
    body: [
      "You can stop using the Service and close your account at any time. We may suspend or terminate access if you breach these terms, if your use creates a legal or security risk, or if we are required to do so by law.",
      "When an account closes, we will make your data available for a reasonable period before deleting it, subject to any records we must keep.",
    ],
  },
  {
    heading: "Disclaimers and liability",
    body: [
      "The Service is provided \"as is\". To the fullest extent the law allows, we exclude implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      "To the fullest extent permitted by law, our total liability arising out of or relating to the Service is limited to the amount you paid us in the twelve months before the event giving rise to the claim. We are not liable for lost profits, lost sales, or indirect or consequential losses.",
      "Nothing in these terms limits liability that cannot be limited under applicable law.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms as the Service develops. If a change is material, we will let you know by email or through the dashboard before it takes effect. Continuing to use the Service after that point means you accept the updated terms.",
    ],
  },
  {
    heading: "Governing law and contact",
    body: [
      "These terms are governed by the laws of India, and the courts of India will have exclusive jurisdiction over any dispute, unless local consumer law gives you the right to bring a claim elsewhere.",
      "Questions about these terms can be sent to support@tokensupply.io.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="The ground rules for using TokenSupply: what we provide, what we ask of you, and where responsibility sits between us."
      updated="15 August 2026"
      sections={SECTIONS}
    />
  );
}
