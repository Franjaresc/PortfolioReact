export const initialCartState = {
  cart: JSON.parse(window.localStorage.getItem('cart')) || []
}

export const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state.cart))
}

export const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTIONS.ADD_TO_CART]: (state, action) => {
    const productInCartIndex = state.cart.findIndex(
      (item) => item.id === action.payload.id
    )
    if (productInCartIndex >= 0) {
      /* 👀 una forma sería usando structuredClone
            const cartCopy = structuredClone(state.cart)
            cartCopy[productInCartIndex].quantity += 1
            return {
                ...state,
                cart: cartCopy
            }
            */
      /* 👀 otra forma sería usando map
            const cartCopy = state.cart.map((item, index) => {
                if (index === productInCartIndex) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item
            })
            */
      /* 👀 otra forma sería usando slice y spread */
      const cartCopy = [
        ...state.cart.slice(0, productInCartIndex),
        {
          ...state.cart[productInCartIndex],
          quantity: state.cart[productInCartIndex].quantity + 1
        },
        ...state.cart.slice(productInCartIndex + 1)
      ]
      updateLocalStorage({
        ...state,
        cart: cartCopy
      })

      return {
        ...state,
        cart: cartCopy
      }
    }
    const cartCopy = [
      ...state.cart,
      {
        ...action.payload,
        quantity: 1
      }
    ]
    updateLocalStorage({
      ...state,
      cart: cartCopy
    })

    return {
      ...state,
      cart: cartCopy
    }
  },
  [CART_ACTIONS.REMOVE_FROM_CART]: (state, action) => {
    const productInCartIndex = state.cart.findIndex(
      (item) => item.id === action.payload.id
    )
    if (productInCartIndex >= 0) {
      const quantity = state.cart[productInCartIndex].quantity
      if (quantity > 1) {
        const cartCopy = [
          ...state.cart.slice(0, productInCartIndex),
          {
            ...state.cart[productInCartIndex],
            quantity: state.cart[productInCartIndex].quantity - 1
          },
          ...state.cart.slice(productInCartIndex + 1)
        ]
        updateLocalStorage({
          ...state,
          cart: cartCopy
        })
        return {
          ...state,
          cart: cartCopy
        }
      }
      const cartCopy = [
        ...state.cart.slice(0, productInCartIndex),
        ...state.cart.slice(productInCartIndex + 1)
      ]
      updateLocalStorage({
        ...state,
        cart: cartCopy
      })
      return {
        ...state,
        cart: cartCopy
      }
    }
    return state
  },
  [CART_ACTIONS.CLEAR_CART]: (state, action) => {
    updateLocalStorage({
      ...state,
      cart: []
    })
    return {
      ...state,
      cart: []
    }
  }
}

export const cartReducer = (state, action) => {
  const updateState = UPDATE_STATE_BY_ACTION[action.type]
  return updateState ? updateState(state, action) : state
}
