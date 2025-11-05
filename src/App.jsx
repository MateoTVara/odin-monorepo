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
    </>
  )
}

export default App;