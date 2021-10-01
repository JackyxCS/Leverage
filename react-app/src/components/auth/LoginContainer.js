import React from 'react';
import LoginForm from './LoginForm';
import styles from './LoginForm.module.css'

const LoginContainer = () => {
    return (
        <div className={styles.login1}>
            <div className={styles.login2}>
                <div className={styles.login3}>
                    <div className={styles.login4}>
                        <img
                            alt=""
                            className={styles.loginImage}
                            aria-hidden="true"
                            data-test-id="default-image"
                            sizes="(min-width: 768px) 1440px, 720px"
                            src="https://cdn.robinhood.com/assets/generated_assets/1e23d6b90f0d905b425ea289de345ab1.jpg"
                            srcSet="https://cdn.robinhood.com/assets/generated_assets/1e23d6b90f0d905b425ea289de345ab1.jpg 720w, https://cdn.robinhood.com/assets/generated_assets/632fcb3e7ed928b2a960f3e003d10b44.jpg 1440w">
                        </img>
                        <div className={styles.loginform1}>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginContainer