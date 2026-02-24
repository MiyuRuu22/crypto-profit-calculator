// src/components/Calculator.jsx
import { useMemo, useState } from "react";

/* utilities */
function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function ArrowUpRightIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}
function ArrowDownRightIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 7l10 10M15 17H7v-8" />
    </svg>
  );
}

export default function Calculator() {
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [touched, setTouched] = useState({});

  const parsed = useMemo(() => {
    const buy = Number.parseFloat(buyPrice);
    const sell = Number.parseFloat(sellPrice);
    const qty = Number.parseFloat(amount);
    return {
      buy: Number.isFinite(buy) ? buy : NaN,
      sell: Number.isFinite(sell) ? sell : NaN,
      qty: Number.isFinite(qty) ? qty : NaN,
    };
  }, [buyPrice, sellPrice, amount]);

  const canCalculate =
    Number.isFinite(parsed.buy) &&
    Number.isFinite(parsed.sell) &&
    Number.isFinite(parsed.qty) &&
    parsed.buy > 0 &&
    parsed.sell >= 0 &&
    parsed.qty > 0;

  const result = useMemo(() => {
    if (!canCalculate) return null;
    const profit = (parsed.sell - parsed.buy) * parsed.qty;
    const pnlPct = ((parsed.sell - parsed.buy) / parsed.buy) * 100;
    return { profit, pnlPct };
  }, [canCalculate, parsed]);

  const formatMoney = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const onCalculate = async () => {
    if (!canCalculate) return;
    setIsCalculating(true);
    await new Promise((r) => setTimeout(r, 180));
    setIsCalculating(false);
  };

  const errorFor = (field) => {
    const value = { buy: buyPrice, sell: sellPrice, qty: amount }[field];
    const num = parsed[field];
    if (!touched[field] || value === "") return "";
    if (!Number.isFinite(num)) return "Please enter a valid number.";
    if (field === "buy" && num <= 0) return "Buy price must be greater than 0.";
    if (field === "sell" && num < 0) return "Sell price cannot be negative.";
    if (field === "qty" && num <= 0) return "Amount must be greater than 0.";
    return "";
  };

  return (
    <div className="w-full max-w-md">
      {/* Gradient outline only */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(99,102,241,.9), rgba(217,70,239,.9), rgba(34,211,238,.9))",
            padding: "1px",
            borderRadius: "16px",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <div className="relative rounded-2xl bg-transparent p-6">
          <header className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Crypto Profit Calculator
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Enter your buy price, sell price, and amount to estimate P/L.
            </p>
          </header>

          <div className="space-y-4">
            <FormField
              id="buyPrice"
              label="Buy Price"
              placeholder="0.00"
              prefix="$"
              value={buyPrice}
              onChange={setBuyPrice}
              onBlur={() => setTouched((t) => ({ ...t, buy: true }))}
              error={errorFor("buy")}
            />
            <FormField
              id="sellPrice"
              label="Sell Price"
              placeholder="0.00"
              prefix="$"
              value={sellPrice}
              onChange={setSellPrice}
              onBlur={() => setTouched((t) => ({ ...t, sell: true }))}
              error={errorFor("sell")}
            />
            <FormField
              id="amount"
              label="Amount"
              placeholder="0"
              suffix="units"
              value={amount}
              onChange={setAmount}
              onBlur={() => setTouched((t) => ({ ...t, qty: true }))}
              error={errorFor("qty")}
            />

            <button
              onClick={onCalculate}
              disabled={!canCalculate || isCalculating}
              className={classNames(
                "mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wide transition-all",
                canCalculate && !isCalculating
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 active:translate-y-0"
                  : "bg-emerald-600/50 text-white/80 cursor-not-allowed"
              )}
            >
              {isCalculating ? (
                <>
                  <Spinner /> Calculating…
                </>
              ) : (
                "Calculate"
              )}
            </button>

            {result && (
              <div
                className={classNames(
                  "mt-4 rounded-xl p-4 ring-1",
                  result.profit >= 0
                    ? "bg-emerald-50/70 text-emerald-900 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-100 dark:ring-emerald-900/40"
                    : "bg-rose-50/70 text-rose-900 ring-rose-200 dark:bg-rose-900/20 dark:text-rose-100 dark:ring-rose-900/40"
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-70">
                      {result.profit >= 0 ? "Profit" : "Loss"}
                    </p>
                    <p className="mt-1 text-2xl font-semibold tabular-nums">
                      ${formatMoney(Math.abs(result.profit))}
                    </p>
                    <p className="mt-1 text-sm opacity-80">
                      P/L %:{" "}
                      <span className="font-medium tabular-nums">
                        {result.pnlPct >= 0 ? "+" : ""}
                        {result.pnlPct.toFixed(2)}%
                      </span>
                    </p>
                  </div>
                  <div
                    className={classNames(
                      "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ring-1",
                      result.profit >= 0
                        ? "bg-emerald-600/10 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-400/20"
                        : "bg-rose-600/10 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-200 dark:ring-rose-400/20"
                    )}
                  >
                    {result.profit >= 0 ? (
                      <ArrowUpRightIcon className="w-4 h-4" />
                    ) : (
                      <ArrowDownRightIcon className="w-4 h-4" />
                    )}
                    {result.profit >= 0 ? "Up" : "Down"}
                  </div>
                </div>
              </div>
            )}
          </div>

          <footer className="mt-6 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span className="opacity-80">Spot only • No fees included</span>
            <span className="opacity-60">Dark mode supported</span>
          </footer>
        </div>
      </div>
    </div>
  );
}

/* Reusable transparent field */
function FormField({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  prefix,
  suffix,
  error,
}) {
  const hasError = Boolean(error);
  return (
    <div className="group">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <div
        className={classNames(
          "relative flex items-center rounded-xl ring-1 transition bg-transparent",
          hasError
            ? "ring-rose-400 focus-within:ring-rose-500"
            : "ring-slate-300/70 dark:ring-white/10 focus-within:ring-indigo-500/60"
        )}
      >
        {prefix && (
          <span className="pointer-events-none select-none pl-3 pr-1 text-slate-400 dark:text-slate-500 tabular-nums">
            {prefix}
          </span>
        )}
        <input
          id={id}
          inputMode="decimal"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(",", "."))}
          onBlur={onBlur}
          placeholder={placeholder}
          className={classNames(
            "w-full bg-transparent px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-sm dark:text-slate-100",
            prefix ? "pl-1" : "pl-3",
            suffix ? "pr-10" : "pr-3"
          )}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? `${id}-error` : undefined}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 select-none text-slate-400 dark:text-slate-500">
            {suffix}
          </span>
        )}
      </div>
      {hasError ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-rose-600 dark:text-rose-300">
          {error}
        </p>
      ) : (
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Enter a valid number.</p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}