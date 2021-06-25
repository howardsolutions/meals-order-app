import Input from '../../UI/Input.js';
import {useRef} from 'react';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
    const amountInputRef =  useRef();

    const onSubmitHandler = e => {
        e.preventDefault();

        const enteredAmount = +amountInputRef.current.value;

        if (enteredAmount < 1 || enteredAmount > 5) return

        props.onAddToCart(enteredAmount)
    }

    return <form onSubmit={onSubmitHandler} className={classes.form}>
        <Input
            ref={amountInputRef}
            label="Amount"
            input={{
                id: "amount",
                type: "number",
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
        <button>+ Add</button>
    </form>
}

export default MealItemForm;