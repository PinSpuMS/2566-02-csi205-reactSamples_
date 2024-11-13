import { useState, useEffect } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'

import { Home } from './pages/Home'
import { About } from './pages/About'
import { Products } from './pages/Products'
import { Carts } from './pages/Carts'
import { Todos } from './pages/Todos'
import { Login } from './pages/Login'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import 'bootstrap-icons/font/bootstrap-icons.min.css'

import { fetchProducts } from './data/products'

import './App.css'

function App() {
  const [token, setToken] = useState('')

  const [products, setProducts] = useState([])
  const [carts, setCarts] = useState([])

  useEffect(() => {
    setProducts(fetchProducts)
  }, [])

  if (token === '') return <Login setToken={setToken} />
  else
    return (
      <div>
        <Router>
          <Routes>
            <Route
              element={
                <Layout setToken={setToken} products={products} carts={carts} />
              }
            >
              <Route path='/' element={<Home />} />
              <Route path='/todos' element={<Todos />} />
              <Route path='/about' element={<About />} />
              <Route
                path='/products'
                element={
                  <Products
                    products={products}
                    setProducts={setProducts}
                    carts={carts}
                    setCarts={setCarts}
                  />
                }
              />
              <Route
                path='/carts'
                element={<Carts carts={carts} setCarts={setCarts} />}
              />
            </Route>
          </Routes>
        </Router>
      </div>
    )
}

export default App
