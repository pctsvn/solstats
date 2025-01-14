import React from 'react'
import styles from './header.module.scss'

function Header() {
    return (
        <div className={styles.header__container}>
            <p className={styles.header__title}>Crypto Wallet Analyzer</p>
            <p className={styles.header__subtitle}>Analyze trading patterns and get AI-powered insights</p>
        </div>
    )
}

export default Header
