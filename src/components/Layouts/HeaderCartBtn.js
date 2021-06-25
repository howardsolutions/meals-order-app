import classes from './HeaderCartBtn.module.css';
import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon.js';
import CartContext from '../../store/cart-context';

const HeaderCartBtn = props => {
    const [btnHighLight, setBtnHighLight] =  useState(false);

    const ctx = useContext(CartContext);

    const {items} = ctx;
    
    const numberItems = items.reduce((acc, item) => acc + item.amount, 0);

    const btnClasses =  `${classes.button} ${btnHighLight ? classes.bump : ''}`
    
    useEffect(() => {
        if (items.length === 0) return;

        setBtnHighLight(true)

        const timer = setTimeout(() => {
            setBtnHighLight(false)
        }, 300)

        return () => clearTimeout(timer); 

    }, [items])

    return <button onClick={props.onClick} className={btnClasses}>
        <span className={classes.icon}>
            <CartIcon />
        </span>

        <span>
            Your Card
        </span>

        <span className={classes.badge}>
            {numberItems}
        </span>
    </button>
}

export default HeaderCartBtn;