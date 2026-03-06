"use client";

import React, { useState, useEffect } from "react";
import styles from "./DonateNowSection.module.css";

const cryptoWallets = {
  BTC: "bc1qexamplewalletaddressbtc",
  ETH: "0xexamplewalletaddresseth",
  USDT: "TExampleWalletAddressUSDT",
  SOL: "SoLExampleWalletAddress",
};

const DonateNowSection = () => {

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [crypto, setCrypto] = useState("");
  const [wallet, setWallet] = useState("");
  const [time, setTime] = useState(900);

  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    program: "",
    note: "",
    hash: "",
    finalAmount: "",
  });

  useEffect(() => {
    if (step === 4 && time > 0) {
      const timer = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [time, step]);

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet);
  };

  const handleCrypto = (c) => {
    setCrypto(c);
    setWallet(cryptoWallets[c]);
    setStep(4);
  };

  const formatTime = () => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section className={styles.section}>

      {/* STEP 1 DONATION FORM */}

      {step === 1 && (
        <div className={styles.card}>

          <span className={styles.badge}>GIVE NOW</span>

          <h1 className={styles.title}>
            CHANGE LIVES INSTANTLY
          </h1>

          <div className={styles.amountRow}>
            {[50,100,250,500,1000].map(a=>(
              <button
                key={a}
                onClick={()=>setAmount(a)}
                className={styles.amountBtn}
              >
                ${a}
              </button>
            ))}

            <input
              placeholder="Other"
              className={styles.amountInput}
              onChange={(e)=>setAmount(e.target.value)}
            />
          </div>

          <select
            className={styles.input}
            onChange={(e)=>setForm({...form,country:e.target.value})}
          >
            <option>Select Country</option>
            <option>South Korea</option>
            <option>Nigeria</option>
            <option>USA</option>
          </select>

          <select
            className={styles.input}
            onChange={(e)=>setForm({...form,program:e.target.value})}
          >
            <option>Select Program</option>
            <option>Food Relief</option>
            <option>Education</option>
            <option>Emergency Aid</option>
          </select>

          <label className={styles.checkbox}>
            <input type="checkbox"/>
            I&apos;d like to help cover the transaction fees
          </label>

          <button
            className={styles.primaryBtn}
            onClick={()=>setStep(2)}
          >
            DONATE NOW
          </button>

        </div>
      )}

      {/* STEP 2 USER INFO */}

      {step === 2 && (
        <div className={styles.card}>
          <h2>Donor Information</h2>

          <input
            className={styles.input}
            placeholder="Full Name"
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            className={styles.input}
            placeholder="Email Address"
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <textarea
            placeholder="Optional message"
            className={styles.textarea}
            onChange={(e)=>setForm({...form,note:e.target.value})}
          />

          <button
            className={styles.primaryBtn}
            onClick={()=>setStep(3)}
          >
            Continue
          </button>

        </div>
      )}

      {/* STEP 3 CRYPTO SELECT */}

      {step === 3 && (
        <div className={styles.card}>

          <h2>Select Crypto Asset</h2>

          <div className={styles.cryptoRow}>
            {Object.keys(cryptoWallets).map(c=>(
              <button
                key={c}
                onClick={()=>handleCrypto(c)}
                className={styles.cryptoBtn}
              >
                {c}
              </button>
            ))}
          </div>

        </div>
      )}

      {/* STEP 4 PAYMENT */}

      {step === 4 && (
        <div className={styles.card}>

          <div className={styles.timer}>
            {formatTime()}
          </div>

          <h2>Send {crypto}</h2>

          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${wallet}`}
            className={styles.qr}
          />

          <div className={styles.walletBox}>
            {wallet}

            <button
              className={styles.copy}
              onClick={copyAddress}
            >
              Copy
            </button>
          </div>

          <button
            className={styles.primaryBtn}
            onClick={()=>setStep(5)}
          >
            I've Sent The Money
          </button>

        </div>
      )}

      {/* STEP 5 CONFIRMATION */}

      {step === 5 && (
        <div className={styles.card}>

          <h2>Confirm Transaction</h2>

          <input
            className={styles.input}
            placeholder="Transaction Hash"
            onChange={(e)=>setForm({...form,hash:e.target.value})}
          />

          <input
            className={styles.input}
            placeholder="Final Amount Sent"
            onChange={(e)=>setForm({...form,finalAmount:e.target.value})}
          />

          <textarea
            placeholder="Optional note"
            className={styles.textarea}
          />

          <button
            className={styles.primaryBtn}
            onClick={()=>setStep(6)}
          >
            Submit Donation
          </button>

        </div>
      )}

      {/* THANK YOU MODAL */}

      {step === 6 && (
        <div className={styles.modal}>
          <div className={styles.modalCard}>
            <h2>Thank You ❤️</h2>
            <p>Your donation helps change lives.</p>
          </div>
        </div>
      )}

    </section>
  );
};

export default DonateNowSection;