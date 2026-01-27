import { icons } from '../assets/icons/index.js';

function ScrollButton({ direction = 'left', onClick }) {

    const Icon = direction === 'left' ? icons.ArrowLeftIcon : icons.ArrowRightIcon;
    return (
        <button
            className='rounded-full p-2 bg-zinc-200 hover:bg-zinc-300 transition duration-300 ease-in-out'
            onClick={onClick}
        >
            <Icon />
        </button>
    )
}

export default ScrollButton