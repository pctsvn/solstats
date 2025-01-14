import React, { useState } from 'react'
import styles from './form.module.scss'
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../utils/notification';

function FormSearchToken() {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateAddress = (address: string): boolean => {
        if (!address) {
            notify.error("Please enter a wallet address");
            return false;
        }

        if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
            notify.error("Invalid wallet address");
            return false;
        }

        return true;
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateAddress(address)) {
            return;
        }

        try {
            setIsSubmitting(true);
            // set path
            const path = `/transactions/${address}`;
            navigate(path);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={styles.form__container}>
            <p className={styles.form__title}>Wallet Address</p>
            <div className={styles.form__input__container}>
                <input
                    type="text"
                    placeholder="Enter Solona wallet address"
                    className={styles.form__input}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={isSubmitting}
                />
                <button className={styles.form__button} onClick={handleSearch} disabled={isSubmitting}>
                    <SearchIcon />
                    Analyze
                </button>
            </div>
        </div>
    )
}

export default FormSearchToken