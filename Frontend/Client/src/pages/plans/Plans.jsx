import React from 'react'
import styles from "./plans.module.css"

function Plans() {
  return (
    <div id={styles.container}>
      <div className={styles.plans}>
        <div className={styles.desc}>
          <h2>Basic</h2>
          <p>Start your journey with us</p>
        </div>
          <div className={styles.card}>
            <br></br>
            <h2>₹0</h2><br></br>
            <p>✔️ Single Device login</p>
            <p>✔️ 5 Free Appointments</p>
            <p>✔️ 5 Days Support</p>
            <p>✔️ No Rescheduling</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
          <button>Get Now</button>
        </div>
      <div className={styles.plans}>
      <div className={styles.desc}>
          <h2>Standard</h2>
          <p>Explore our standard plan</p>
        </div>
          <div className={styles.card}>
            <br></br>
            <h2>₹499/<span>Month</span></h2><br></br>
            <p>✔️ Upto 5 Device login</p>
            <p>✔️ 20 Free Appointments</p>
            <p>✔️ 6 Days Support</p>
            <p>✔️ No Rescheduling</p>
            <p>✔️ One time Physical Meet</p>
            <br></br><br></br>
          </div>
          <button>Get Now</button>
        </div>
      <div className={styles.plans}>
      <div className={styles.desc}>
          <h2>Premium</h2>
          <p>Explore our premium plan</p>
        </div>
          <div className={styles.card}>
            <br></br>
            <h2>₹1299/<span>Month</span></h2><br></br>
            <p>✔️ Unlimited Device login</p>
            <p>✔️ Free Appointments</p>
            <p>✔️ 24*7 Support</p>
            <p>✔️ Reschedule according to you</p>
            <p>✔️ Physical Meet Available</p>
            <p>✔️ No time bound</p>
          </div>
          <button>Get Now</button>

        </div>
    </div>
  )
}

export default Plans