"use client";

import { Check, KeyRound, TriangleAlert } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { site } from "@/config/site";
import { DownloadButton } from "./DownloadButton";
import { LogoMark } from "./Logo";

type Link =
  | { kind: "loading" }
  | { kind: "none" }
  | { kind: "error"; message: string }
  | { kind: "confirmed"; what: string }
  | { kind: "recovery"; accessToken: string; refreshToken: string };

/**
 * Reads the result Supabase puts in the address after an e-mail link (#access_token=…&type=… or #error=…),
 * removes it from the address bar at once, and shows the matching screen. A password reset sets the new password
 * with the one-time session from the link and then signs out of the website again.
 */
function readLink(): Link {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, "") || window.location.search.replace(/^\?/, ""));
  if (window.location.hash || window.location.search) window.history.replaceState(null, "", window.location.pathname);
  const error = params.get("error_description") || params.get("error");
  if (error) {
    const expired = /expired|invalid|already/i.test(error) || params.get("error_code") === "otp_expired";
    return {
      kind: "error",
      message: expired
        ? "This link has expired or was already used. Ask HUX for a new one: sign up again (it sends a fresh confirmation), or tap “Forgot password?” in the app."
        : error.replace(/\+/g, " "),
    };
  }
  const type = params.get("type");
  const accessToken = params.get("access_token");
  if (type === "recovery" && accessToken) return { kind: "recovery", accessToken, refreshToken: params.get("refresh_token") ?? "" };
  if (type === "signup" || type === "invite" || type === "magiclink" || type === "email_change" || type === "email") {
    return { kind: "confirmed", what: type === "email_change" ? "Your new e-mail is confirmed." : "Your e-mail is confirmed." };
  }
  if (accessToken) return { kind: "confirmed", what: "Done." };
  return { kind: "none" };
}

export function AccountLink() {
  const [link, setLink] = useState<Link>({ kind: "loading" });
  useEffect(() => {
    // read from the address bar (only exists in the browser), and again if a new link is opened in the same tab
    // (readLink clears the address with replaceState, which does not fire hashchange)
    const onHash = () => {
      if (window.location.hash) setLink(readLink());
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the address bar only exists in the browser
    setLink(readLink());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="w-full max-w-[520px] rounded-[28px] border border-line bg-paper p-7 shadow-warm sm:p-10">
      <LogoMark size={52} />
      {link.kind === "loading" ? <p className="mt-6 text-[16px] text-ink-2">One moment…</p> : null}
      {link.kind === "confirmed" ? <Confirmed what={link.what} /> : null}
      {link.kind === "error" ? <Problem message={link.message} /> : null}
      {link.kind === "recovery" ? <NewPassword accessToken={link.accessToken} refreshToken={link.refreshToken} /> : null}
      {link.kind === "none" ? (
        <>
          <h1 className="mt-6 font-serif text-[40px] leading-[1.05] text-charcoal">Your HUX account</h1>
          <p className="mt-4 text-[16px] leading-[1.6] text-ink-2">This page finishes the links in HUX e-mails. Open the link from your e-mail again, or manage your account in the app.</p>
          <DownloadButton className="mt-8" showMeta />
        </>
      ) : null}
    </div>
  );
}

function Confirmed({ what }: { what: string }) {
  return (
    <>
      <span className="mt-6 grid size-12 place-items-center rounded-full bg-green text-white" aria-hidden="true">
        <Check size={26} strokeWidth={2.5} />
      </span>
      <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal">{what}</h1>
      <p className="mt-4 text-[16px] leading-[1.6] text-ink-2">
        Now open <b className="text-charcoal">HUX</b> on your phone and sign in with your GLA e-mail and password. Next, the app asks for a photo of your college ID.
      </p>
      {/* on an iPhone this button is "Open HUX on iPhone" (the Home Screen web app); on Android the APK */}
      <p className="mt-6 text-[14px] text-muted">No app yet?</p>
      <DownloadButton className="mt-3" showMeta />
    </>
  );
}

function Problem({ message }: { message: string }) {
  return (
    <>
      <span className="mt-6 grid size-12 place-items-center rounded-full bg-sunflower text-charcoal" aria-hidden="true">
        <TriangleAlert size={24} strokeWidth={1.9} />
      </span>
      <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal">That link did not work</h1>
      <p className="mt-4 text-[16px] leading-[1.6] text-ink-2">{message}</p>
      <p className="mt-6 text-[14px] text-ink-2">
        Still stuck? Email{" "}
        <a href={`mailto:${site.contact.email}`} className="font-semibold text-charcoal underline decoration-sunflower decoration-[3px] underline-offset-4">
          {site.contact.email}
        </a>
        .
      </p>
    </>
  );
}

function NewPassword({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
  const [pw, setPw] = useState("");
  const [again, setAgain] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "done">("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (pw.length < 8) return setError("Use at least 8 characters.");
    if (pw !== again) return setError("The two passwords are not the same.");
    setState("saving");
    try {
      // loaded only here, so the rest of the website does not carry the Supabase library
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(site.supabase.url, site.supabase.anonKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
      const { error: sessionError } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
      if (sessionError) throw sessionError;
      const { error: updateError } = await supabase.auth.updateUser({ password: pw });
      if (updateError) throw updateError;
      await supabase.auth.signOut({ scope: "local" });
      setState("done");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(/expired|invalid|jwt/i.test(message) ? "This reset link has expired. Tap “Forgot password?” in the app for a new one." : /different|same/i.test(message) ? "Choose a password you have not used for HUX before." : "Could not save the new password. Please try again.");
      setState("idle");
    }
  };

  if (state === "done") return <Confirmed what="Your password is changed." />;

  return (
    <>
      <span className="mt-6 grid size-12 place-items-center rounded-full bg-sunflower text-charcoal" aria-hidden="true">
        <KeyRound size={24} strokeWidth={1.9} />
      </span>
      <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal">Choose a new password</h1>
      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        <label className="block">
          <span className="text-[14px] font-semibold text-charcoal">New password</span>
          <input type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} className="mt-1.5 w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-[16px] text-charcoal outline-none focus:border-charcoal" />
        </label>
        <label className="block">
          <span className="text-[14px] font-semibold text-charcoal">Type it again</span>
          <input type="password" autoComplete="new-password" value={again} onChange={(e) => setAgain(e.target.value)} className="mt-1.5 w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-[16px] text-charcoal outline-none focus:border-charcoal" />
        </label>
        {error ? (
          <p role="alert" className="text-[14px] font-semibold text-[#A33F3F]">
            {error}
          </p>
        ) : null}
        <button type="submit" disabled={state === "saving"} className="inline-flex h-[56px] w-full items-center justify-center rounded-full bg-charcoal text-[16px] font-semibold text-ivory transition-transform active:scale-[0.98] disabled:opacity-60">
          {state === "saving" ? "Saving…" : "Save new password"}
        </button>
      </form>
    </>
  );
}
