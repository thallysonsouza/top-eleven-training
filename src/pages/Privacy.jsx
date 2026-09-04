import "./LegalPage.css";

import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="legal-page">
      <div className="legal-card">
        <div className="legal-brand">⚽</div>

        <span className="legal-kicker">TOP ELEVEN TOOLS</span>

        <h1>Privacy Policy</h1>

        <p className="legal-updated">Last updated: September 2026</p>

        <section>
          <h2>1. Overview</h2>

          <p>
            Top Eleven Tools is a web application designed to provide tools and
            analysis for users of football management games.
          </p>

          <p>
            This Privacy Policy explains how information may be collected, used
            and protected when you use our application.
          </p>
        </section>

        <section>
          <h2>2. Information we collect</h2>

          <p>
            When you create an account, we may receive information such as your
            email address, name and authentication information provided by your
            selected sign-in method.
          </p>

          <p>
            If you use Facebook Login, information made available through the
            authorization process may be associated with your Top Eleven Tools
            account.
          </p>
        </section>

        <section>
          <h2>3. How we use information</h2>

          <p>
            Information may be used to authenticate users, maintain accounts,
            provide application functionality and preserve user-created data.
          </p>
        </section>

        <section>
          <h2>4. Data storage and security</h2>

          <p>
            We use third-party infrastructure and authentication services to
            operate the application. We take reasonable measures to protect
            information associated with user accounts.
          </p>
        </section>

        <section>
          <h2>5. Account deletion</h2>

          <p>
            Users may request deletion of their account and associated personal
            data through our data deletion process.
          </p>
        </section>

        <section>
          <h2>6. Contact</h2>

          <p>
            For questions regarding privacy or personal data, please contact the
            Top Eleven Tools team through the contact information provided by
            the application.
          </p>
        </section>

        <div className="legal-navigation">
          <Link to="/login">← BACK TO LOGIN</Link>

          <Link to="/terms">TERMS</Link>

          <Link to="/data-deletion">DATA DELETION</Link>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
