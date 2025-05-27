"use client";

import {motion} from "framer-motion";
import {CircuitBoard} from "lucide-react";
import Link from "next/link";
import {useState} from "react";

const legalContents: Record<string, {title: string; body: JSX.Element}> = {
  "Privacy Policy": {
    title: "Privacy Policy",
    body: (
      <>
        <p>This policy outlines how Shreeram IT Solutions collects, uses, and protects user data on ShreeramIT.com, ensuring transparency and compliance with Nepal’s privacy laws.</p>
        <p>
          <strong>Company Information:</strong> Shreeram IT Solutions, located at Kathmandu, Nepal, operates ShreeramIT.com and is committed to safeguarding your privacy under the Individual Privacy
          Act, 2018.
        </p>
        <p>
          <strong>Data Collected:</strong> We collect voluntarily provided data (e.g., names, emails, phone numbers during service inquiries or purchases) and automatically gathered data (e.g., IP
          addresses, browser types, device details via cookies or analytics tools).
        </p>
        <p>
          <strong>Purpose of Collection:</strong> Data is used to provide IT services (e.g., software development, IT consulting), process transactions, improve website functionality, and send
          marketing communications (with your explicit consent).
        </p>
        <p>
          <strong>Consent Requirement:</strong> Per Nepal’s privacy law, we obtain your consent before collecting or sharing personal data, except when required by legal authorities or court orders.
        </p>
        <p>
          <strong>Data Storage:</strong> Your data is stored on secure servers (local or cloud-based) with encryption and access controls to prevent unauthorized access, though no system is entirely
          risk-free.
        </p>
        <p>
          <strong>Data Sharing:</strong> We may share data with trusted third parties (e.g., payment processors, hosting providers) only with your consent; their privacy policies apply to their
          services.
        </p>
        <p>
          <strong>User Rights:</strong> You have the right to access, correct, or request deletion of your data under the Individual Privacy Act, 2018, and, if applicable, GDPR (e.g., right to be
          forgotten for EU users).
        </p>
        <p>
          <strong>Data Retention:</strong> We retain data only as long as necessary for service delivery or legal compliance (e.g., tax obligations), after which it is securely deleted.
        </p>
        <p>
          <strong>Security Measures:</strong> We use industry-standard protections like SSL encryption and firewalls to safeguard your data against breaches or unauthorized access.
        </p>
        <p>
          <strong>Contact and Updates:</strong> For privacy inquiries, contact us at [insert email/phone/address]; this policy may be updated, with changes reflected in the “Last Updated: May 27,
          2025” date.
        </p>
      </>
    ),
  },
  "Terms of Service": {
    title: "Terms of Service (ToS)",
    body: (
      <>
        <p>This agreement governs the use of ShreeramIT.com and Shreeram IT Solutions’ services, setting rules to protect both the company and users.</p>
        <p>
          <strong>Agreement Scope:</strong> By accessing ShreeramIT.com or using our IT services (e.g., software solutions, IT support), you agree to these legally binding Terms of Service.
        </p>
        <p>
          <strong>Service Description:</strong> We provide IT services such as software development, IT consulting, and cloud solutions, which you agree to use solely for lawful purposes.
        </p>
        <p>
          <strong>User Responsibilities:</strong> You must provide accurate information during registration and refrain from illegal activities, such as hacking or distributing malicious content.
        </p>
        <p>
          <strong>Account Management:</strong> Accounts created for services require secure passwords; we may suspend or terminate accounts for misuse, such as violating these terms.
        </p>
        <p>
          <strong>Payment Terms:</strong> For paid services, pricing and refund policies are detailed at [insert link]; subscriptions renew automatically unless canceled before the billing cycle.
        </p>
        <p>
          <strong>Intellectual Property:</strong> All website content, software, and trademarks are owned by Shreeram IT Solutions; users grant us a license to use their data for service provision.
        </p>
        <p>
          <strong>Acceptable Use:</strong> Prohibited actions include reverse-engineering our software, posting harmful content, or attempting to disrupt our services.
        </p>
        <p>
          <strong>Limitation of Liability:</strong> Services are provided “as is”; we are not liable for damages (e.g., data loss, service interruptions) beyond what Nepali law permits.
        </p>
        <p>
          <strong>Termination:</strong> We may terminate your access for violating these terms; you can cancel your account by contacting us at [insert email/phone].
        </p>
        <p>
          <strong>Governing Law:</strong> Disputes are governed by Nepal’s laws and resolved in Kathmandu courts, ensuring compliance with local jurisdiction.
        </p>
      </>
    ),
  },
  "Cookie Policy": {
    title: "Cookie Policy",
    body: (
      <>
        <p>This policy explains how ShreeramIT.com uses cookies to enhance user experience and comply with Nepal’s privacy laws.</p>
        <p>
          <strong>What Are Cookies:</strong> Cookies are small text files stored on your device to track preferences, improve functionality, and enhance your experience on ShreeramIT.com.
        </p>
        <p>
          <strong>Types of Cookies:</strong> We use essential cookies (for website functionality, e.g., login sessions), analytics cookies (e.g., Google Analytics), and, if applicable, advertising
          cookies for personalized ads.
        </p>
        <p>
          <strong>Purpose of Cookies:</strong> Cookies help remember your preferences, analyze website performance, and deliver tailored content or ads (with your consent).
        </p>
        <p>
          <strong>First-Party Cookies:</strong> These are set by Shreeram IT Solutions to manage site features like navigation or user authentication.
        </p>
        <p>
          <strong>Third-Party Cookies:</strong> We may use third-party services (e.g., Google Analytics) that set cookies; their privacy policies (e.g., https://policies.google.com) apply.
        </p>
        <p>
          <strong>Consent Requirement:</strong> Per Nepal’s Individual Privacy Act, 2018, we seek your consent for non-essential cookies via a consent banner or settings.
        </p>
        <p>
          <strong>User Control:</strong> You can manage cookies through browser settings to accept, reject, or delete them, though disabling cookies may limit website functionality.
        </p>
        <p>
          <strong>Cookie Duration:</strong> Session cookies expire when you close your browser; persistent cookies have set expiration dates (e.g., 30 days for analytics).
        </p>
        <p>
          <strong>Opt-Out Options:</strong> For third-party cookies, opt out via tools like https://optout.networkadvertising.org/ or adjust browser settings.
        </p>
        <p>
          <strong>Contact and Updates:</strong> For cookie-related inquiries, contact us at [insert email/phone/address]; this policy may be updated, with changes reflected in the “Last Updated: May
          27, 2025” date.
        </p>
      </>
    ),
  },
};

function LegalModal({open, onClose, content}: {open: boolean; onClose: () => void; content: string}) {
  if (!open) return null;
  const legal = legalContents[content];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-background rounded-lg shadow-lg p-6 max-w-lg w-full relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-xl" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2 className="font-bold text-lg mb-4">{legal?.title}</h2>
        <div className="text-muted-foreground space-y-3">{legal?.body}</div>
      </div>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleLegalClick = (content: string) => {
    setModalContent(content);
    setModalOpen(true);
  };

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <CircuitBoard className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">ShreeRam IT Solutions</span>
            </Link>
            <p className="text-muted-foreground">Transforming businesses through innovative technology solutions.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Custom Development
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-muted-foreground hover:text-foreground">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-muted-foreground hover:text-foreground" onClick={() => handleLegalClick("Privacy Policy")} type="button">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-foreground" onClick={() => handleLegalClick("Terms of Service")} type="button">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="text-muted-foreground hover:text-foreground" onClick={() => handleLegalClick("Cookie Policy")} type="button">
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} ShreeRam IT Solutions. All rights reserved.</p>
        </div>
      </div>
      <LegalModal open={modalOpen} onClose={() => setModalOpen(false)} content={modalContent} />
    </footer>
  );
}
