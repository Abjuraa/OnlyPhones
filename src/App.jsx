import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PublicRoute from './routes/PublicRoute'
import RutaPrivada from './routes/PrivateRoute'

import DefaultLayout from './layouts/DefaultLayout'
import LoguedLayout from './layouts/LoguedLayout'


import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Find from './pages/Find'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'
import Login from './pages/Login'

import RutaPrivadaPage from './pages/RutaPrivada'




function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            { /* Rutas publicas */}
            <Route element={<PublicRoute />}>
              <Route element={<DefaultLayout />}>
                <Route path='/' element={<Home />}></Route>
                <Route path='/categorias' element={<Categories />}></Route>
                <Route path='/lugarcompra' element={<Find />}></Route>
                <Route path='/sobrenosotros' element={<AboutUs />}></Route>
                <Route path='/registrar' element={<Register />}></Route>
                <Route path='/login' element={<Login />}></Route>
              </Route>
            </Route>

            <Route element={<RutaPrivada />}>
              <Route element={<LoguedLayout />}>
                <Route path='/privada/home' element={<Home />}></Route>
                <Route path='/privada/categorias' element={<Categories />}></Route>
                <Route path='/privada/inicio' element={<RutaPrivadaPage />}></Route>
              </Route>
            </Route>

          </ Routes>
        </ BrowserRouter>
      </AuthProvider>

    </div>
  )
}

export default App