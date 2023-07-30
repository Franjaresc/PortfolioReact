import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import { useCart } from '../hooks/useCarts'

export function Products ({ products }) {
  const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map(product => {
          const isProductInCart = checkProductInCart(product)

          return (
            <li key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
              />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div className='actions'>
                {
                  isProductInCart &&
                    <button onClick={() => removeFromCart(product)} className='remove-from-cart'>
                      <RemoveFromCartIcon />
                    </button>
                }
                <button
                  onClick={() => {
                    addToCart(product)
                  }}
                  className='add-to-cart'
                >
                  <AddToCartIcon />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
