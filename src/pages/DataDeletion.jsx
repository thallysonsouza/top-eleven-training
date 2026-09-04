import "./LegalPage.css";

import { Link } from "react-router-dom";

function DataDeletion() {
  return (
    <div className="legal-page">
      <div className="legal-card">
        <div className="legal-brand">⚽</div>

        <span className="legal-kicker">TOP ELEVEN TOOLS</span>

        <h1>Data Deletion</h1>

        <p className="legal-updated">Last updated: September 2026</p>

        <section>
          <h2>Request deletion of your data</h2>

          <p>
            Users may request deletion of their Top Eleven Tools account and
            associated personal data.
          </p>
        </section>

        <section>
          <h2>How to request deletion</h2>

          <p>
            To request deletion, contact the Top Eleven Tools team using the
            official contact address associated with this application.
          </p>

          <p>
            Your request should include the email address associated with your
            Top Eleven Tools account.
          </p>
        </section>

        <section>
          <h2>What happens next</h2>

          <p>
            After receiving a valid request, we will verify the account
            information and process the deletion of applicable personal data
            associated with the account.
          </p>
        </section>

        <section>
          <h2>Facebook Login users</h2>

          <p>
            If your account was created using Facebook Login, the deletion
            request also applies to the Top Eleven Tools account created through
            that authentication method.
          </p>
        </section>

        <div className="legal-navigation">
          <Link to="/login">← BACK TO LOGIN</Link>

          <Link to="/privacy">PRIVACY</Link>

          <Link to="/terms">TERMS</Link>
        </div>
      </div>
    </div>
  );
}

export default DataDeletion;
