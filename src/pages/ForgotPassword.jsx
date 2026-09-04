import "./ForgotPassword.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function ForgotPassword() {
  const navigate = useNavigate();

  const { resetPassword } = useAuth();

  const { showToast } = useToast();

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [sent, setSent] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Digite seu e-mail.");

      return;
    }

    try {
      setSubmitting(true);

      await resetPassword(email.trim());

      setSent(true);

      showToast("Link de recuperação enviado para seu e-mail.", "success");
    } catch (authError) {
      console.error("Password reset error:", authError);

      setError(
        "Não foi possível enviar o link. Verifique o e-mail e tente novamente.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-grid" />

      <div className="forgot-password-glow forgot-password-glow-left" />

      <div className="forgot-password-glow forgot-password-glow-right" />

      <div className="forgot-password-content">
        {/* =================================================
                    BRAND
                ================================================= */}

        <div className="forgot-password-brand">
          <div className="forgot-password-brand-mark">⚽</div>

          <div>
            <span className="forgot-password-brand-title">TOP ELEVEN</span>

            <span className="forgot-password-brand-subtitle">TOOLS</span>
          </div>
        </div>

        {/* =================================================
                    CARD
                ================================================= */}

        <div className="forgot-password-card">
          {!sent ? (
            <>
              <div className="forgot-password-header">
                <span className="forgot-password-kicker">ACCOUNT RECOVERY</span>

                <h1>Reset password</h1>

                <p>
                  Enter your e-mail and we'll send you a secure link to create a
                  new password.
                </p>
              </div>

              <form className="forgot-password-form" onSubmit={handleSubmit}>
                <div className="forgot-password-input">
                  <Mail size={16} />

                  <input
                    type="email"
                    value={email}
                    placeholder="E-mail"
                    autoComplete="email"
                    onChange={(event) => {
                      setEmail(event.target.value);

                      setError("");
                    }}
                  />
                </div>

                {error && <div className="forgot-password-error">{error}</div>}

                <button
                  type="submit"
                  className="forgot-password-primary"
                  disabled={submitting}
                >
                  {submitting ? "ENVIANDO..." : "ENVIAR LINK"}
                </button>
              </form>
            </>
          ) : (
            <div className="forgot-password-success">
              <div className="forgot-password-success-icon">✓</div>

              <span className="forgot-password-kicker">CHECK YOUR EMAIL</span>

              <h1>Link sent</h1>

              <p>Enviamos um link de recuperação para:</p>

              <strong>{email}</strong>

              <p className="forgot-password-success-hint">
                Verifique sua caixa de entrada e a pasta de spam.
              </p>
            </div>
          )}

          <button
            type="button"
            className="forgot-password-back"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft size={14} />
            VOLTAR PARA LOGIN
          </button>
        </div>

        {/* =================================================
                    FOOTER
                ================================================= */}

        <div className="forgot-password-footer">
          <span>MANAGE</span>

          <i />

          <span>ANALYZE</span>

          <i />

          <span>TRAIN</span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
