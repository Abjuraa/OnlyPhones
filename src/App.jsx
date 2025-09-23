import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './layouts/Layout'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Find from './pages/Find'
import AboutUs from './pages/AboutUs'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/categorias' element={<Categories />}></Route>
            <Route path='/lugarcompra' element={<Find />}></Route>
            <Route path='/sobrenosotros' element={<AboutUs />}></Route>
          </Route>

        </ Routes>
      </ BrowserRouter>
    </div>
  )

}

export default App