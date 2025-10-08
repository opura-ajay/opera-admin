import Head from 'next/head';
import LegalLayout from '@/app/frontend/components/legal/LegalLayout';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Opura Admin</title>
        <meta name="description" content="Privacy Policy for Opura Admin" />
      </Head>

      <LegalLayout title="Privacy Policy" lastUpdated="October 8, 2025">
        <section id="introduction">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Opura Admin ("we," "our," or "us"). We are committed to
            protecting your privacy and ensuring the security of your personal
            information.
          </p>
        </section>

        <section id="information-collection">
          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <ul>
            <li>Name and email address</li>
            <li>Account credentials</li>
            <li>Profile information</li>
          </ul>

          <h3>2.2 Usage Data</h3>
          <ul>
            <li>IP address and browser type</li>
            <li>Pages visited and time spent</li>
            <li>Device information</li>
          </ul>
        </section>

        <section id="how-we-use">
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Improve user experience</li>
            <li>Send notifications and updates</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </section>

        <section id="data-sharing">
          <h2>4. Data Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. We may share data with:
          </p>
          <ul>
            <li>Service providers who assist our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with your consent</li>
          </ul>
        </section>

        <section id="data-security">
          <h2>5. Data Security</h2>
          <p>
            We implement industry-standard security measures including
            encryption, secure servers, and regular security audits to protect
            your information.
          </p>
        </section>

        <section id="cookies">
          <h2>6. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience.
            You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section id="your-rights">
          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request corrections or deletions</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section id="children">
          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not intended for users under 13 years of age. We
            do not knowingly collect information from children.
          </p>
        </section>

        <section id="changes">
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you
            of significant changes via email or platform notification.
          </p>
        </section>

        <section id="contact">
          <h2>10. Contact Us</h2>
          <p>For privacy-related questions or concerns, contact us at:</p>
          <address className="not-italic">
            <strong>Email:</strong> privacy@opura-admin.com
            <br />
            <strong>Address:</strong> [Your Company Address]
          </address>
        </section>
      </LegalLayout>
    </>
  );
}