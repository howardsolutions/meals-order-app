import Modal from "../UI/Modal";
import CartItem from './CartItem.js';
import CheckOut from "./Checkout.js";

import classes from './Cart.module.css';

import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";

const Cart = ({ onHideCart }) => {
    const [checkOut, setCheckOut] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const ctx = useContext(CartContext);

    const cartItems = <ul className={classes['cart-items']}>
        {
            ctx.items.map(
                item => <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onAdd={() => ctx.addItem({ ...item, amount: 1 })}
                    onRemove={() => ctx.removeItem(item.id)}
                />)
        }
    </ul>

    const orderHandler = () => {
        setCheckOut(true)
    }

    const modalActions = (<div className={classes.actions}>
        <button
            onClick={() => onHideCart()}
            className={classes['button--alt']}
        >
            Close
        </button>

        {
            ctx.items.length > 0 &&
            <button
                onClick={orderHandler}
                className={classes.button}>Order</button>
        }
    </div>)

    const submitOrderHander = async (userData) => {
        setIsSubmit(true)
        
        await fetch('https://react-http-e25c6-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: ctx.items
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })

        setIsSubmit(false)
        setDidSubmit(true)
        ctx.clearCart()
    }

    const cartModalContent = <React.Fragment>
        {cartItems}

        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{`$ ${ctx.totalAmount}`}</span>
        </div>

        {checkOut && <CheckOut onConfirm={submitOrderHander} onHideCart={onHideCart} />}

        {
            !checkOut && modalActions
        }
    </React.Fragment>

    const isSummittingModalContent = <p>Sending order data...</p>
 
    const didSubmitModalContent = <p>Success full sent order 😁😁</p>

    return <Modal onHideCart={onHideCart}>
        {!isSubmit && !didSubmit && cartModalContent}
        {isSubmit && isSummittingModalContent}
        {!isSubmit && didSubmit && didSubmitModalContent}
    </Modal>
}

export default Cart;