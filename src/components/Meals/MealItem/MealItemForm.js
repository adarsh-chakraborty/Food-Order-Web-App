import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
	const [amountIsValid, setAmountIsValid] = useState(true);

	const amtInputRef = useRef();
	const submitHandler = (e) => {
		e.preventDefault();

		const enteredAmt = amtInputRef.current.value;
		if (enteredAmt.trim().length === 0 || +enteredAmt < 1 || +enteredAmt > 5) {
			setAmountIsValid(false);
			return;
		}

		props.onAddToCart(+enteredAmt);
	};
	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				ref={amtInputRef}
				label="Amount"
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1'
				}}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
		</form>
	);
};

export default MealItemForm;
