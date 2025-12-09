import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PublicRoute from './routes/PublicRoute'

import DefaultLayout from './layouts/DefaultLayout'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Find from './pages/Find'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/categorias' element={<Categories />}></Route>
            <Route path='/lugarcompra' element={<Find />}></Route>
            <Route path='/sobrenosotros' element={<AboutUs />}></Route>
            <Route path='/registrar' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Route>
        </ Routes>
      </ BrowserRouter>
    </div>
  )
}

export default App