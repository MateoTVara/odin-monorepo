import { useState, useEffect } from 'react'
import './App.css'
import Card from './card/Card'

function App() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(score)
  const [characters, setCharacters] = useState([])

  const characterIds = [
    5105, 110355, 5578, 58443, 2765,
    84871, 390, 141387, 2450, 174463,
    209029, 154023, 5756, 1995, 28522,
    7317, 3170, 477, 170765, 18350
  ]

  useEffect(() => {
    async function fetchCharactersInBatches() {
      const batchSize = 5
      let allResults = []
      for (let i = 0; i < characterIds.length; i += batchSize) {
        const batch = characterIds.slice(i, i + batchSize)
        try {
          const results = await Promise.all(
            batch.map(async id => {
              const response = await fetch(`https://api.jikan.moe/v4/characters/${id}`)
              const character = await response.json()
              return {
                id,
                name: character.data.name,
                image: character.data.images.webp.image_url,
              }
            })
          )
          allResults = [...allResults, ...results]
        } catch (error) {
          console.error("Error fetching characters", error)
        }
        if (i + batchSize < characterIds.length) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }
      setCharacters(allResults)
    }
    fetchCharactersInBatches()
  }, [])

  return (
    <>
      <header className='flex flex-row text-slate-300 px-4 py-2 justify-between'>
        <h1 className='text-3xl'>Animanga Memory Card Game</h1>
        <div>
          <p className='font-bold'>{`Score: ${score}`}</p>
          <p className='font-bold'>{`Best Score: ${bestScore}`}</p>
        </div>
      </header>
      <main className='text-slate-500 grid grid-cols-5 auto-rows-auto gap-4 px-6 py-3 items-center relative'>
        {
          characters.length === 0 ? <p className='text-4xl absolute left-1/2 -translate-x-1/2'>Loading...</p> : 
          characters.map(character => (
            <Card key={character.id} name={character.name} image={character.image} />
          ))
        }
      </main>
    </>
  )
}

export default App
