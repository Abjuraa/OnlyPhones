import { useRef } from 'react'
import Card from '../components/Card'
import products from '../Const/Iphones'
import ScrollButton from '../components/ScrollButton'



function Home() {

    const slideRef = useRef(null)

    const scrollCard = (direction) => {

        //Ancho y gap de cada tarjeta a scrollear
        const cardWidth = 220 + 20

        //Logica de scroll
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
                <ScrollButton direction='left' onClick={() => scrollCard('left')} ></ScrollButton>
                <ScrollButton direction='right' onClick={() => scrollCard('right')}></ScrollButton>
            </div>
            <h1 className="text-7xl font-bold py-15 px-20">iPhone</h1>
        </div>


    )
}

export default Home