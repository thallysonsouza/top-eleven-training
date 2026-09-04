import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

const GUEST_STORAGE_KEY = "top-eleven-tools-guest";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  const [loading, setLoading] = useState(true);

  const [guest, setGuest] = useState(
    localStorage.getItem(GUEST_STORAGE_KEY) === "true",
  );

  /* =====================================================
       INITIAL SESSION
    ===================================================== */

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("Error loading Supabase session:", error);

        setSession(null);
      } else {
        setSession(data.session);
      }

      setLoading(false);
    }

    loadSession();

    /* =================================================
           AUTH STATE LISTENER
        ================================================= */

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!mounted) return;

      setSession(nextSession);

      /*
       * If a real account becomes authenticated,
       * the guest state is no longer relevant.
       */

      if (nextSession) {
        localStorage.removeItem(GUEST_STORAGE_KEY);

        setGuest(false);
      }
    });

    return () => {
      mounted = false;

      subscription.unsubscribe();
    };
  }, []);

  /* =====================================================
       LOGIN
    ===================================================== */

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    setSession(data.session);

    localStorage.removeItem(GUEST_STORAGE_KEY);

    setGuest(false);

    return data;
  }

  /* =====================================================
       SIGN UP
    ===================================================== */

  async function signup(email, password, name = "") {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,

      options: {
        data: {
          name,
        },

        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      throw error;
    }

    /*
     * Depending on the Supabase email-confirmation
     * configuration, session may initially be null.
     */

    if (data.session) {
      setSession(data.session);

      localStorage.removeItem(GUEST_STORAGE_KEY);

      setGuest(false);
    }

    return data;
  }

  /* =====================================================
       FACEBOOK
    ===================================================== */

  async function loginWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",

      options: {
        redirectTo: `${window.location.origin}/app`,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  }

  /* =====================================================
       PASSWORD RECOVERY
    ===================================================== */

  async function resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  /* =====================================================
       UPDATE PASSWORD
    ===================================================== */

  async function updatePassword(password) {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  /* =====================================================
       GUEST
    ===================================================== */

  function loginAsGuest() {
    /*
     * Guest mode is local-only.
     * No Supabase account is created.
     */

    localStorage.setItem(GUEST_STORAGE_KEY, "true");

    setGuest(true);
  }

  /* =====================================================
       LOGOUT
    ===================================================== */

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    localStorage.removeItem(GUEST_STORAGE_KEY);

    setSession(null);

    setGuest(false);
  }

  /* =====================================================
       DERIVED STATE
    ===================================================== */

  const logged = Boolean(session || guest);

  const user = session?.user || null;

  const isAuthenticated = Boolean(session);

  const isGuest = guest && !session;

  /* =====================================================
       PROVIDER
    ===================================================== */

  return (
    <AuthContext.Provider
      value={{
        session,
        user,

        logged,
        loading,

        isAuthenticated,
        isGuest,

        login,
        signup,
        loginWithFacebook,

        resetPassword,
        updatePassword,

        loginAsGuest,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =========================================================
   HOOK
========================================================= */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}
