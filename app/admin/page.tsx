"use client";

import { Eye, EyeOff, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<{ email?: string; password?: string }>({});

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextFields: typeof fields = {};
    if (!email) nextFields.email = "This field is required";
    if (!password) nextFields.password = "This field is required";
    setFields(nextFields);
    if (Object.keys(nextFields).length) return;

    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, rememberMe })
    });
    if (response.ok) {
      router.push("/admin/dashboard");
      router.refresh();
      return;
    }
    setPassword("");
    setError("Incorrect email or password.");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#b8d4f0]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#b8d4f0] via-[#7fb3e8] to-[#134e5a]" />
      <div className="absolute left-1/2 top-8 size-48 -translate-x-1/2 rounded-full bg-white/80" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(160deg,transparent_0_18%,#86c4d4_18%_42%,#357e87_42%_66%,#0f3f46_66%)]" />
      <div className="absolute bottom-0 left-0 h-72 w-32 bg-[#0b3036] [clip-path:polygon(45%_0,55%_0,60%_100%,40%_100%)]" />
      <div className="absolute bottom-0 right-0 h-80 w-40 bg-[#0b3036] [clip-path:polygon(45%_0,55%_0,60%_100%,40%_100%)]" />
      <div className="absolute left-8 top-20 h-12 w-40 rounded-full bg-white/70 blur-sm" />
      <div className="absolute right-10 top-24 h-12 w-48 rounded-full bg-white/60 blur-sm" />
      <div className="absolute left-[22%] top-[18%] text-3xl text-[#1f4b62]">⌁ ⌁</div>
      <div className="absolute right-[24%] top-[22%] text-3xl text-[#1f4b62]">⌁</div>

      <section className="relative z-10 grid min-h-screen place-items-center px-4">
        <form onSubmit={submit} className="w-full max-w-[420px] rounded-[20px] border border-white/40 bg-[rgba(180,210,240,.35)] px-8 py-10 text-[#152737] shadow-[0_8px_32px_rgba(31,38,135,.2)] backdrop-blur-[20px] md:px-10 md:py-12">
          <h1 className="mb-9 text-center font-heading text-3xl font-extrabold tracking-[.18em]">LOGIN</h1>
          <label className="block">
            <span className="sr-only">Email</span>
            <div className={`flex items-center border-b ${fields.email ? "border-red-500" : "border-[#152737]/50"}`}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 flex-1 bg-transparent outline-none placeholder:text-[#152737]/75" placeholder="Email" />
              <Mail size={18} />
            </div>
            {fields.email && <small className="mt-1 block text-red-600">{fields.email}</small>}
          </label>
          <label className="mt-5 block">
            <span className="sr-only">Password</span>
            <div className={`flex items-center border-b ${fields.password ? "border-red-500" : "border-[#152737]/50"}`}>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="h-12 flex-1 bg-transparent outline-none placeholder:text-[#152737]/75" placeholder="Password" />
              <button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? <Eye size={18} /> : <EyeOff size={18} />}</button>
            </div>
            {fields.password && <small className="mt-1 block text-red-600">{fields.password}</small>}
          </label>
          <button type="button" onClick={() => setError("Contact site owner.")} className="ml-auto mt-2 block text-xs font-bold">Forgot Password?</button>
          <label className="mt-5 flex items-center gap-2 text-sm"><input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Remember Me</label>
          <button className="mt-7 h-12 w-full rounded-full bg-[rgba(150,180,220,.62)] font-bold transition hover:scale-[1.01] hover:bg-[rgba(130,165,210,.76)] active:scale-[.99]">Login</button>
          {error && <p className="mt-4 text-center text-sm font-bold text-red-700">{error}</p>}
          <p className="mt-8 text-center text-sm">Don&apos;t have an Account? <span className="font-bold">Register</span></p>
        </form>
      </section>
    </main>
  );
}
