// src/pages/Home.jsx
import Calculator from "../components/Calculator";
import DonationButton from "../components/DonationButton";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center">

        {/* Logo */}
        <img
          src="/favicon.png"
          alt="Crypto Profit Calculator Logo"
          className="h-20 w-20 object-contain mb-4"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-8">
          Crypto Profit Calculator
        </h1>

        <Calculator />
        <DonationButton />
      </div>
    </Layout>
  );
}