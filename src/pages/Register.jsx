import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { ROUTES } from "../utils/constants";
import { validateRegister } from "../utils/validators";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const form = useForm(
    { name: "", email: "", mobile: "", password: "", confirmPassword: "", role: "user" },
    validateRegister
  );

  async function handleSubmit(event) {
    event.preventDefault();
    await form.handleSubmit(async (values) => {
      await register(values);
      navigate(ROUTES.dashboard);
    });
  }

  return (
    <Card className="w-full max-w-xl">
      <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">Create your safety profile</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Your profile helps responders act faster during an emergency.</p>
      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <Input className="sm:col-span-2" label="Full name" name="name" value={form.values.name} onChange={form.handleChange} error={form.errors.name} />
        <Input label="Email" name="email" type="email" value={form.values.email} onChange={form.handleChange} error={form.errors.email} />
        <Input label="Mobile number" name="mobile" value={form.values.mobile} onChange={form.handleChange} error={form.errors.mobile} />
        <Input label="Password" name="password" type="password" value={form.values.password} onChange={form.handleChange} error={form.errors.password} />
        <Input label="Confirm password" name="confirmPassword" type="password" value={form.values.confirmPassword} onChange={form.handleChange} error={form.errors.confirmPassword} />
        <label className="sm:col-span-2 block">
          <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Account role</span>
          <select
            name="role"
            value={form.values.role}
            onChange={form.handleChange}
            className="min-h-12 w-full rounded-xl border border-slate-200 bg-white/85 px-4 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
          >
            <option value="user">User</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <Button type="submit" className="sm:col-span-2" isLoading={form.isSubmitting}>Create account</Button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
        Already registered? <Link to={ROUTES.login} className="font-bold text-brand-700 dark:text-brand-100">Sign in</Link>
      </p>
    </Card>
  );
}
