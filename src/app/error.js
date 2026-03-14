"use client";

import { Button, Result } from "antd";
import styles from "./layout.module.css";

export default function Error({ error, reset }) {
  return (
    <div className={styles.container}>
      <div className={styles.logoLink}>
        <div className={styles.logoIcon}>
          <img
            src="/images/logos/nthf-logo.png"
            alt="New Tree of Hope Foundation"
            className={styles.logoImg}
          />
          <div className={styles.logoText}>
            <span>NTHF</span>
            <small>New Tree Of Hope Foundation</small>
          </div>
        </div>
      </div>
      <Result
        status="error"
        title="Something Went Wrong"
        subTitle="We apologize for the inconvenience. Please try again later."
        extra={[
          <Button
            key="back"
            type="primary"
            onClick={() => reset()}
            style={{ backgroundColor: "#1aa2cc", borderColor: "white" }}
          >
            Try Again
          </Button>,
        ]}
      />
    </div>
  );
}
