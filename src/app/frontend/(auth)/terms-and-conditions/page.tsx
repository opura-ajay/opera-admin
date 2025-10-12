import Head from 'next/head';
import LegalLayout from '@/app/frontend/components/legal/LegalLayout';

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Opura Admin</title>
        <meta
          name="description"
          content="Terms and Conditions for Opura Admin"
        />
      </Head>

      <LegalLayout
        title="Terms & Conditions"
        lastUpdated="October 8, 2025"
      >
        <section id="acceptance">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Opura Admin ("the Service"), you accept and
            agree to be bound by these Terms and Conditions.
          </p>
        </section>

        <section id="definitions">
          <h2>2. Definitions</h2>
          <ul>
            <li>
              <strong>"Service"</strong> refers to the Opura Admin platform
            </li>
            <li>
              <strong>"User"</strong> refers to any individual or entity using
              the Service
            </li>
            <li>
              <strong>"Content"</strong> refers to all data, text, and media
              uploaded
            </li>
          </ul>
        </section>

        <section id="user-accounts">
          <h2>3. User Accounts</h2>
          <h3>3.1 Registration</h3>
          <p>
            You must provide accurate information during registration and keep
            your credentials secure.
          </p>

          <h3>3.2 Account Responsibility</h3>
          <p>
            You are responsible for all activities under your account. Notify
            us immediately of unauthorized access.
          </p>
        </section>

        <section id="acceptable-use">
          <h2>4. Acceptable Use Policy</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Violate any laws or regulations</li>
            <li>Upload malicious code or viruses</li>
            <li>Interfere with service operation</li>
            <li>Impersonate others or misrepresent affiliation</li>
            <li>Engage in unauthorized data scraping</li>
          </ul>
        </section>

        <section id="intellectual-property">
          <h2>5. Intellectual Property</h2>
          <p>
            All content, trademarks, and materials on the Service are owned by
            Opura Admin or licensed to us. You retain ownership of content you
            upload but grant us a license to use it for service provision.
          </p>
        </section>

        <section id="payments">
          <h2>6. Payments and Subscriptions</h2>
          <h3>6.1 Fees</h3>
          <p>
            Certain features require paid subscriptions. All fees are
            non-refundable unless stated otherwise.
          </p>

          <h3>6.2 Billing</h3>
          <p>
            Subscriptions renew automatically. You may cancel anytime before
            the renewal date.
          </p>
        </section>

        <section id="termination">
          <h2>7. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account for
            violation of these Terms. You may delete your account at any time.
          </p>
        </section>

        <section id="disclaimer">
          <h2>8. Disclaimer of Warranties</h2>
          <p>
            The Service is provided "as is" without warranties of any kind. We
            do not guarantee uninterrupted or error-free service.
          </p>
        </section>

        <section id="limitation-liability">
          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Opura Admin shall not be
            liable for indirect, incidental, or consequential damages arising
            from service use.
          </p>
        </section>

        <section id="indemnification">
          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Opura Admin from claims
            arising from your use of the Service or violation of these Terms.
          </p>
        </section>

        <section id="governing-law">
          <h2>11. Governing Law</h2>
          <p>
            These Terms are governed by the laws of [Your Jurisdiction],
            without regard to conflict of law principles.
          </p>
        </section>

        <section id="changes-terms">
          <h2>12. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. Continued use after changes
            constitutes acceptance.
          </p>
        </section>

        <section id="contact-terms">
          <h2>13. Contact Information</h2>
          <p>For questions about these Terms, contact us at:</p>
          <address className="not-italic">
            <strong>Email:</strong> legal@opura-admin.com
            <br />
            <strong>Address:</strong> [Your Company Address]
          </address>
        </section>
      </LegalLayout>
    </>
  );
}