import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Homepage.module.css'

const Homepage = () => {

  const imagesSizes = [
    '750x250', '250x500', '250x500', '250x250', '250x500',
    '250x500', '250x250', '250x500', '500x250', '750x250'
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>Dolor sit amet consectetur</div>
        <p>Magni corrupti, doloribus, repudiandae nulla libero dolorum</p>
        <Link to='/shop'>See Products</Link>
      </div>
      <div className={styles.imageGrid}>
        {imagesSizes.map(imageSize => <div><img src={`https://dummyjson.com/image/${imageSize}`}/></div>)}
      </div>
    </div>
  )
}

export default Homepage;