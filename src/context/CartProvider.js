import CartContext from './cart-context';
import { useReducer } from 'react';

const defaultCartState = {
	items: [],
	totalAmount: 0
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD-TO-CART') {
		const newTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		const existingItemCartIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingItem = state.items[existingItemCartIndex];

		let updatedItems;

		if (existingItem) {
			// Item found in cart, just change the amount.
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount + action.item.amount
			};

			// Example, already had 2 sushi, added +2 more sushis
			updatedItems = [...state.items]; // new array
			updatedItems[existingItemCartIndex] = updatedItem; // overwrite the updated Item
		} else {
			updatedItems = state.items.concat(action.item);
			// concat creates new array and adds the received item in action.
		}

		return {
			items: updatedItems,
			totalAmount: newTotalAmount
		};
	}

	if (action.type === 'REMOVE-FROM-CART') {
		const existingItemCartIndex = state.items.findIndex(
			(item) => item.id === action.id
		);

		const existingItem = state.items[existingItemCartIndex];
		const updatedTotal = state.totalAmount - existingItem.price;

		let updatedItems;
		if (existingItem.amount === 1) {
			// Remove the item
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
			updatedItems = [...state.items];
			updatedItems[existingItemCartIndex] = updatedItem;
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotal
		};
	}

	if (action.type === 'CLEAR') {
		return defaultCartState;
	}

	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: 'ADD-TO-CART', item });
	};
	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: 'REMOVE-FROM-CART', id });
	};

	const clearCartHandler = () => {
		dispatchCartAction({ type: 'CLEAR' });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearCart: clearCartHandler
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
