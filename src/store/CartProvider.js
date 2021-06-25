import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case 'ADD': {
            const updatedItems = [...state.items, action.payload]

            return {
                items: updatedItems,
                totalAmount: 0
            }
        }

        default: 
            return defaultState
    }
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

    const addToCart = item => {
        dispatchCartAction({type: 'ADD', payload: item})
    }

    const removeFromCart = id => {
        
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addToCart,
        removeItem: removeFromCart
    }

    return <CartContext.Provider value={cartContext}>
        {props.children }
    </CartContext.Provider>
}

export default CartProvider