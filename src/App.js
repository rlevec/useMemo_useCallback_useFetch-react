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

  const addToCart = useCallback(() => {
    setCart(cart + 1)
  }, [cart])

  const mostExpensive = useMemo(() => calculateMostExpensive(dataSet), [dataSet])

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

const BigList = React.memo(({ dataSet, addToCart }) => {
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
