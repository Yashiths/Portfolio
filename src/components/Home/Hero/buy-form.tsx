"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Logo from "@/components/Layout/Header/Logo";
import { CryptoData } from "@/app/(site)/api/data";

// Interface එකේ price එක string හරි number හරි වෙන්න පුළුවන් විදියට හැදුවා
interface Crypto {
  name: string;
  price: string | number; 
}

const BuyCrypto = () => {
  const [loading, setLoading] = useState(false);
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: 0, // මෙතන number එකක් විදියට තියාගමු calculation ලේසි වෙන්න
    amount: "",
    paymentMethod: "creditCard",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // CryptoData එක direct සෙට් නොකර, price එක number එකකට convert කරලා සෙට් කරමු
    const formattedData = CryptoData.map((item: any) => ({
      ...item,
      price: typeof item.price === "string" ? parseFloat(item.price.replace(/[^\d.-]/g, '')) : item.price
    }));

    setCryptos(formattedData);

    if (formattedData.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        name: formattedData[0].name,
        price: formattedData[0].price,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setFormData((prevData) => ({ ...prevData, amount: value }));
    }
  };

  const handleDropdownSelect = (crypto: any) => {
    setFormData((prevData) => ({
      ...prevData,
      name: crypto.name,
      price: crypto.price,
    }));
    setIsDropdownOpen(false);
  };

  // Calculation එකේදී parseFloat පාවිච්චි කරලා error එක නැති කළා
  const totalCost = formData.amount
    ? (formData.price * parseFloat(formData.amount)).toFixed(2)
    : "0.00";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Crypto purchase successful!");
      setFormData((prevData) => ({ ...prevData, amount: "" }));
    } catch (error) {
      toast.error("An error occurred during the purchase.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-center mb-16">
        <Logo />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <div
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="cursor-pointer text-white bg-transparent border border-white/10 rounded-md px-3 py-2 text-start"
          >
            {formData.name || "Select Crypto"}
          </div>
          {isDropdownOpen && (
            <div className="absolute z-10 bg-[#0b1120] border border-white/10 mt-1 rounded-md w-full max-h-60 overflow-y-auto">
              {cryptos.map((crypto) => (
                <div
                  key={crypto.name}
                  onClick={() => handleDropdownSelect(crypto)}
                  className="px-3 text-white hover:text-black py-2 hover:bg-primary cursor-pointer transition-colors"
                >
                  {crypto.name}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <input
            id="crypto-price"
            type="text"
            name="price"
            className="text-white bg-transparent border border-white/10 rounded-md px-3 py-2 w-full focus:border-primary outline-none disabled:opacity-50"
            value={`$${Number(formData.price).toLocaleString()}`}
            disabled
            required
          />
        </div>

        <div className="mb-4">
          <input
            id="amount"
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="any"
            required
            className="text-white bg-transparent border border-white/10 rounded-md px-3 py-2 w-full focus:border-primary outline-none"
          />
        </div>

        <div className="flex justify-between mb-4 text-white font-bold uppercase italic text-xs tracking-widest">
          <p>Total Cost: </p>
          <p className="text-primary">${totalCost}</p>
        </div>

        <button 
          disabled={loading}
          type="submit"
          className="text-black font-black text-xs uppercase italic bg-primary w-full border border-primary rounded-lg py-4 hover:bg-transparent hover:text-primary transition-all disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm Purchase"}
        </button>
      </form>
    </div>
  );
};

export default BuyCrypto;