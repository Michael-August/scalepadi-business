"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const TermsOfUse = () => {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction & Acceptance of Terms",
      content: (
        <p className="text-gray-700 leading-relaxed">
          By accessing or using the ScalePadi platform ("ScalePadi", "we",
          "our", or "us"), you agree to comply with and be bound by these Terms
          of Use ("Terms") and our Privacy Policy. If you do not agree, do not
          use the Platform. These Terms apply to all users globally.
        </p>
      ),
    },
    {
      id: "eligibility",
      title: "2. Eligibility & Account Registration",
      content: (
        <p className="text-gray-700 leading-relaxed">
          You must be at least 18 years old and legally able to form a binding
          contract to use our services. By creating an account, you represent
          that all registration information is accurate and complete.
        </p>
      ),
    },
    {
      id: "services",
      title: "3. Services Overview",
      content: (
        <div className="space-y-4 text-gray-700">
          <div>
            <h4 className="font-medium text-gray-800">3.1 For Businesses:</h4>
            <p>
              Tools for diagnosing growth challenges, generating
              recommendations, and accessing expert support.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">3.2 For Experts:</h4>
            <p>
              Opportunities to provide professional services and be matched to
              business needs.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">
              3.3 For Academy Participants:
            </h4>
            <p>
              Structured training and internship programs in sales, marketing,
              and growth.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable Use & Prohibited Conduct",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>
            Users agree to use the Platform lawfully. Prohibited behaviors
            include, but are not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            {[
              "Spreading malware or malicious code",
              "Phishing or fraudulent activities",
              "Misrepresentation of identity or qualifications",
              "Unauthorized data collection or scraping",
              "Hate speech, harassment, or discriminatory content",
              "Attempting to reverse-engineer our systems",
              "Any activity that violates applicable laws",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "ai-disclaimer",
      title: "5. AI Use Disclaimer",
      content: (
        <p className="text-gray-700 leading-relaxed">
          ScalePadi uses artificial intelligence to generate business insights
          and recommendations. These outputs are informational and not
          guaranteed to be accurate. Users are responsible for their decisions
          based on AI suggestions. The AI-generated content should not be
          considered as professional advice without independent verification.
        </p>
      ),
    },
    {
      id: "ip-rights",
      title: "6. Intellectual Property Rights",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>
            All Platform content, including design, software, and logos, are
            owned by ScalePadi or licensed for use. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Platform interface and user experience design</li>
            <li>Proprietary algorithms and methodologies</li>
            <li>Branding elements and visual identity</li>
            <li>Documentation and training materials</li>
          </ul>
          <p>
            You may not reproduce, copy, or distribute Platform content without
            prior written consent.
          </p>
        </div>
      ),
    },
    {
      id: "user-content",
      title: "7. User-Generated Content & License",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>
            Users retain ownership of their uploaded content but grant
            ScalePadi:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A non-exclusive, worldwide license to use the content</li>
            <li>
              Right to display and distribute the content for service delivery
            </li>
            <li>Permission to analyze content to improve services</li>
          </ul>
          <p>
            You represent that you have all necessary rights to any content you
            upload.
          </p>
        </div>
      ),
    },
    {
      id: "fees",
      title: "8. Fees, Payments & Refunds",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>
            Users agree to applicable fees for paid services. Specific terms
            include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment is due upon invoice unless otherwise agreed</li>
            <li>Subscription services auto-renew unless canceled</li>
            <li>Refund policies vary by service (see service agreements)</li>
            <li>We reserve the right to modify pricing with 30 days notice</li>
          </ul>
        </div>
      ),
    },
    {
      id: "security",
      title: "9. Account Security",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintaining confidentiality of login credentials</li>
            <li>All activities under your account</li>
            <li>Ensuring proper logout from shared devices</li>
          </ul>
          <p>
            Notify ScalePadi immediately at{" "}
            <a
              href="mailto:support@scalepadi.com"
              className="text-blue-600 hover:underline"
            >
              support@scalepadi.com
            </a>{" "}
            if you suspect unauthorized access.
          </p>
        </div>
      ),
    },
    {
      id: "third-party",
      title: "10. Third-Party Services",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>ScalePadi may integrate with third-party services including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment processors (Stripe, PayPal)</li>
            <li>Analytics providers (Google Analytics)</li>
            <li>Cloud service providers (AWS, Google Cloud)</li>
          </ul>
          <p>
            We are not responsible for the data practices or performance of
            third-party services. Their use is governed by their respective
            terms.
          </p>
        </div>
      ),
    },
    {
      id: "privacy",
      title: "11. Data Privacy & Protection",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>
            Your data is handled in accordance with our Privacy Policy. We
            comply with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>GDPR (General Data Protection Regulation) for EU users</li>
            <li>CCPA (California Consumer Privacy Act)</li>
            <li>NDPR (Nigeria Data Protection Regulation)</li>
          </ul>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data.
          </p>
        </div>
      ),
    },
    {
      id: "warranties",
      title: "12. Disclaimer of Warranties",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>The Platform and services are provided:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>"As-is" and "as-available"</li>
            <li>Without warranties of any kind, either express or implied</li>
            <li>Without guarantee of uninterrupted or error-free service</li>
          </ul>
          <p>
            We do not warrant that the Platform will meet all your requirements
            or that results will be accurate or reliable.
          </p>
        </div>
      ),
    },
    {
      id: "liability",
      title: "13. Limitation of Liability",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>ScalePadi will not be liable for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Any indirect, incidental, or consequential damages</li>
            <li>Loss of profit, revenue, or data</li>
            <li>Business interruptions</li>
            <li>Costs of substitute goods or services</li>
          </ul>
          <p>
            This limitation applies even if we have been advised of the
            possibility of such damages.
          </p>
        </div>
      ),
    },
    {
      id: "indemnification",
      title: "14. Indemnification",
      content: (
        <p className="text-gray-700 leading-relaxed">
          You agree to indemnify and hold harmless ScalePadi and its affiliates
          from any claims, damages, or expenses (including attorneys' fees)
          arising out of your use of the Platform or violation of these Terms.
          This includes any third-party claims related to content you submit or
          your conduct on the Platform.
        </p>
      ),
    },
    {
      id: "termination",
      title: "15. Termination & Suspension",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>ScalePadi may:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Suspend or terminate your access at any time for violations</li>
            <li>Remove content that violates these Terms</li>
            <li>Discontinue service with 30 days notice</li>
          </ul>
          <p>
            You may request account closure at any time by contacting{" "}
            <a
              href="mailto:support@scalepadi.com"
              className="text-blue-600 hover:underline"
            >
              support@scalepadi.com
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      id: "disputes",
      title: "16. Dispute Resolution & Governing Law",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>
            These Terms are governed by the laws of the Federal Republic of
            Nigeria. Disputes will be resolved as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>First through good faith negotiations</li>
            <li>Then through mediation in Lagos, Nigeria</li>
            <li>
              If unresolved, by binding arbitration under Nigerian Arbitration
              Act
            </li>
            <li>Court litigation only if arbitration fails</li>
          </ul>
        </div>
      ),
    },
    {
      id: "modifications",
      title: "17. Modifications to Terms",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>
            We reserve the right to update these Terms at any time. Changes will
            be communicated through:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email notification to registered users</li>
            <li>Platform notice upon login</li>
            <li>Updated "Effective Date" at top of Terms</li>
          </ul>
          <p>
            Continued use after changes constitutes acceptance of the modified
            Terms.
          </p>
        </div>
      ),
    },
    {
      id: "communications",
      title: "18. Communication & Notices",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>By using the Platform, you agree to receive:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Transactional communications (account notices, service updates)
            </li>
            <li>Promotional communications (newsletters, offers)</li>
          </ul>
          <p>
            You may opt out of promotional messages at any time using the
            unsubscribe link or account settings.
          </p>
        </div>
      ),
    },
    {
      id: "contact",
      title: "19. Contact Information",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>For questions or concerns about these Terms:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:support@scalepadi.com"
                className="text-blue-600 hover:underline"
              >
                support@scalepadi.com
              </a>
            </li>
            <li>
              Website:{" "}
              <a
                href="https://www.scalepadi.com"
                className="text-blue-600 hover:underline"
              >
                www.scalepadi.com
              </a>
            </li>
            <li>Mailing Address: No 26 Abu Lamidat street Abuja, Nigeria</li>
          </ul>
          <p>We typically respond to inquiries within 2 business days.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-extrabold text-gray-900 sm:text-4xl"
            >
              Terms of Use
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-3 text-xs md:text-xl text-gray-500"
            >
              Effective Date: 24th July, 2025
            </motion.p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-4 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-24 overflow-hidden">
              <nav className="h-full overflow-y-auto pr-4 py-2">
                <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3 px-3">
                  Table of Contents
                </h2>
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <motion.li
                      key={section.id}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <button
                        onClick={() => {
                          setActiveSection(section.id);
                          document.getElementById(section.id)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-md transition-all duration-200 ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="block truncate text-sm">
                          {section.title.split(".")[1].trim()}
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Terms Content */}
          <div className="w-full lg:flex-1 bg-white rounded shadow overflow-hidden">
            <div className="p-6 md:p-8 lg:p-10">
              <div className="prose prose-blue max-w-none">
                {sections.map((section) => (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-4 last:mb-0 scroll-mt-24`}
                  >
                    <h2 className="md:text-2xl font-bold text-gray-900 mb-2">
                      {section.title}
                    </h2>
                    <div className="text-gray-700 space-y-4">
                      {section.content}
                    </div>
                  </motion.section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ScalePadi. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
};

export default TermsOfUse;
