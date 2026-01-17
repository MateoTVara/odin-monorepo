import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import styles from './ProductCartPrice.module.css'

const ProductCartPrice = ({product, deleteProduct}) => {
  return (
    <div className={styles.container}>
      <p>{product.title}</p>
      <div>
        <button onClick={deleteProduct}>
          <Icon 
            size={1}
            path={mdiDelete}
          />
        </button>
        <p>{(product.price * product.quantity).toFixed(2)} $</p>
      </div>
    </div>
  )
}

export default ProductCartPrice;