import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../context/cart-context';
import { useContext, useState } from 'react';
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const [isCheckingOut, setIsCheckingOut] = useState(false);

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};
	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				>
					{item.name}
				</CartItem>
			))}
		</ul>
	);
	const hasItems = cartCtx.items.length > 0;

	const orderHandler = () => {
		setIsCheckingOut(true);
	};

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			'https://fir-demo-a3f3e-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
			{
				method: 'POST',
				body: JSON.stringify({ user: userData, order: cartCtx.items })
			}
		);

		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const cartModalContent = (
		<>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckingOut && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
			)}
			{!isCheckingOut && modalActions}
		</>
	);

	const isSubmittingModalContent = <p>Submitting your order request...</p>;
	const didSubmitModalContent = (
		<>
			<p>Your order has been placed!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</>
	);
	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
