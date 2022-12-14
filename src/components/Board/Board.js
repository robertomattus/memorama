import MemoBlock from '../MemoBlock/MemoBlock';
import './Board.css';

const Board = ({animating, handleMemoClick, memoBlocks, restart}) => {

    //!
    // setTimeout(() => {
    //     console.log("Hola");
    // }, 1000);   

    // function saludos(){
    //     console.log("Uno")
    // }
    
    // setTimeout(saludos, 1000);
    //!

    return (
        <main className="board">
            {memoBlocks.map( (memoBlock, i) => {
                return <MemoBlock key={`${i}_${memoBlock.emoji}`} animating={animating} handleMemoClick={handleMemoClick} memoBlock={memoBlock} />
            })}

            <button onClick={restart} className='restart-btn'>
                <i className='bx bx-revision' ></i>
            </button>
        </main>
    );
}

export default Board;