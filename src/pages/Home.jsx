// src/pages/Home.jsx
import Calculator from "../components/Calculator";
import DonationButton from "../components/DonationButton";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-8">
          Crypto Profit Calculator
        </h1>
        <Calculator />
        <DonationButton />
      </div>
    </Layout>
  );
}
