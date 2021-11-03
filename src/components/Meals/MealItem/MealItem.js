import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../context/cart-context';
import { useContext } from 'react';

const MealItem = (props) => {
	const cartCtx = useContext(CartContext);
	const price = `$${props.price.toFixed(2)}`;
	const addToCart = (amt) => {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
			amount: amt,
			price: props.price
		});
	};
	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm id={props.id} onAddToCart={addToCart} />
			</div>
		</li>
	);
};

export default MealItem;
