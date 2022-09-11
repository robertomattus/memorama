import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
const emojiList = [...'💣🧤🎩🌮🎱🥋🍕🦖'];

const App = () => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect( () => {
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffledMemoBlocks(shuffledEmojiList.map( (emoji, i) => ({ index: i, emoji, flipped: false}) ));
  }, []);

  const shuffleArray = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]; //Shuffle two times, so we can have a par
    }
    return a;
  }

  const restartGame = () => {
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffledMemoBlocks(shuffledEmojiList.map( (emoji, i) => ({ index: i, emoji, flipped: false}) ));
  }

  const handleMemoClick = memoBlock => {

    const flippedMemoBlock = { ...memoBlock, flipped: true }; //Clicked block
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks]; //Block list copy
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock); //Replace selected block with flipped one
    setShuffledMemoBlocks(shuffledMemoBlocksCopy); //Set new block list, with the block flipped

    if(selectedMemoBlock === null) {
      setselectedMemoBlock(memoBlock); // Just selected (single block)
    } else if(selectedMemoBlock.emoji === memoBlock.emoji) {
      setselectedMemoBlock(null); // Not a apar selected
    } else {
      setAnimating(true); // we make a par, so they blocked
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setselectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }

  }

  //! ADD A COUNTER LIMIT TO WIN
  //! IF RAN OUT OF TIME, ADD MESSAGE "YOU LOSE"
  //! AND THEN RESTART THE GAME
  //! IF YOU WIN, ADD A MESSAGE "YOU HAVE WON!"

  return (
    <Board 
      memoBlocks={shuffledMemoBlocks} 
      animating={animating}  
      handleMemoClick={handleMemoClick} 
      restart={restartGame}
    />
  );
}

export default App;