import { useRef, useEffect } from 'react'
import Card from '../../components/Card'
import Slider from '../../components/Slider'
import infoSlider from '../../const/sliderInfo'
import ScrollButton from '../../components/ScrollButton'
import CardInfo from '../../components/CardInfo'
import cardContent from '../../const/cardInfo'
import { useProducts } from '../../hooks/useProduct'
import { useNavigate } from 'react-router-dom'

function Home() {
    const { latestProduct, getLatestProducts } = useProducts();
    const cardRef = useRef(null)
    const slideRef = useRef(null)
    const navigate = useNavigate();

    useEffect(() => {
        getLatestProducts();
    }, [])

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
            <h1 className="text-xl md:text-5xl font-bold py-15 md:px-20 px-5">Ultimos productos</h1>
            {latestProduct?.length === 0
                ? <div className="flex justify-center items-center md:text-2xl text-xl font-bold text-gray-400 ">
                    <h1>No hay productos disponibles.</h1>
                </div>
                : <div className="">
                    <div className="relative overflow-hidden max-w-screen">
                        <div ref={cardRef} className='flex gap-5 overflow-x-auto overflow-y-hidden md:ps-22 ps-5 pe-22'>
                            {latestProduct?.map((p) => (
                                <div
                                    key={p.id}
                                    onClick={() => navigate(`/privada/producto/${p.idProduct}`)}
                                    className='flex-shrink-0 snap-start'
                                >
                                    <Card product={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-end md:px-25 px-5 py-5 gap-5'>
                        <ScrollButton direction='left' onClick={() => scrollCard('left')} ></ScrollButton>
                        <ScrollButton direction='right' onClick={() => scrollCard('right')}></ScrollButton>
                    </div>
                </div>
            }

            <h1 className="md:text-5xl text-xl font-bold py-10 md:px-20 px-5">Sobre los iPhone</h1>

            <div className='relative overflow-hidden'>
                <div ref={slideRef} className="flex gap-3 overflow-x-auto overflow-y-hidden py-2 md:ps-22 md:pe-22 ps-5 pe-10">
                    {infoSlider.map((c) => (
                        <div key={c.id} className="flex-shrink-0 snap-start">
                            <Slider content={c} />
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex justify-end items-center md:px-25 px-10 py-5 gap-5'>
                <ScrollButton direction='left' onClick={() => scrollSlider('left')} ></ScrollButton>
                <ScrollButton direction='right' onClick={() => scrollSlider('right')}></ScrollButton>
            </div>

            <h1 className="md:text-5xl text-xl font-bold py-10 md:px-20 px-5">Llevalo con tu iPhone</h1>

            <div className="relative">
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 pb-20">
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