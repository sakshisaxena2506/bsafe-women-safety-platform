import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { ROUTES } from "../utils/constants";
import { validateLogin } from "../utils/validators";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const form = useForm({ email: "ananya.sharma@example.com", password: "secure123", remember: true }, validateLogin);
  const from = location.state?.from?.pathname || ROUTES.dashboard;

  async function handleSubmit(event) {
    event.preventDefault();
    const ok = await form.handleSubmit(async (values) => {
      await login(values.email, values.password);
      navigate(from, { replace: true });
    });

    return ok;
  }

  return (
    <Card className="w-full max-w-md">
      <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Sign in to manage your safety profile and alerts.</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" value={form.values.email} onChange={form.handleChange} error={form.errors.email} />
        <Input label="Password" name="password" type="password" value={form.values.password} onChange={form.handleChange} error={form.errors.password} />
        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <input type="checkbox" name="remember" checked={form.values.remember} onChange={form.handleChange} className="rounded border-slate-300 text-brand-600" />
            Remember me
          </label>
          <Link to={ROUTES.forgotPassword} className="font-bold text-brand-700 dark:text-brand-100">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full" isLoading={form.isSubmitting}>Sign in</Button>
      </form>
      <div className="mt-5 rounded-2xl bg-brand-50 p-4 text-sm text-slate-700 dark:bg-brand-500/10 dark:text-slate-200">
        <p className="font-bold">Demo roles</p>
        <p className="mt-1">User: ananya.sharma@example.com</p>
        <p>Volunteer: asha.volunteer@example.com</p>
        <p>Admin: admin@bsafe.app</p>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Use any password with six or more characters when Supabase is not configured.</p>
      </div>
      <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
        New to bSafe? <Link to={ROUTES.register} className="font-bold text-brand-700 dark:text-brand-100">Create account</Link>
      </p>
    </Card>
  );
}
