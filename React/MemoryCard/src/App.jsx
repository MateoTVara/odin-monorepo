import { useState, useEffect } from 'react'
import './App.css'
import Card from './card/Card'

function App() {
  const [bestScore, setBestScore] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [clickedCharacters, setClickedCharacters] = useState([]);
  const [currentFive, setCurrentFive] = useState([]);

  const characterIds = [
    5105, 110355, 5578, 58443, 2765,
    84871, 390, 141387, 2450, 174463,
    209029, 154023, 5756, 1995, 28522,
    7317, 3170, 477, 170765, 18350
  ];

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
          );
          allResults = [...allResults, ...results];
        } catch (error) {
          console.error("Error fetching characters", error);
        }
        if (i + batchSize < characterIds.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      setCharacters(allResults)
    }
    fetchCharactersInBatches()
  }, [])

  useEffect(() => {
    if (characters.length > 0) {
      setCurrentFive(getFiveRandom());
    }
  }, [characters, clickedCharacters]);

  function getFiveRandom() {

    const clickedPool = characters.filter(c => clickedCharacters.includes(c.id));
    const unclickedPool = characters.filter(c => !clickedCharacters.includes(c.id));

    const shuffle = arr => arr.sort(() => Math.random() - 0.5);
    const shuffledClicked = shuffle([...clickedPool]);
    const shuffledUnclicked = shuffle([...unclickedPool]);

    const arr = [];

    if (shuffledUnclicked.length > 0) {
      arr.push(shuffledUnclicked.pop());
    }

    while (arr.length < 5 && shuffledClicked.length > 0) {
      arr.push(shuffledClicked.pop());
    }

    while (arr.length < 5 && shuffledUnclicked.length > 0) {
      arr.push(shuffledUnclicked.pop());
    }

    return shuffle(arr);
  }

  function handleClick(e) {
    const id = Number(e.currentTarget.id);
    console.log(id);
    if(clickedCharacters.includes(id)) {
      setClickedCharacters([]);
      return;
    }
    setClickedCharacters([...clickedCharacters, id])
  }

  useEffect(() => {
    if(clickedCharacters.length > bestScore) {setBestScore(clickedCharacters.length)}
  }, [clickedCharacters.length])

  return (
    <>
      <header className='flex flex-row text-slate-300 px-5 py-3 justify-between items-center'>
        <h1 className='text-3xl'>Animanga Memory Card Game</h1>
        <div>
          <p className='font-bold'>{`Score: ${clickedCharacters.length}`}</p>
          <p className='font-bold'>{`Best Score: ${bestScore}`}</p>
        </div>
      </header>
      <main className='text-slate-500 grid grid-cols-5 auto-rows-auto gap-4 px-6 py-3 items-center relative'>
        {
          characters.length === 0 ? <p className='text-4xl absolute left-1/2 -translate-x-1/2'>Loading...</p> : 
          currentFive.map(character => (
            <Card key={character.id} id={character.id} name={character.name} image={character.image} onClick={handleClick}/>
          ))
        }

        {
          clickedCharacters.length === 20 && 
          <div
            className='absolute bg-black/80 w-full h-full font-bold text-6xl content-center text-center text-slate-300 cursor-pointer'
            onClick={() => {
              setClickedCharacters([]);
            }}
          >
            YOU WIN!
          </div>
        }
      </main>
      <div
        className='bg-[#091624] absolute w-full h-full content-center text-slate-300 text-center text-balance text-6xl md:hidden sm:block'
      >
        Please, for the best experience, rotate your device.
      </div>
    </>
  )
}

export default App
