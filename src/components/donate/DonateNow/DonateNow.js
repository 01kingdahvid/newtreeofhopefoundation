import DonateNowSection from '@/components/homepage/DonateNowSection/DonateNowSection'
import styles from './DonateNow.module.css'

export default function DonateNow () {
  return (
    <main>
      {/* Donation Section */}

      <section className={styles.donateSection}>
        <div className={styles.container}>
          {/* LEFT - DONATION CARD */}

          <div className={styles.donateCard}>
            <DonateNowSection />
          </div>

          {/* RIGHT - HOW TO DONATE */}

          <div className={styles.donateInfo}>
            <h2>How to Complete Your Donation</h2>

            <p>Follow these simple steps to make your donation:</p>

            <ol>
              <li>
                Enter your donation amount, select a country and program, and
                add any notes if needed.
              </li>

              <li>Provide your details or choose to donate anonymously.</li>

              <li>
                Select your preferred payment method (Crypto or Bank Transfer).
              </li>

              <li>
                On the next step, follow the payment instructions provided:
                <ul>
                  <li>
                    For crypto: send the exact amount to the wallet address
                    shown.
                  </li>
                  <li>
                    For bank transfer: use the account details provided to
                    complete your transfer.
                  </li>
                </ul>
              </li>

              <li>
                After completing your payment, click
                <strong> "I've sent the money"</strong> to notify us.
              </li>
            </ol>

            <p className={styles.note}>
              ⚠️ Please double-check all payment details before sending.
              Cryptocurrency transactions cannot be reversed, and incorrect
              transfers may result in loss of funds.
            </p>
          </div>

        </div>
      </section>

      {/* BITCOIN ADVANTAGES */}

      <section className={styles.bitcoinAdvantages}>
        <div className={styles.containerSmall}>
          <h2>
            What are the advantages of donating Bitcoin to Save the Children?
          </h2>

          <ol className={styles.advantageList}>
            <li>
              <strong>Turn your capital gains to good:</strong> In the U.S., the
              IRS classifies Bitcoin donations as property, meaning your Bitcoin
              donation can help offset capital gains tax.
            </li>

            <li>
              <strong>Remain anonymous if you wish:</strong> We accept anonymous
              donations. 
            </li>

            <li>
              <strong>Don't Trust, Verify:</strong> Bitcoin donations can be
              verified on-chain so you can feel confident your contribution went
              to the right place.
            </li>

            <li>
              <strong>We understand the value of Bitcoin:</strong>
              Bitcoin is a store of value and peer-to-peer technology that can
              supercharge the way we reach those who need help.
            </li>
          </ol>

         

          <p className={styles.smallNote}>
            *Subject to change. Please consult your tax advisor.
          </p>
        </div>
      </section>
    </main>
  )
}
