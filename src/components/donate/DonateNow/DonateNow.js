import DonateNowSection from "@/components/homepage/DonateNowSection/DonateNowSection";
import styles from "./DonateNow.module.css";

export default function DonateNow() {
  return (
    <main>

      {/* Donation Section */}

      <section className={styles.donateSection}>
        <div className={styles.container}>

          {/* LEFT - DONATION CARD */}

          <div className={styles.donateCard}>
           <DonateNowSection/>
          </div>


          {/* RIGHT - HOW TO DONATE */}

          <div className={styles.donateInfo}>
            <h2>How to Donate Bitcoin</h2>

            <p>
              Make your Bitcoin donation with three easy steps:
            </p>

            <ol>
              <li>
                Select Bitcoin in the drop-down menu and enter a donation
                amount. If you would like to support a specific country or
                emergency response, please include this in the "notes"
                field and we will do our best to honor your wishes.
              </li>

              <li>
                Provide your information, including name, address,
                state and zip code. You can also choose to donate
                Bitcoin anonymously.
              </li>

              <li>
                Donate from your wallet using the address that is
                provided to you.
              </li>
            </ol>

          </div>

        </div>
      </section>


      {/* BITCOIN ADVANTAGES */}

      <section className={styles.bitcoinAdvantages}>
        <div className={styles.containerSmall}>

          <h2>
            What are the advantages of donating Bitcoin to Save the Children?
          </h2>

          <ul className={styles.advantageList}>

            <li>
              <strong>Turn your capital gains to good:</strong> In the U.S.,
              the IRS classifies Bitcoin donations as property, meaning
              your Bitcoin donation can help offset capital gains tax.
            </li>

            <li>
              <strong>Remain anonymous if you wish:</strong> We accept
              anonymous donations. As an anonymous donor, you can receive
              a tax receipt if you provide an email address.
            </li>

            <li>
              <strong>Don't Trust, Verify:</strong> Bitcoin donations can
              be verified on-chain so you can feel confident your
              contribution went to the right place.
            </li>

            <li>
              <strong>We understand the value of Bitcoin:</strong>
              Bitcoin is a store of value and peer-to-peer technology
              that can supercharge the way we reach those who need help.
            </li>

          </ul>

          <p className={styles.cryptoLink}>
            To donate Ethereum, USDC, or other cryptocurrencies,
            visit our <span>Donate Cryptocurrency</span> page.
          </p>

          <p className={styles.smallNote}>
            *Subject to change. Please consult your tax advisor.
          </p>

        </div>
      </section>

    </main>
  );
}