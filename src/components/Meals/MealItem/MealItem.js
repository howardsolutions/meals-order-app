import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm.js';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

const MealItem = props => {
    const ctx = useContext(CartContext);

    const price = `$ ${props.price}`

    const addToCart = amount => {
        ctx.addItem({
            id: props.id,
            price: props.price, 
            amount: amount,
            description: props.description
        })
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>
                    {props.description}
                </div>
                <div className={classes.price}>{price}</div>
            </div>

            <div>
                <MealItemForm onAddToCart={addToCart} />
            </div>
        </li>
    )
}

export default MealItem;