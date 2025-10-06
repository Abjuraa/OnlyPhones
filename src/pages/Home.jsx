import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import products from '../Const_tmp/products'
import Slider from '../components/Slider'
import infoSlider from '../Const_tmp/sliderInfo'
import ScrollButton from '../components/ScrollButton'
import CardInfo from '../components/CardInfo'
import cardContent from '../Const_tmp/cardInfo'


function Home() {

    const cardRef = useRef(null)
    const slideRef = useRef(null)

    const scrollElement = (ref, itemWidth, direction) => {
        //Logica de scroll
        if (!ref.current) return

        const { scrollLeft } = ref.current
        ref.current.scrollTo({
            left: direction === 'left'
                ? scrollLeft - itemWidth
                : scrollLeft + itemWidth,
            behavior: 'smooth'
        })
    }

    const scrollCard = (direction) => {
        scrollElement(cardRef, 220, direction)
    }

    const scrollSlider = (direction) => {
        scrollElement(slideRef, 374, direction)
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-5xl font-bold py-15 px-20">iPhone</h1>

            <div className="relative overflow-hidden max-w-screen">
                <div ref={cardRef} className='flex gap-5 overflow-x-auto overflow-y-hidden ps-22 pe-22'>
                    {products.map((p) => (
                        <div key={p.id} className='flex-shrink-0 snap-start'>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>


            <div className='flex justify-end px-25 py-5 gap-5'>
                <ScrollButton direction='left' onClick={() => scrollCard('left')} ></ScrollButton>
                <ScrollButton direction='right' onClick={() => scrollCard('right')}></ScrollButton>
            </div>

            <h1 className="text-5xl font-bold py-10 px-20">Sobre los iPhone</h1>

            <div className='relative overflow-hidden'>
                <div ref={slideRef} className="flex gap-3 overflow-x-auto overflow-y-hidden py-2 ps-22 pe-22">
                    {infoSlider.map((c) => (
                        <div key={c.id} className="flex-shrink-0 snap-start">
                            <Slider content={c} />
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex justify-end items-center px-25 py-5 gap-5'>
                <ScrollButton direction='left' onClick={() => scrollSlider('left')} ></ScrollButton>
                <ScrollButton direction='right' onClick={() => scrollSlider('right')}></ScrollButton>
            </div>

            <h1 className="text-5xl font-bold py-10 px-20">Llevalo con tu iPhone</h1>

            <div className="relative">
                <div className="flex flex-row justify-center gap-10 pb-20">
                    {cardContent.map((c) => (
                        <div key={c.id} className="">
                            <CardInfo content={c}></CardInfo>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home