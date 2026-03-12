"use client";

import { Button, Result } from "antd";
import styles from "./layout.module.css";

export default function NotFound() {
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
        status="404"
        title="Page Not Found"
        subTitle="The page you are looking for does not exist."
        extra={[
          <Button
            key="back"
            type="primary"
            href="/"
            style={{ backgroundColor: "#1aa2cc", borderColor: "#1aa2cc" }}
          >
            Back to Home
          </Button>,
        ]}
      />
    </div>
  );
}
