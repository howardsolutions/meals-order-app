import Modal from "../UI/Modal";
import CartItem from './CartItem.js';

import classes from './Cart.module.css';

import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Cart = ({ onHideCart }) => {

    const ctx = useContext(CartContext);

    const cartItems = <ul className={classes['cart-items']}>
        {
            ctx.items.map(
            item => <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onAdd={() => ctx.addItem({...item, amount: 1})}
                onRemove={() => ctx.removeItem(item.id)}
              />)
        }
    </ul>

    return <Modal onHideCart={onHideCart}>
        {cartItems}

        <div>
            <span className={classes.total}>Total Amount</span>
            <span>{`$ ${ctx.totalAmount.toFixed(2)}`}</span>
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