import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function DefaultLayout() {
    return (
        <div className='flex flex-col min-h-screen'>
            <div className="border-b border-gray-200 rounded-b-xl">
                <Navbar />
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

export default DefaultLayout