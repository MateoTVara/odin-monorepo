import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import styles from './App.module.css'
import './index.css'

function App() {

  return (
    <>
      <header className={styles.header}>
        <Link to="shop">Shop</Link>
        <Link to="/">Homepage</Link>
        <Link to="cart">Cart</Link>
      </header>
      
      <main className={styles.main}>
        <Outlet/>
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