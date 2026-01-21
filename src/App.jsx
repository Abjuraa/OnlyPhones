import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Rutas privadas
import PublicRoute from './routes/PublicRoute'
import RutaPrivada from './routes/PrivateRoute'
import AdminRoute from './routes/AdminRoute'

// Layout
import DefaultLayout from './layouts/DefaultLayout'

// Rutas publicas
import { AuthProvider } from './context/AuthContext'
import Home from './pages/user/Home'
import Categories from './pages/user/Categories'
import Find from './pages/user/Find'
import AboutUs from './pages/user/AboutUs'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Product from './pages/user/Product'

//Ruta Admin
import ManageProducts from './pages/admin/ManageProducts'

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
                <Route path='/lugarcompra' element={<Find />}></Route>
                <Route path='/sobrenosotros' element={<AboutUs />}></Route>
                <Route path='/registrar' element={<Register />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/producto/:id' element={<Product />}></Route>
              </Route>
            </Route>

            <Route element={<RutaPrivada />}>
              <Route element={<DefaultLayout />}>
                <Route path='/privada/home' element={<Home />}></Route>
                <Route path='/privada/categorias' element={<Categories />}></Route>
                <Route path='/privada/lugarcompra' element={<Find />}></Route>
                <Route path='/privada/producto/:id' element={<Product />}></Route>
              </Route>
            </Route>

            <Route element={<AdminRoute />}>
              <Route element={<DefaultLayout />}>
                <Route path='/admin/gestionarproductos' element={<ManageProducts />}> </ Route>
              </ Route>
            </Route>

          </ Routes>
        </ BrowserRouter>
      </AuthProvider>

    </div>
  )
}

export default App