import React from 'react';
import SignUpForm from './SignUpForm';
import styles from './SignupForm.module.css'


const SignupContainer = () => {
    return (
        <div className={styles.signupcontainer1}>
            <div className={styles.signupcontainer2}>
                <div className={styles.formcontainer}>
                    <SignUpForm />
                </div>
                <div className={styles.textcontainer}>
                    <div className={styles.textcontainer2}>
                        <div className={styles.textheader}>
                            <span className={styles.headerbody}>Commission-free trading</span>
                        </div>
                        <div>
                            <span className={styles.textbody}>Break free from commission fees and make unlimited commission-free trades
                                in stocks, funds, and options with Leverage Financial. Other fees may apply. View our
                                fee schedule to learn more.
                            </span>
                        </div>
                        <div className={styles.textheader2}>
                            <span className={styles.headerbody}>Account Protection</span>
                        </div>
                        <div>
                            <span className={styles.textbody}>Leverage Financial is a member of the SIPC. Securities in your account protected up to $500,000. For details,
                                please see www.sipc.org.
                            </span>
                        </div>
                        <div className={styles.textheader2}>
                            <span className={styles.headerbody}>Stay on top of your portfolio</span>
                        </div>
                        <div>
                            <span className={styles.textbody}>Set up customized news and notifications to stay on top of your assets
                                as casually or as relentlessly as you like. Controlling the flow of info is up to you.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupContainer