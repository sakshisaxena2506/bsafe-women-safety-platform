import { ArrowRight, CheckCircle2, MapPinned, ShieldAlert, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Footer from "../components/layout/Footer";
import { faqs, landingStats, testimonials } from "../data/dashboard";
import { ROUTES } from "../utils/constants";

const features = [
  {
    title: "One-tap SOS",
    description: "Trigger an emergency alert with location, profile summary, and trusted contacts in seconds.",
    icon: ShieldAlert
  },
  {
    title: "Live location sharing",
    description: "Share current coordinates and route status with responders while an incident is active.",
    icon: MapPinned
  },
  {
    title: "Verified responder network",
    description: "Coordinate help from volunteers, support teams, and safe zones inside a nearby radius.",
    icon: UsersRound
  }
];

export default function LandingPage() {
  return (
    <div className="page-shell">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link to={ROUTES.landing} className="flex items-center gap-2 text-xl font-extrabold">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-roseguard-500 to-brand-500 text-white">b</span>
          bSafe
        </Link>
        <div className="flex items-center gap-2">
          <Link to={ROUTES.login} className="hidden text-sm font-bold text-slate-700 dark:text-slate-200 sm:inline">
            Sign in
          </Link>
          <Link to={ROUTES.register}>
            <Button>Get started</Button>
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-brand-700 shadow-sm dark:bg-slate-900/70 dark:text-brand-100">
              Women safety, live response, community support
            </span>
            <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight tracking-normal text-slate-950 dark:text-white md:text-7xl">
              Emergency help should never be more than one tap away.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              bSafe connects women with trusted contacts, verified volunteers, safe zones, and support teams through a calm,
              responsive emergency assistance platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={ROUTES.register}>
                <Button className="min-h-12 px-6">
                  Create safety profile
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to={ROUTES.dashboard}>
                <Button variant="secondary" className="min-h-12 px-6">View dashboard</Button>
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-5">
            <div className="rounded-[1.7rem] bg-slate-950 p-4 text-white">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-300">SOS status</span>
                <span className="rounded-full bg-roseguard-500 px-3 py-1 text-xs font-bold">Live</span>
              </div>
              <div className="mt-8 grid place-items-center rounded-3xl bg-gradient-to-br from-roseguard-500 to-brand-600 p-12 text-center">
                <ShieldAlert className="h-16 w-16" />
                <strong className="mt-4 text-6xl font-extrabold">SOS</strong>
                <p className="mt-3 text-sm font-semibold text-white/85">Location and contacts shared</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <span className="text-sm text-slate-300">Responder ETA</span>
                  <strong className="mt-1 block text-2xl">02:34</strong>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <span className="text-sm text-slate-300">Location accuracy</span>
                  <strong className="mt-1 block text-2xl">18 m</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {landingStats.map((stat) => (
            <div key={stat.label} className="glass-panel rounded-2xl p-5">
              <strong className="text-3xl font-extrabold text-slate-950 dark:text-white">{stat.value}</strong>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-brand-700 dark:text-brand-100">About CareOS</p>
            <h2 className="mt-3 text-4xl font-extrabold text-slate-950 dark:text-white">A care operating system for personal safety.</h2>
            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
              CareOS is the concept behind bSafe: a digital layer that brings emergency profiles, live location,
              verified responders, safe zones, and incident intelligence into one clear workflow.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="glass-panel rounded-2xl p-6 transition hover:-translate-y-1">
                  <Icon className="h-8 w-8 text-brand-600" />
                  <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="glass-panel rounded-3xl p-6">
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">How it works</h2>
            {["Register and complete your safety profile", "Add trusted contacts and preferred responders", "Trigger SOS during unsafe situations", "Track assistance until the incident is resolved"].map((step, index) => (
              <div key={step} className="mt-5 flex gap-3">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">{index + 1}</span>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{step}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="glass-panel rounded-2xl p-5">
                <p className="leading-7 text-slate-700 dark:text-slate-200">"{testimonial.quote}"</p>
                <strong className="mt-4 block text-slate-950 dark:text-white">{testimonial.name}</strong>
                <span className="text-sm text-slate-500">{testimonial.role}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">FAQ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <article key={faq.question} className="glass-panel rounded-2xl p-5">
                <CheckCircle2 className="h-5 w-5 text-brand-600" />
                <h3 className="mt-3 font-bold text-slate-950 dark:text-white">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
