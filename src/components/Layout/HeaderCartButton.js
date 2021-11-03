import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../context/cart-context';

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);
	const [btnBump, setBtnBump] = useState(false);
	const { items } = cartCtx;
	const numberOfItemsInCart = items.reduce((curr, item) => {
		return curr + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${btnBump ? classes.bump : ''}`;
	useEffect(() => {
		if (items.length === 0) return;

		setBtnBump(true);

		const timer = setTimeout(() => {
			setBtnBump(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);
	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfItemsInCart}</span>
		</button>
	);
};

export default HeaderCartButton;
