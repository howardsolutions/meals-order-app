import Header from "./components/Layouts/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { useState } from "react";


const App = () => {
    const [showCart, setShowCart] = useState(false);
    
    const showCartHandler = () => {
        setShowCart(true)
    }

    const hideCartHandler = () => {
        setShowCart(false)
    }

    return <CartProvider>
        { 
            showCart && <Cart onHideCart={hideCartHandler} /> 
        }

        {/* Header */}
        <Header onShowCart={showCartHandler} />

        {/* main */}
        <main>
            <Meals />
        </main>
    </CartProvider>
}

export default App;