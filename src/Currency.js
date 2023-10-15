import React from 'react';
import './Currency.css';

const CurrencyDropdown = (props) => {
    const { getCurrent } = props;

    const currencies = [
        'USD - United States Dollar',
        'EUR - Euro',
        'GBP - British Pound',
        'JPY - Japanese Yen',
        'CNY - Chinese Yuan',
        'NGN - Nigerian Naira'
    ];

    return (
        <div className="currency-dropdown">
            <h1>Please Select Your Currency</h1>
            <select onChange={getCurrent}>
                {currencies.map((currency, index) => (
                    <option key={index} value={currency} >
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CurrencyDropdown;
