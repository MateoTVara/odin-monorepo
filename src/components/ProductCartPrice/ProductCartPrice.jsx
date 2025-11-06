import styles from './ProductCartPrice.module.css'

const ProductCartPrice = ({product}) => {
  return (
    <div className={styles.container}>
      <p>{product.title}</p>
      <p>{(product.price * product.quantity).toFixed(2)} $</p>
    </div>
  )
}

export default ProductCartPrice;