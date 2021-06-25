import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    
    switch(action.type) {
        case 'ADD': {
            const updatedTotalAmount = state.totalAmount + (action.payload.amount * action.payload.price);

            const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            const existingCartItem = state.items[existingCartItemIndex]

            let updatedItems;

            if (existingCartItem) {
                // note: if the item existed in the cart => update the total amount 
                const updatedItem = {
                    ...existingCartItem, 
                    amount: existingCartItem.amount + action.payload.amount
                }
                
                updatedItems = [...state.items]
                updatedItems[existingCartItemIndex] = updatedItem

            } else {
                // if the item added not existing in the cart => add it to cart
                updatedItems = [...state.items, action.payload]
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }

        case 'REMOVE': {
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
            const existingCartItem = state.items[existingCartItemIndex];

            const updatedTotalAmount = state.totalAmount - existingCartItem.price;

            let updatedItems;

            if (existingCartItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.id)

            } else {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount -1
                }

                updatedItems = [...state.items]
                updatedItems[existingCartItemIndex] = updatedItem
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
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
        dispatchCartAction({type: 'REMOVE', id: id})
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