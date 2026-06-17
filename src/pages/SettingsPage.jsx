import Card from "../components/common/Card";
import { useTheme } from "../context/ThemeContext";

function ToggleRow({ title, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-white/70 p-4 dark:bg-slate-900/70">
      <span>
        <strong className="block text-slate-950 dark:text-white">{title}</strong>
        <span className="mt-1 block text-sm text-slate-500">{description}</span>
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="h-5 w-5 rounded border-slate-300 text-brand-600" />
    </label>
  );
}

export default function SettingsPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm font-bold uppercase text-brand-700 dark:text-brand-100">Settings</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">Preferences and privacy controls</h1>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Appearance</h2>
          <div className="mt-4">
            <ToggleRow title="Dark mode" description="Use a darker interface for low-light environments." checked={isDarkMode} onChange={toggleDarkMode} />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Notification preferences</h2>
          <div className="mt-4 space-y-3">
            <ToggleRow title="Emergency alerts" description="Receive high-priority SOS and responder updates." checked onChange={() => {}} />
            <ToggleRow title="Route updates" description="Notify contacts when live route sharing starts." checked onChange={() => {}} />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Privacy settings</h2>
          <div className="mt-4 space-y-3">
            <ToggleRow title="Share medical note" description="Show blood group and medical note to assigned responders." checked onChange={() => {}} />
            <ToggleRow title="Limit responder details" description="Only verified assigned responders can view full incident details." checked onChange={() => {}} />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Language</h2>
          <select className="mt-4 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
            <option>English</option>
            <option>Hindi</option>
            <option>Kannada</option>
            <option>Tamil</option>
          </select>
        </Card>
      </div>
    </div>
  );
}
