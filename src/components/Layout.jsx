// src/components/Layout.jsx
export default function Layout({ children }) {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-5 pb-20">{children}</main>
      <footer className="pb-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <span className="opacity-80">Spot only • No fees included • Dark mode supported</span>
      </footer>
    </div>
  );
}