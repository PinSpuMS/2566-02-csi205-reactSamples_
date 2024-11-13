import React from 'react'
import { Outlet } from 'react-router'

import { Header } from './Header'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const Layout = ({setToken, todos, products, carts}) => {
  return (
    <div>
      <Header />
      <Navbar setToken={setToken} products={products} carts={carts}/>
      <Outlet />
      <Footer />
    </div>
  )
}
