import { Outlet } from 'react-router-dom'
import NavbarUser from '../components/user/NavbarUser'
import Footer from '../components/Footer'

export default function LoguedFunction() {
    return (
        <div className='flex flex-col min-h-screen'>
            <div className="border-b border-gray-200 rounded-b-xl">
                <NavbarUser />
            </div>
            <main className='flex w-full h-full justify-center items-center' >
                <Outlet />
            </main>

            <div className="border-t border-gray-200 rounded-t-xl">
                <Footer />
            </div>
        </div>
    )
}