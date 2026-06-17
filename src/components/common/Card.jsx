import { classNames } from "../../utils/formatters";

export default function Card({ children, className = "" }) {
  return (
    <section className={classNames("glass-panel rounded-2xl p-5", className)}>
      {children}
    </section>
  );
}
