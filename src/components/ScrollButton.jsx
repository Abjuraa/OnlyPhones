import Left from '../assets/arrowLeft.png'
import Right from '../assets/arrowRight.png'

function ScrollButton({ direction = 'left', onClick }) { 
    return (
        <button
            className='rounded-full p-2 bg-zinc-200 hover:bg-zinc-300 transition duration-300 ease-in-out'
            onClick={onClick}
        >
            <img className='' src={direction === 'left' ? Left : Right} alt="" width={20} height={20} />
        </button>
    )
}

export default ScrollButton