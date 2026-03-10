'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ProgramDonate.module.css'; // rename or reuse your existing CSS

// Data (copied from DonateNowSection)
import programsData from '@/data/programs.json';

const cryptoAssets = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿', networks: ['Bitcoin'] },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', networks: ['Ethereum', 'Base', 'Arbitrum'] },
  { symbol: 'USDC', name: 'USD Coin', icon: '●', networks: ['Ethereum', 'Base', 'Solana'] },
  { symbol: 'SOL', name: 'Solana', icon: '◎', networks: ['Solana'] },
  { symbol: 'MATIC', name: 'Polygon', icon: 'Ⓜ', networks: ['Polygon'] },
];

const cryptoWallets = {
  BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  ETH: '0x32Be343B94f860124dC4fEe278FDCBD38C102D88',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  SOL: 'SoL11111111111111111111111111111111111111112',
  MATIC: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
};

const exchangeRates = {
  BTC: 67500,
  ETH: 3500,
  USDC: 1,
  SOL: 150,
  MATIC: 0.9,
};

export default function ProgramDonate({ program: initialProgram = null }) {
  // ---------- Loading ----------
  const [loading, setLoading] = useState(true);

  // ---------- Step ----------
  const [step, setStep] = useState(1);

  // ---------- Form data ----------
  const [amountUSD, setAmountUSD] = useState('');
  const [selectedAmountPreset, setSelectedAmountPreset] = useState(null);
  const [country, setCountry] = useState('');
  const [program, setProgram] = useState(initialProgram ? initialProgram.slug : '');
  const [note, setNote] = useState('');
  const [coverFees, setCoverFees] = useState(false);

  // Donor info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  // Crypto selection
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [network, setNetwork] = useState('Bitcoin');

  // Payment step
  const [walletAddress, setWalletAddress] = useState(cryptoWallets.BTC);
  const [copied, setCopied] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({});

  const copyTimeoutRef = useRef(null);

  const sectionRef = useRef(null);

// Add this useEffect to handle scroll on step change
useEffect(() => {
  if (sectionRef.current) {
    sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}, [step]);

  // ---------- Effects ----------
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setWalletAddress(cryptoWallets[selectedCrypto] || '');
    const asset = cryptoAssets.find((c) => c.symbol === selectedCrypto);
    if (asset?.networks.length) setNetwork(asset.networks[0]);
  }, [selectedCrypto]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  // ---------- Helpers ----------
  const handleAmountSelect = (val) => {
    setAmountUSD(val.toString());
    setSelectedAmountPreset(val);
    setErrors((prev) => ({ ...prev, amount: '' }));
  };

  const handleAmountInput = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d+(\.\d{0,2})?$/.test(val)) {
      setAmountUSD(val);
      setSelectedAmountPreset(null);
      setErrors((prev) => ({ ...prev, amount: '' }));
    } else {
      setErrors((prev) => ({ ...prev, amount: 'Enter a valid amount' }));
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const getCryptoAmount = () => {
    const usd = parseFloat(amountUSD);
    if (isNaN(usd) || usd <= 0) return 0;
    const rate = exchangeRates[selectedCrypto] || 1;
    return usd / rate;
  };

  const cryptoAmountFormatted = () => {
    const val = getCryptoAmount();
    return val === 0 ? '0' : val.toFixed(8);
  };

  const validateStep1 = () => {
    const newErrors = {};
    const usd = parseFloat(amountUSD);
    if (isNaN(usd) || usd <= 0) newErrors.amount = 'Please enter a donation amount';
    if (!country) newErrors.country = 'Select a country';
    if (!program) newErrors.program = 'Select a program';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (anonymous) return true;
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email';
    if (!phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = () => setStep(4);

  // ---------- Loading ----------
  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Preparing donation...</p>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Step 1 ----------
  const renderStep1 = () => (
    <div className={styles.card}>
      <span className={styles.badge}>GIVE NOW</span>
      <h1 className={styles.title}>CHANGE LIVES INSTANTLY</h1>

      {/* Amount */}
      <div className={styles.amountRow}>
        {[50, 100, 250, 500, 1000].map((val) => (
          <button
            key={val}
            className={`${styles.amountBtn} ${selectedAmountPreset === val ? styles.selected : ''}`}
            onClick={() => handleAmountSelect(val)}
          >
            ${val}
          </button>
        ))}
        <input
          type="text"
          placeholder="Other"
          className={styles.amountInput}
          value={amountUSD}
          onChange={handleAmountInput}
        />
      </div>
      {errors.amount && <div className={styles.errorText}>{errors.amount}</div>}

      {/* Country */}
      <select
        className={styles.select}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">Select Country</option>
        <option value="USA">USA</option>
        <option value="Canada">Canada</option>
        <option value="UK">United Kingdom</option>
        <option value="Australia">Australia</option>
        <option value="Other">Other</option>
      </select>
      {errors.country && <div className={styles.errorText}>{errors.country}</div>}

      {/* Program – conditional rendering */}
      {!initialProgram ? (
        <select
          className={styles.select}
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        >
          <option value="">Select Program</option>
          {programsData.map((prog) => (
            <option key={prog.id} value={prog.slug}>
              {prog.title}
            </option>
          ))}
        </select>
      ) : (
        <div className={styles.staticProgram}>
          <strong>Program:</strong> {initialProgram.title}
        </div>
      )}
      {errors.program && !initialProgram && <div className={styles.errorText}>{errors.program}</div>}

      {/* Note */}
      <textarea
        className={styles.textarea}
        placeholder="Add a note to your donation (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      {/* Cover fees */}
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={coverFees}
          onChange={(e) => setCoverFees(e.target.checked)}
        />
        I&apos;d like to help cover the transaction fees
      </label>

      <button className={styles.primaryBtn} onClick={() => validateStep1() && setStep(2)}>
        DONATE NOW
      </button>
    </div>
  );

  // ---------- Step 2 (donor info) – unchanged from DonateNowSection ----------
  const renderStep2 = () => (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <button className={styles.backButton} onClick={() => setStep(1)}>←</button>
        <h2 className={styles.title}>Your Information</h2>
      </div>

      <label className={styles.checkbox} style={{ marginBottom: '1.5rem' }}>
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
        />
        Donate anonymously
      </label>

      <input
        className={styles.input}
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={anonymous}
      />
      {!anonymous && errors.name && <div className={styles.errorText}>{errors.name}</div>}

      <input
        className={styles.input}
        placeholder="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={anonymous}
      />
      {!anonymous && errors.email && <div className={styles.errorText}>{errors.email}</div>}

      <input
        className={styles.input}
        placeholder="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={anonymous}
      />
      {!anonymous && errors.phone && <div className={styles.errorText}>{errors.phone}</div>}

      <button className={styles.primaryBtn} onClick={() => validateStep2() && setStep(3)}>
        Continue
      </button>
    </div>
  );

  // ---------- Step 3 (crypto select) – unchanged ----------
  const renderStep3 = () => {
    const quickCryptos = ['BTC', 'ETH', 'USDC'];

    return (
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <button className={styles.backButton} onClick={() => setStep(2)}>←</button>
          <h2 className={styles.title}>Make a Donation</h2>
        </div>

        <div className={styles.quickCryptoRow}>
          {quickCryptos.map((sym) => {
            const asset = cryptoAssets.find((c) => c.symbol === sym);
            return (
              <button
                key={sym}
                className={`${styles.cryptoQuickBtn} ${selectedCrypto === sym ? styles.active : ''}`}
                onClick={() => setSelectedCrypto(sym)}
              >
                <span className={styles.cryptoIcon}>{asset.icon}</span> {sym}
              </button>
            );
          })}
        </div>

        <div className={styles.fullSelectRow}>
          <div className={styles.cryptoSelectWrapper}>
            <select
              className={styles.cryptoSelect}
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
            >
              {cryptoAssets.map((asset) => (
                <option key={asset.symbol} value={asset.symbol}>
                  {asset.name} ({asset.symbol})
                </option>
              ))}
            </select>
          </div>
          {cryptoAssets.find((c) => c.symbol === selectedCrypto)?.networks.length ? (
            <select
              className={styles.networkSelect}
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            >
              {cryptoAssets
                .find((c) => c.symbol === selectedCrypto)
                .networks.map((net) => (
                  <option key={net} value={net}>
                    {net}
                  </option>
                ))}
            </select>
          ) : null}
        </div>

        <div className={styles.totalCryptoBox}>
          <span className={styles.cryptoTotalValue}>
            {cryptoAmountFormatted()}{' '}
            <span className={styles.cryptoSymbolSmall}>{selectedCrypto}</span>
          </span>
          <span className={styles.usdEquivalent}>
            ≈ ${parseFloat(amountUSD || 0).toFixed(2)} USD
          </span>
        </div>

        <button className={styles.primaryBtn} onClick={handleProceedToPayment}>
          Donate {selectedCrypto}
        </button>
      </div>
    );
  };

  // ---------- Step 4 (payment) – unchanged ----------
  const renderStep4 = () => {
    const asset = cryptoAssets.find((c) => c.symbol === selectedCrypto);
    const warningMessage = `Send only ${selectedCrypto} to this address using the following supported networks: ${asset.networks.join(
      ', '
    )}. Sending unsupported tokens or NFTs to this address may result in the loss of your donation. The address will expire after 180 days if unused.`;

    return (
      <div className={styles.card}>
        <div className={styles.paymentContainer}>
          <div className={styles.paymentHeader}>
            <button className={styles.backButton} onClick={() => setStep(3)}>←</button>
            <div className={styles.paymentAmount}>
              <span className={styles.bigNumber}>{cryptoAmountFormatted()}</span>
              <span className={styles.asset}>{selectedCrypto}</span>
            </div>
            <div style={{ width: '24px' }} />
          </div>

          <p style={{ color: '#334155', margin: '0.5rem 0 0' }}>
            Use the address below to make a donation from your wallet.
          </p>

          <div className={styles.qrCode}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${walletAddress}`}
              alt="QR code"
            />
          </div>

          <div className={styles.walletAddressBox}>
            <span style={{ wordBreak: 'break-all' }}>{walletAddress}</span>
            <button className={styles.copyBtn} onClick={copyAddress}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className={styles.warningBox}>
            <strong>⚠️ Warning</strong>
            <p>{warningMessage}</p>
          </div>

          <button className={styles.sentMoneyBtn} onClick={() => setStep(5)}>
            I&apos;ve sent the money
          </button>
        </div>
      </div>
    );
  };

  // ---------- Step 5 (thank you) – unchanged ----------
  const renderStep5 = () => (
    <div className={styles.card}>
      <div className={styles.thankYouContainer}>
        <h2 className={styles.thankYouTitle}>Thank You ❤️</h2>
        <p className={styles.thankYouMessage}>Your donation helps change lives.</p>
        <button
          className={styles.startOverBtn}
          onClick={() => {
            setStep(1);
            setAmountUSD('');
            setSelectedAmountPreset(null);
            setCountry('');
            setProgram(initialProgram ? initialProgram.slug : '');
            setNote('');
            setCoverFees(false);
            setName('');
            setEmail('');
            setPhone('');
            setAnonymous(false);
            setSelectedCrypto('BTC');
          }}
        >
          Start Over
        </button>
      </div>
    </div>
  );

  // ---------- Render ----------
  return (
    <section className={styles.section} ref={sectionRef}>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
      {step === 5 && renderStep5()}
    </section>
  );
}