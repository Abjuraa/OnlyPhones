import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Layout() {
    return (
        <div className='flex flex-col'>
            <Navbar />
            <main className='flex flex-col' >
                <Outlet />
            </main>
        </div>
    )
}

export default Layout