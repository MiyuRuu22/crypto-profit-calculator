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
          className="h-24 w-24 object-contain mb-4"
        />

        <Calculator />
        <DonationButton />
      </div>
    </Layout>
  );
}