import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { ROUTES } from "../utils/constants";

export default function NotFound() {
  return (
    <div className="page-shell grid min-h-screen place-items-center p-4">
      <Card className="max-w-lg text-center">
        <p className="text-sm font-bold uppercase text-brand-700 dark:text-brand-100">404</p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-950 dark:text-white">Page not found</h1>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to={ROUTES.dashboard}>
          <Button className="mt-6">Back to dashboard</Button>
        </Link>
      </Card>
    </div>
  );
}
