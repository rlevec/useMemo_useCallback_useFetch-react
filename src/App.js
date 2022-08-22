import React, { useState, useCallback, useMemo } from 'react'
import { useFetch } from './useFetch'

const url = 'http://localhost:5000/users'



const calculateMostExpensive = (data) => {
  return data.reduce((total, item) => {
    const price = item.fields.price
    if(price >= total) total = price
    return total
  },0)
}

const App = () => {
  const { dataSet } = useFetch(url)
  const [count, setCount] = useState(0)
  const [cart, setCart] = useState(0)

  const addToCart = useCallback(() => {       //callback changes when dependency changes, trigers re-render only when dependency changes
    setCart(cart + 1)
  }, [cart])

  const mostExpensive = useMemo(() => calculateMostExpensive(dataSet), [dataSet])   //memoizes value and only triggers re-render and function call aka calculation when dependency changes

  return (
    <>
      <h1>Count : {count}</h1>
      <button className='btn' onClick={() => setCount(count + 1)}>
        click me
      </button>
      <h1 style={{marginTop:"3rem"}}>cart: {cart}</h1>
      <h1>most expensive: ${mostExpensive}</h1>
      <BigList dataSet={dataSet} addToCart={addToCart}/>
    </>
  )
}

const BigList = React.memo(({ dataSet, addToCart }) => {   //memoize value if props don't change so the component doesn't trigger re-render
  return (
    <section className='products'>
      {dataSet.map((product) => {
        return <SingleProduct key={product.id} {...product} addToCart={addToCart}></SingleProduct>
      })}
    </section>
  )
})

const SingleProduct = ({ fields, addToCart }) => {
  let { name, price } = fields
  const image = fields.image[0].url

  return (
    <article className='product'>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <button onClick={addToCart}>add to cart</button>
    </article>
  )
}
export default App
