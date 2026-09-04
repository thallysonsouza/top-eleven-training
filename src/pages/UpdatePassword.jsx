import "./UpdatePassword.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function UpdatePassword() {
  const navigate = useNavigate();

  const { updatePassword } = useAuth();

  const { showToast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [updated, setUpdated] = useState(false);

  function translatePasswordError(message = "") {
    const text = message.toLowerCase();

    if (text.includes("password")) {
      if (text.includes("least") || text.includes("characters")) {
        return "A senha precisa ter pelo menos 6 caracteres.";
      }

      if (text.includes("weak") || text.includes("requirements")) {
        return "A senha não atende aos requisitos de segurança.";
      }
    }

    return "Não foi possível atualizar a senha. Tente novamente.";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!password) {
      setError("Digite a nova senha.");

      return;
    }

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");

      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");

      return;
    }

    try {
      setSubmitting(true);

      await updatePassword(password);

      setUpdated(true);

      showToast("Senha atualizada com sucesso!", "success");
    } catch (authError) {
      console.error("Update password error:", authError);

      setError(translatePasswordError(authError?.message));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="update-password-page">
      <div className="update-password-grid" />

      <div className="update-password-glow update-password-glow-left" />

      <div className="update-password-glow update-password-glow-right" />

      <div className="update-password-content">
        {/* =================================================
                    BRAND
                ================================================= */}

        <div className="update-password-brand">
          <div className="update-password-brand-mark">⚽</div>

          <div>
            <span className="update-password-brand-title">TOP ELEVEN</span>

            <span className="update-password-brand-subtitle">TOOLS</span>
          </div>
        </div>

        {/* =================================================
                    CARD
                ================================================= */}

        <div className="update-password-card">
          {!updated ? (
            <>
              <div className="update-password-header">
                <span className="update-password-kicker">ACCOUNT SECURITY</span>

                <h1>New password</h1>

                <p>Create a new password for your Top Eleven Tools account.</p>
              </div>

              <form className="update-password-form" onSubmit={handleSubmit}>
                <div className="update-password-input">
                  <LockKeyhole size={16} />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Nova senha"
                    autoComplete="new-password"
                    onChange={(event) => {
                      setPassword(event.target.value);

                      setError("");
                    }}
                  />

                  <button
                    type="button"
                    className="update-password-toggle"
                    onClick={() => setShowPassword((previous) => !previous)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="update-password-input">
                  <LockKeyhole size={16} />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    placeholder="Confirmar nova senha"
                    autoComplete="new-password"
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);

                      setError("");
                    }}
                  />

                  <button
                    type="button"
                    className="update-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword((previous) => !previous)
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>

                <div className="update-password-requirements">
                  <span>Mínimo 6 caracteres</span>

                  <span>Maiúscula</span>

                  <span>Minúscula</span>

                  <span>Número</span>

                  <span>Símbolo</span>
                </div>

                {error && <div className="update-password-error">{error}</div>}

                <button
                  type="submit"
                  className="update-password-primary"
                  disabled={submitting}
                >
                  {submitting ? "ATUALIZANDO..." : "ALTERAR SENHA"}
                </button>
              </form>
            </>
          ) : (
            <div className="update-password-success">
              <div className="update-password-success-icon">✓</div>

              <span className="update-password-kicker">ACCOUNT SECURED</span>

              <h1>Password updated</h1>

              <p>Sua senha foi alterada com sucesso.</p>

              <button
                type="button"
                className="update-password-primary"
                onClick={() => navigate("/login")}
              >
                IR PARA LOGIN
              </button>
            </div>
          )}

          {!updated && (
            <button
              type="button"
              className="update-password-back"
              onClick={() => navigate("/login")}
            >
              <ArrowLeft size={14} />
              VOLTAR PARA LOGIN
            </button>
          )}
        </div>

        {/* =================================================
                    FOOTER
                ================================================= */}

        <div className="update-password-footer">
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

export default UpdatePassword;
