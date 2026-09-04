import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Login() {
  const navigate = useNavigate();

  const { login, signup, loginWithFacebook, loginAsGuest, loading } = useAuth();

  const { showToast } = useToast();

  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* =====================================================
       HELPERS
    ===================================================== */

  function clearFeedback() {
    setError("");
  }

  function changeMode(nextMode) {
    setMode(nextMode);

    setError("");

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  function translateAuthError(message = "") {
    const text = message.toLowerCase();

    if (
      text.includes("invalid login credentials") ||
      text.includes("invalid credentials")
    ) {
      return "E-mail ou senha incorretos.";
    }

    if (text.includes("email not confirmed")) {
      return "Confirme seu e-mail antes de entrar.";
    }

    if (text.includes("user already registered")) {
      return "Este e-mail já possui uma conta.";
    }

    if (text.includes("password should be at least")) {
      return "A senha precisa ter pelo menos 6 caracteres.";
    }

    if (text.includes("unable to validate email")) {
      return "Digite um e-mail válido.";
    }

    if (text.includes("too many requests")) {
      return "Muitas tentativas. Aguarde alguns instantes.";
    }

    if (text.includes("network")) {
      return "Não foi possível conectar ao servidor.";
    }

    return "Não foi possível concluir a operação. Tente novamente.";
  }

  /* =====================================================
       LOGIN
    ===================================================== */

  async function handleLogin(event) {
    event.preventDefault();

    clearFeedback();

    if (!email.trim()) {
      setError("Digite seu e-mail.");

      return;
    }

    if (!password) {
      setError("Digite sua senha.");

      return;
    }

    try {
      setSubmitting(true);

      await login(email.trim(), password);

      showToast("Login realizado com sucesso!", "success");

      navigate("/app");
    } catch (authError) {
      console.error("Login error:", authError);

      setError(translateAuthError(authError?.message));
    } finally {
      setSubmitting(false);
    }
  }

  /* =====================================================
       SIGN UP
    ===================================================== */

  async function handleSignup(event) {
    event.preventDefault();

    clearFeedback();

    if (!name.trim()) {
      setError("Digite seu nome.");

      return;
    }

    if (!email.trim()) {
      setError("Digite seu e-mail.");

      return;
    }

    if (!password) {
      setError("Digite uma senha.");

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

      const data = await signup(email.trim(), password, name.trim());

      if (data?.session) {
        showToast("Conta criada com sucesso!", "success");

        navigate("/app");
      } else {
        showToast(
          "Conta criada! Verifique seu e-mail para confirmar sua conta.",
          "success",
        );

        changeMode("login");
      }
    } catch (authError) {
      console.error("Signup error:", authError);

      setError(translateAuthError(authError?.message));
    } finally {
      setSubmitting(false);
    }
  }

  /* =====================================================
       FACEBOOK
    ===================================================== */

  async function handleFacebookLogin() {
    clearFeedback();

    try {
      setSubmitting(true);

      await loginWithFacebook();
    } catch (authError) {
      console.error("Facebook login error:", authError);

      setError(translateAuthError(authError?.message));

      setSubmitting(false);
    }
  }

  /* =====================================================
       GUEST
    ===================================================== */

  function handleGuestLogin() {
    clearFeedback();

    loginAsGuest();

    showToast("Entrando como visitante.", "success");

    navigate("/app");
  }

  /* =====================================================
       LOADING
    ===================================================== */

  if (loading) {
    return (
      <div className="login-page">
        <div className="login-loading">
          <div className="login-loading-mark">⚽</div>

          <span>LOADING...</span>
        </div>
      </div>
    );
  }

  /* =====================================================
       FORM
    ===================================================== */

  return (
    <div className="login-page">
      <div className="login-background-grid" />

      <div className="login-background-glow login-background-glow-left" />
      <div className="login-background-glow login-background-glow-right" />

      <div className="login-decoration login-decoration-top">
        <span />
        <span />
        <span />
      </div>

      <div className="login-content">
        {/* =================================================
                    BRAND
                ================================================= */}

        <div className="login-brand">
          <div className="login-brand-mark">⚽</div>

          <div>
            <span className="login-brand-title">TOP ELEVEN</span>

            <span className="login-brand-subtitle">TOOLS</span>
          </div>
        </div>

        {/* =================================================
                    CARD
                ================================================= */}

        <div className="login-card">
          <div className="login-card-header">
            <div className="login-card-kicker">
              {mode === "login" && "WELCOME BACK"}
              {mode === "signup" && "NEW MANAGER"}
              {mode === "recovery" && "ACCOUNT RECOVERY"}
            </div>

            <h1>
              {mode === "login" && "Sign in"}
              {mode === "signup" && "Create account"}
              {mode === "recovery" && "Recover account"}
            </h1>

            <p>
              {mode === "login" && "Access your teams, tools and saved data."}

              {mode === "signup" &&
                "Create your account and keep your data with you."}

              {mode === "recovery" &&
                "Enter your e-mail to recover your account."}
            </p>
          </div>

          {/* =================================================
                        LOGIN
                    ================================================= */}

          {mode === "login" && (
            <form className="login-form" onSubmit={handleLogin}>
              <div className="login-input-wrapper">
                <Mail size={16} />

                <input
                  type="email"
                  value={email}
                  placeholder="E-mail"
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    clearFeedback();
                  }}
                />
              </div>

              <div className="login-input-wrapper">
                <LockKeyhole size={16} />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Senha"
                  autoComplete="current-password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    clearFeedback();
                  }}
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="login-form-options">
                <button
                  type="button"
                  className="login-link"
                  onClick={() => navigate("/forgot-password")}
                >
                  Esqueci minha senha
                </button>
              </div>

              {error && <div className="login-error">{error}</div>}

              <button
                type="submit"
                className="login-primary-button"
                disabled={submitting}
              >
                {submitting ? "ENTRANDO..." : "ENTRAR"}
              </button>
            </form>
          )}

          {/* =================================================
                        SIGNUP
                    ================================================= */}

          {mode === "signup" && (
            <form className="login-form" onSubmit={handleSignup}>
              <div className="login-input-wrapper">
                <UserRound size={16} />

                <input
                  type="text"
                  value={name}
                  placeholder="Nome"
                  autoComplete="name"
                  onChange={(event) => {
                    setName(event.target.value);
                    clearFeedback();
                  }}
                />
              </div>

              <div className="login-input-wrapper">
                <Mail size={16} />

                <input
                  type="email"
                  value={email}
                  placeholder="E-mail"
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    clearFeedback();
                  }}
                />
              </div>

              <div className="login-input-wrapper">
                <LockKeyhole size={16} />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Senha"
                  autoComplete="new-password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    clearFeedback();
                  }}
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="login-input-wrapper">
                <LockKeyhole size={16} />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  placeholder="Confirmar senha"
                  autoComplete="new-password"
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    clearFeedback();
                  }}
                />

                <button
                  type="button"
                  className="login-password-toggle"
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

              {error && <div className="login-error">{error}</div>}

              <button
                type="submit"
                className="login-primary-button"
                disabled={submitting}
              >
                {submitting ? "CRIANDO..." : "CRIAR CONTA"}
              </button>
            </form>
          )}

          {/* =================================================
                        RECOVERY
                    ================================================= */}

          {mode === "recovery" && (
            <form
              className="login-form"
              onSubmit={(event) => {
                event.preventDefault();
                showToast(
                  "A recuperação de senha será habilitada no próximo passo.",
                  "info",
                );
              }}
            >
              <div className="login-input-wrapper">
                <Mail size={16} />

                <input
                  type="email"
                  value={email}
                  placeholder="E-mail"
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    clearFeedback();
                  }}
                />
              </div>

              {error && <div className="login-error">{error}</div>}

              <button type="submit" className="login-primary-button">
                ENVIAR LINK
              </button>
            </form>
          )}

          {/* =================================================
                        DIVIDER
                    ================================================= */}

          {mode !== "recovery" && (
            <>
              <div className="login-divider">
                <span />
                <strong>OU</strong>
                <span />
              </div>

              <button
                type="button"
                className="login-facebook-button"
                onClick={handleFacebookLogin}
                disabled={submitting}
              >
                <span className="login-facebook-icon">f</span>
                CONTINUAR COM FACEBOOK
              </button>

              <button
                type="button"
                className="login-guest-button"
                onClick={handleGuestLogin}
                disabled={submitting}
              >
                CONTINUAR COMO VISITANTE
              </button>
            </>
          )}

          {/* =================================================
                        MODE SWITCH
                    ================================================= */}

          <div className="login-switch">
            {mode === "login" && (
              <>
                <span>Ainda não possui uma conta?</span>

                <button type="button" onClick={() => changeMode("signup")}>
                  CRIAR CONTA
                </button>
              </>
            )}

            {mode === "signup" && (
              <>
                <span>Já possui uma conta?</span>

                <button type="button" onClick={() => changeMode("login")}>
                  ENTRAR
                </button>
              </>
            )}

            {mode === "recovery" && (
              <button
                type="button"
                className="login-back-button"
                onClick={() => changeMode("login")}
              >
                <ArrowLeft size={14} />
                VOLTAR PARA LOGIN
              </button>
            )}
          </div>
        </div>

        {/* =================================================
                    FOOTER
                ================================================= */}

        <div className="login-footer">
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

export default Login;
