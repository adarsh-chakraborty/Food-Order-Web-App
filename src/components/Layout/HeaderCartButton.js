import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext } from 'react';
import CartContext from '../../context/cart-context';

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);

	const numberOfItemsInCart = cartCtx.items.reduce((curr, item) => {
		return curr + item.amount;
	}, 0);

	return (
		<button className={classes.button} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfItemsInCart}</span>
		</button>
	);
};

export default HeaderCartButton;
