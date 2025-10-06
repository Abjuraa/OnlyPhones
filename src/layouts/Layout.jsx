import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Layout() {
    return (
        <div className='flex flex-col'>
            <div className="border-b border-gray-200 rounded-b-xl">
                <Navbar />
            </div>
            <main className='flex' >
                <Outlet />
            </main>

            <div className="border-t border-gray-200 rounded-t-xl">
                <Footer />
            </div>
        </div>
    )
}

export default Layout