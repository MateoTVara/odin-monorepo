import { useOutletContext } from 'react-router-dom';
import styles from './Cart.module.css'
import { updateQty } from '../../modules';
import ProductCartPrice from '../../components/ProductCartPrice/ProductCartPrice';
import ProductCartDetail from '../../components/ProductCartDetail/ProductCartDetail';

const Cart = () => {
  const [products, setProducts] = useOutletContext();

  /**
   * Handles changes to the quantity input field.
   * @param {Event} e - The change event.
   * @param {number} i - The index of the product being updated.
   */
  function onChange(e, i) {
    setProducts(products.map((p, idx) => {
      const value = Number(e.target.value);
      if (value === NaN) return p 
      if (value < 1) return {...p, quantity: 1}
      
      return idx === i ?
        {...p, quantity: value} :
        p
    }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.itemsContainer}>
        {products.map((product, i) => 
          <ProductCartDetail 
            key={product.id} 
            product={product}
            onChange={(e) => onChange(e, i)}
            increaseQty={() => setProducts(updateQty(i, products, {op: '+'}))}
            decreaseQty={() => setProducts(updateQty(i, products, {op: '-'}))}
          />
        )}
      </div>
      <div className={styles.pricing}>
        {products.map(product => <ProductCartPrice key={product.id} product={product}/>)}
        <p>Total:  {products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toFixed(2)} $</p>
      </div>
    </div>
  )
}

export default Cart;