import React from 'react';
import HeaderCartBtn from './HeaderCartBtn.js';

import classes from './Header.module.css';

const Header = props => {
    return <React.Fragment> 
        {/* Navbar */}
        <nav className={classes.navbar}>
            <h2>Meals Order App</h2>
            <HeaderCartBtn onClick={() => props.onShowCart()} />
        </nav>

        {/* HERO SECTION */}
        <div className={classes['main-image']}>
            {/* <img alt="table full of healthy meals" /> */}
        </div>
    </React.Fragment>
}

export default Header;