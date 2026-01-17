import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { mdiLoading, mdiPlus, mdiMinus } from '@mdi/js';
import Icon from '@mdi/react';
import styles from './Shop.module.css'
import { updateQty } from '../../modules';
import ProductShopCard from '../../components/ProductShopCard/ProductShopCard';

const Shop = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useOutletContext()

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("https://fakestoreapi.com/products")

        if (!response.ok) {throw new Error("Error fetching data")}

        const data = await response.json()

        setData(data.map((d, i) => ({
          id: i,
          ...d,
          quantity: 1,
        })))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  /**
   * Handles changes to the quantity input field.
   * @param {Event} e - The change event.
   * @param {number} i - The index of the product being updated. 
   */
  const onChange = (e, i) => {
    setData(data.map((d, idx) => {
      if (idx !== i) return d

      const value = Number(e.target.value)
      if (value === NaN) return d
      if (value < 1) return {...d, quantity: 1}

      return {...d,quantity: value,}
    }))
  }

  /**
   * Handles adding a product to the cart.
   * @param {Object} d - The product data.
   */
  const onClickAddToCart = (d) => {
    setProducts(prevProducts => {
      if (prevProducts.find(prevProduct => prevProduct.id === d.id)) {
        return prevProducts.map(prevProduct => 
          prevProduct.id === d.id ? 
            {...prevProduct, quantity: prevProduct.quantity + d.quantity} :
            prevProduct
        )
      }

      return [...prevProducts, {...d}]
    })
  }

  return (
    <div className={isLoading ? styles.loading : styles.main}>
      {
        isLoading ?
        <Icon
          className={styles.loadingIcon}
          path={mdiLoading}
          size={'30dvw'}
          spin
        /> :
        data.map((d, i) =>
          <ProductShopCard
            d={d}
            onChange={(e) => onChange(e, i)}
            onClickAddToCart={onClickAddToCart}
            onClickDecrease={() => setData(updateQty(i, data, {op: '-'}))}
            onClickIncrease={() => setData(updateQty(i, data, {op: '+'}))}
          />
        )
      }
    </div>
  )
}

export default Shop;