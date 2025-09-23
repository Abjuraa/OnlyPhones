import { useRef } from 'react'
import Card from '../components/Card'
import products from '../Const/Iphones'
import Left from '../assets/arrowLeft.png'
import Right from '../assets/arrowRight.png'


function Home() {

    const slideRef = useRef(null)

    const scroll = (direction) => {
        const cardWidth = 220 + 20

        if (!slideRef.current) return

        const { scrollLeft } = slideRef.current
        slideRef.current.scrollTo({
            left: direction === 'left'
                ? scrollLeft - cardWidth
                : scrollLeft + cardWidth,
            behavior: 'smooth'
        })
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-7xl font-bold py-15 px-20">iPhone</h1>

            <div className="relative overflow-hidden px-22">
                <div ref={slideRef} className='flex gap-5 overflow-x-auto'>
                    {products.map((p) => (
                        <div key={p.id} className='flex-shrink-0 snap-start'>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>


            <div className='flex justify-end items-center px-25 py-5 gap-5'>
                <button
                    className='rounded-full p-2 bg-zinc-200 hover:bg-zinc-300 transition duration-300 ease-in-out'
                    onClick={() => scroll('left')}
                >
                    <img className='' src={Left} alt="" width={20} height={20} />
                </button>

                <button
                    className='rounded-full p-2 bg-zinc-200 hover:bg-zinc-300 transition duration-300 ease-in-out'
                    onClick={() => scroll("right")}
                >
                    <img className='' src={Right} alt="" width={20} height={20} />
                </button>
            </div>
            <h1 className="text-7xl font-bold py-15 px-20">iPhone</h1>
        </div>


    )
}

export default Home