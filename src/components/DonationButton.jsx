// src/components/DonationButton.jsx
import React from "react";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export default function DonationButton() {
  const [active, setActive] = React.useState(null);
  const presets = [3, 5, 10]; // quick coffee amounts (UI only; Payoneer page handles the amount)

  const openDonation = () => {
    if (!DONATION_LINK) return; // stays inert until you paste your link later
    window.open(DONATION_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mt-12 flex flex-col items-center">
      <div className="text-center">
        <h3 className="text-base font-medium text-slate-800 dark:text-slate-100">
          Please buy me a coffee to keep this up <span role="img" aria-label="coffee">☕</span>
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Your support helps maintain and improve this calculator.
        </p>
      </div>

      {/* Presets */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {presets.map((n) => (
          <button
            key={n}
            onClick={() => {
              setActive(n);
              openDonation(); // open immediately; Payoneer page will let them choose amount if link is open-amount
            }}
            disabled={!DONATION_LINK}
            className={classNames(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition ring-1",
              active === n
                ? "bg-amber-600 text-white ring-amber-600 shadow"
                : "bg-amber-50 text-amber-900 hover:bg-amber-100 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-100 dark:ring-amber-900/40",
              !DONATION_LINK && "opacity-60 cursor-not-allowed"
            )}
            aria-label={`Donate ${DONATION_CURRENCY} ${n}`}
            title={DONATION_LINK ? `Donate ${DONATION_CURRENCY} ${n}` : "Available after publish"}
          >
            ☕ {DONATION_CURRENCY} {n}
          </button>
        ))}
      </div>

      {/* Main CTA */}
      <button
        onClick={openDonation}
        disabled={!DONATION_LINK}
        className={classNames(
          "group relative mt-5 inline-flex items-center justify-center rounded-xl px-5 py-2.5",
          "text-sm font-semibold text-white transition-all",
          "bg-amber-600 hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70",
          "shadow-md hover:shadow-lg active:translate-y-px",
          !DONATION_LINK && "opacity-60 cursor-not-allowed"
        )}
      >
        {/* subtle halo */}
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-amber-500 via-rose-400 to-amber-600 opacity-40 blur-md transition-opacity group-hover:opacity-65"
        />
        <span className="mr-2">☕</span>
        <span>Buy me a coffee</span>
      </button>

      {/* Small status line when link isn't set yet */}
      {!DONATION_LINK && (
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Donation link will be enabled after publish.
        </p>
      )}
      {DONATION_LINK && (
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          You’ll be redirected to a secure Payoneer payment page.
        </p>
      )}
    </section>
  );
}