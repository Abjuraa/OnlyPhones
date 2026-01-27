import { Link } from 'react-router-dom'
import { icons } from '../assets/icons/index.js';

const FooterItems = [
    { label: 'Inicio', link: "/" },
    { label: 'Categorias', link: "/categorias" },
    { label: 'Donde comprar', link: "/" },
    { label: 'Sobre nosotros', link: "/" },
]

const SocialItems = [
    { icon: icons.WhatsApp, link: "/" },
    { icon: icons.Instagram, link: "https://www.instagram.com/onlyphones.co/" },
    { icon: icons.Facebook, link: "/" },
]


const Items = ({ title }) => {
    return (
        <ul className='flex flex-col gap-2'>
            <li className="font-bold text-zinc-800 pb-3">{title}</li>
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
                        <Link to={link} target="_blank"><Icon /></Link>
                    </li>
                ))}
            </div>
        </ul>
    )
}


function Footer() {
    return (
        <div className="flex flex-col bg-slate-100 w-screen py-8">
            <div className='flex flex-row justify-center gap-20'>
                <Items title={'Informacion'} ></Items>
                <Items title={'Informacion'} ></Items>
                <Items title={'Informacion'} ></Items>
                <SocialNetworks title={'Redes sociales'}></SocialNetworks>
            </div>
            <div className='flex flex-row justify-center pt-10'>
                <p className="text-sm text-zinc-500 text-center mt-10">Copyright © 2023 OnlyPhones. Todos los derechos reservados.</p>
            </div>

        </div>
    )
}

export default Footer