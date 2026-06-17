import { useState } from "react";

export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleSubmit(onSubmit) {
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return false;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(values);
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}
