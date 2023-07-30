import { useContext, useId } from 'react'
import './Cart.css'
import { AddToCartIcon, RemoveFromCartIcon, ClearCartIcon, CartIcon } from './Icons'
import { CartContext } from '../context/cart'

function CartItem ({ thumbnail, price, title, quantity, addToCart, removeFromCart }) {
  return (
    <li className='cart-item'>
      <div className='cart-item-image'>
        <img src={thumbnail} alt={title} />
      </div>
      <div className='cart-item-details'>
        <strong className='cart-item-title'>{title}</strong>
        <br />
        <span className='cart-item-price'>${price}</span>
        <div className='cart-item-quantity'>
          <button className='cart-item-quantity-remove' onClick={removeFromCart} style={{ hover: { backgroundC: 'red' } }}>
            <RemoveFromCartIcon />
          </button>
          <span className='cart-item-quantity-value'>{quantity}</span>
          <button className='cart-item-quantity-add' onClick={addToCart}>
            <AddToCartIcon />
          </button>
        </div>
      </div>
    </li>
  )
}

export function Cart () {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext)
  const cardCheckboxId = useId()
  return (
    <>
      <label
        className='cart-button'
        htmlFor={cardCheckboxId}
      >
        <CartIcon />
      </label>
      <input
        type='checkbox'
        id={cardCheckboxId}
        hidden
      />
      <aside className='cart'>
        <header className='cart-header'>
          <h2 className='cart-title'>Cart</h2>
        </header>
        <ul className='cart-items'>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              addToCart={() => addToCart(item)}
              removeFromCart={() => removeFromCart(item)}
            />
          ))}
        </ul>
        <button className='cart-clear' onClick={clearCart}>
          <ClearCartIcon />
        </button>
        <footer className='cart-footer'>
          <div className='cart-total'>
            <span className='cart-total-label'>Total </span>
            <span className='cart-total-value'> ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
          </div>
          <button className='cart-checkout'>Checkout</button>
        </footer>
      </aside>

    </>
  )
}
