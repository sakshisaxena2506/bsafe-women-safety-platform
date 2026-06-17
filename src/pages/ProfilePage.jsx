import { useState } from "react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import { useAuth } from "../context/AuthContext";
import { getInitials } from "../utils/formatters";

export default function ProfilePage() {
  const { user } = useAuth();
  const [values, setValues] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <div className="flex flex-col items-center text-center">
          <span className="grid h-28 w-28 place-items-center rounded-3xl bg-gradient-to-br from-roseguard-500 to-brand-500 text-4xl font-extrabold text-white">
            {getInitials(values.name)}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold text-slate-950 dark:text-white">{values.name}</h1>
          <p className="mt-2 text-slate-500">{values.email}</p>
          <p className="mt-1 text-slate-500">{values.phone}</p>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Edit profile</h2>
        <form className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input label="Name" name="name" value={values.name} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={values.email} onChange={handleChange} />
          <Input label="Phone" name="phone" value={values.phone} onChange={handleChange} />
          <Input className="sm:col-span-2" label="Address" name="address" value={values.address} onChange={handleChange} />
          <Button className="sm:col-span-2">Save profile</Button>
        </form>
      </Card>
    </div>
  );
}
