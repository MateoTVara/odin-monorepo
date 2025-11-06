import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import styles from './App.module.css'
import './index.css'
import { useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart"))
    if (!data) return
    if (data.length > 0) {
      setProducts(data)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products))
  }, [products])

  return (
    <>
      <header className={styles.header}>
        <Link to="shop">Shop</Link>
        <Link to="/">Homepage</Link>
        <Link to="cart">Cart: {products.length === 0 ? 0 : products.reduce((acc, curr) => acc + curr.quantity, 0)}</Link>
      </header>
      
      <main className={styles.main}>
        <Outlet context={[products, setProducts]}/>
      </main>

      <footer className={styles.footer}>
        <div>
          <div>
            <h4>Shop!</h4>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </div>
          <div>
            <h4>Shortcuts</h4>
            <Link to='/shop'>Products</Link>
            <Link to=''>Contact</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Email: shop@example.com</p>
            <p>Tel: +1 212 555 1234</p>
            <p>Address: </p>
          </div>
          <div>
            <h4>Follow Us!</h4>
            <div>

            </div>
          </div>
        </div>
        <div>
          Shop! - All rights reserved © 2025
        </div>
      </footer>
    </>
  )
}

export default App;