import { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import styles from './Shop.module.css'
import { mdiPlus } from '@mdi/js';
import { mdiMinus } from '@mdi/js';
import { useOutletContext } from 'react-router-dom';

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

  const decreaseQty = (i) => {
    setData(data.map((d, idx) => {
      return idx === i ?
        d.quantity <= 1 ?
          d : {...d, quantity: d.quantity - 1} :
        d
    }))
  }

  const increaseQty = (i) => {
    setData(data.map((d, idx) => {
      return idx === i ? {...d, quantity: d.quantity + 1} : d
    }))
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
          <div key={i} className={styles.productCard}>
            <img src={d.image} alt={d.title} />
            <div className={styles.info}>
              <p>{d.title}</p>
              <p>{`$ ${d.price}`}</p>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => decreaseQty(i)}
              >
                <Icon
                  path={mdiMinus}
                  size={1}
                />
              </button>
              <input
                type="number"
                value={d.quantity}
                onChange={(e) => {setData(data.map((d, idx) => {
                  if (idx !== i) return d;

                  return {
                    ...d,
                    quantity: e.target.value,
                  }
                }))}}
              />
              <button
                onClick={() => increaseQty(i)}
              >
                <Icon
                  path={mdiPlus}
                  size={1}
                />
              </button>
            </div>
            <button
              onClick={() => {
                setProducts(prevProducts => {
                  if (prevProducts.find(prevProduct => prevProduct.id === d.id)) {
                    return prevProducts.map(prevProduct => 
                      prevProduct.id === d.id ? 
                        {
                          ...prevProduct,
                          quantity: prevProduct.quantity + d.quantity
                        } :
                        prevProduct
                    )
                  }

                  return [
                    ...prevProducts,
                    {...d}
                  ]
                })
              }}
            >
              Add to Cart
            </button>
          </div>
        )
      }
    </div>
  )
}

export default Shop;