import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const emptyContact = {
  name: "",
  relationship: "",
  phone: "",
  email: "",
  priority: "Primary"
};

export default function ContactForm({ contact, onSubmit, onCancel }) {
  const [values, setValues] = useState(emptyContact);

  useEffect(() => {
    setValues(contact || emptyContact);
  }, [contact]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(values);
    setValues(emptyContact);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input label="Full name" name="name" value={values.name} onChange={handleChange} required />
      <Input label="Relationship" name="relationship" value={values.relationship} onChange={handleChange} required />
      <Input label="Phone number" name="phone" value={values.phone} onChange={handleChange} required />
      <Input label="Email" name="email" type="email" value={values.email} onChange={handleChange} required />
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Priority</span>
        <select
          name="priority"
          value={values.priority}
          onChange={handleChange}
          className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option>Primary</option>
          <option>Secondary</option>
        </select>
      </label>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{contact ? "Save changes" : "Add contact"}</Button>
      </div>
    </form>
  );
}
