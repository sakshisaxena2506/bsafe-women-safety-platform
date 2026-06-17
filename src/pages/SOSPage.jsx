import { useCallback, useState } from "react";
import AlertTimeline from "../components/sos/AlertTimeline";
import CountdownTimer from "../components/sos/CountdownTimer";
import LiveLocationCard from "../components/sos/LiveLocationCard";
import SOSButton from "../components/sos/SOSButton";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";
import { useNotifications } from "../context/NotificationContext";
import { useSafety } from "../context/SafetyContext";

export default function SOSPage() {
  const { activeAlert, createSosAlert } = useSafety();
  const { pushNotification } = useNotifications();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isSent, setIsSent] = useState(Boolean(activeAlert));

  const completeSos = useCallback(() => {
    const alert = createSosAlert();
    pushNotification({
      title: "SOS alert sent",
      message: `Emergency alert ${alert.id} is now active.`,
      type: "alert"
    });
    setIsCountingDown(false);
    setIsConfirmOpen(false);
    setIsSent(true);
  }, [createSosAlert, pushNotification]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <p className="text-sm font-bold uppercase text-brand-700 dark:text-brand-100">Emergency module</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">SOS Center</h1>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            Press the emergency button to start a controlled SOS flow with confirmation, countdown, success state,
            location sharing, and incident tracking.
          </p>
          <div className="mt-6">
            <SOSButton isActive={isSent} onClick={() => setIsConfirmOpen(true)} />
          </div>
        </Card>

        <LiveLocationCard />
      </div>

      {isSent && (
        <Card className="border-roseguard-200 bg-roseguard-50/80 dark:border-roseguard-500/20 dark:bg-roseguard-500/10">
          <h2 className="text-xl font-bold text-roseguard-700 dark:text-roseguard-100">Alert sent successfully</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
            Trusted contacts, nearby verified responders, and support teams have received your live incident details.
          </p>
        </Card>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <AlertTimeline />
        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Incident details</h2>
          <dl className="mt-5 grid gap-4">
            <div>
              <dt className="text-sm font-bold text-slate-400">Status</dt>
              <dd className="text-slate-950 dark:text-white">{isSent ? "Active emergency response" : "No active alert"}</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-slate-400">Sharing</dt>
              <dd className="text-slate-950 dark:text-white">Location, profile summary, contacts, incident status</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-slate-400">Responder visibility</dt>
              <dd className="text-slate-950 dark:text-white">Limited to assigned and verified responders</dd>
            </div>
          </dl>
        </Card>
      </div>

      <Modal
        isOpen={isConfirmOpen}
        title="Confirm emergency alert"
        onClose={() => {
          setIsCountingDown(false);
          setIsConfirmOpen(false);
        }}
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setIsCountingDown(true)}>Send SOS</Button>
          </>
        }
      >
        {isCountingDown ? (
          <CountdownTimer isRunning={isCountingDown} onComplete={completeSos} />
        ) : (
          <p className="leading-7 text-slate-600 dark:text-slate-300">
            This will notify trusted contacts and nearby verified responders with your current location.
          </p>
        )}
      </Modal>
    </div>
  );
}
