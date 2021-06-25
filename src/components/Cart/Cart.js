import Modal from "../UI/Modal";
import CartItem from './CartItem.js';

import classes from './Cart.module.css';

import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Cart = ({onHideCart}) => {

    const ctx = useContext(CartContext);

    return <Modal onHideCart={onHideCart}>
        <div>
            <span className={classes.total}>Total Amount</span>
            <span>2</span>
        </div>

        <div className={classes.actions}>
            <button
                onClick={() => onHideCart()}
                className={classes['button--alt']}
            >
                Close
            </button>

            {
                ctx.items.length > 0 &&
                <button className={classes.button}>Order</button>
            }
        </div>
    </Modal>
}

export default Cart;