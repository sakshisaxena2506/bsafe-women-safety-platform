import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import { useForm } from "../hooks/useForm";
import { requestPasswordReset } from "../services/authService";
import { ROUTES } from "../utils/constants";
import { validateForgotPassword } from "../utils/validators";

export default function ForgotPassword() {
  const form = useForm({ email: "" }, validateForgotPassword);

  async function handleSubmit(event) {
    event.preventDefault();
    await form.handleSubmit(async (values) => requestPasswordReset(values.email));
  }

  return (
    <Card className="w-full max-w-md">
      <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">Reset password</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Enter your registered email and we will prepare a password reset flow.</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" value={form.values.email} onChange={form.handleChange} error={form.errors.email} />
        <Button type="submit" className="w-full" isLoading={form.isSubmitting}>Send reset link</Button>
      </form>
      <Link to={ROUTES.login} className="mt-5 block text-center text-sm font-bold text-brand-700 dark:text-brand-100">
        Back to login
      </Link>
    </Card>
  );
}
