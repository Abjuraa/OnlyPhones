import { Link } from 'react-router-dom'
import WhatsApp from '../assets/icons/WhatsApp'
import Instagram from '../assets/icons/Instagram'
import Facebook from '../assets/icons/Facebook'

const FooterItems = [
    { label: 'Inicio', link: "/" },
    { label: 'Categorias', link: "/" },
    { label: 'Donde comprar', link: "/" },
    { label: 'Sobre nosotros', link: "/" },
]

const SocialItems = [
    { icon: WhatsApp, link: "/" },
    { icon: Instagram, link: "/" },
    { icon: Facebook, link: "/" },
]


const Items = ({ title }) => {
    return (
        <ul className='flex flex-col gap-2'>
            <li className="font-bold text-zinc-800">{title}</li>
            {FooterItems.map((c) => <li key={c.label} className="text-sm text-zinc-500"><><Link to={c.link}>{c.label}</Link></></li>)}
        </ul>
    )
}

const SocialNetworks = ({ title }) => {
    return (
        <ul className="flex flex-col gap-5">
            <li><p className="font-bold text-zinc-800">{title}</p></li>
            <div className="flex flex-row gap-5">
                {SocialItems.map(({ icon: Icon, link }, c) => (
                    <li key={c} className="text-sm text-zinc-500">
                        <Link to={link}><Icon /></Link>
                    </li>
                ))}
            </div>
        </ul>
    )
}


function Footer() {
    return (
        <div className="flex flex-col bg-zinc-200 w-screen p-15">
            <div className='flex flex-row justify-center gap-20'>
                <Items title={'Informacion'} content={['Home', 'Categorias', 'Donde comprar', 'Sobre nosotros']}></Items>
                <Items title={'Informacion'} content={['Home', 'Categorias', 'Donde comprar', 'Sobre nosotros']}></Items>
                <Items title={'Informacion'} content={['Home', 'Categorias', 'Donde comprar', 'Sobre nosotros']}></Items>
                <SocialNetworks title={'Redes sociales'}></SocialNetworks>
            </div>
            <div className='flex flex-row justify-center pt-10'>
                <p className="text-sm text-zinc-500 text-center mt-10">Copyright © 2023 OnlyPhones. Todos los derechos reservados.</p>
            </div>

        </div>
    )
}

export default Footer