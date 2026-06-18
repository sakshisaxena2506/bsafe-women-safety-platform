import { ShieldCheck } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

export default function AuthLayout() {
  return (
    <div className="page-shell grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
      <section
  className="hidden lg:flex p-8 bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600')",
  }}
>
          <div className="glass-panel flex w-full flex-col justify-between rounded-3xl p-10 bg-black/40 backdrop-blur-md">
          <Link to={ROUTES.landing} className="flex items-center gap-3 text-xl font-extrabold text-slate-950 dark:text-white">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-roseguard-500 to-brand-500 text-white">
              <ShieldCheck className="h-6 w-6" />
            </span>
            bSafe
          </Link>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-100">
              Safety-first onboarding
            </p>
            <h1 className="mt-4 max-w-xl text-5xl font-extrabold leading-tight text-slate-950 dark:text-white">
              Your Safety Matters. Help Is Always One Tap Away. 
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600 dark:text-slate-300">
              bSafe empowers women with instant SOS alerts, live location sharing, emergency contacts and a trusted volunteer network. 
            </p>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Supabase-ready authentication structure included.
          </p>
        </div>
      </section>
      <main className="flex items-center justify-center p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}
