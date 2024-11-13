import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export const Navbar = ({ setToken, products, carts }) => {
  const [tab, setTab] = useState('home')

  const homeTabRef = useRef()
  const todosTabRef = useRef()
  const productsTabRef = useRef()
  const cartsTabRef = useRef()
  const aboutTabRef = useRef()

  useEffect(() => {
    if (tab === '' || tab === 'home') homeTabRef.current.click()
    else if (tab === 'todos') todosTabRef.current.click()
    else if (tab === 'products') productsTabRef.current.click()
    else if (tab === 'carts') cartsTabRef.current.click()
    else if (tab === 'about') aboutTabRef.current.click()
  }, [])

  return (
    <div>
      <Link to={'/'}>
        <button
          className={
            'btn btn-outline-secondary button-spacing' +
            (tab === 'home' ? ' active' : '')
          }
          onClick={() => setTab('home')}
          ref={homeTabRef}
        >
          Home
        </button>
      </Link>
      <Link to={'/todos'}>
        <button
          className={
            'btn btn-outline-primary button-spacing' +
            (tab === 'todos' ? ' active' : '')
          }
          onClick={() => setTab('todos')}
          ref={todosTabRef}
        >
          Todos
        </button>
      </Link>
      <Link to={'/products'}>
        <button
          className={
            'btn btn-outline-primary button-spacing' +
            (tab === 'products' ? ' active' : '')
          }
          onClick={() => setTab('products')}
          ref={productsTabRef}
        >
          Products (
          {products.length == 0
            ? null
            : products.length > 99
            ? '99+'
            : products.length}
          )
        </button>
      </Link>
      <Link to={'/carts'}>
        <button
          className={
            'btn btn-outline-primary button-spacing position-relative' +
            (tab === 'carts' ? ' active' : '')
          }
          onClick={() => setTab('carts')}
          ref={cartsTabRef}
        >
          Carts
          {carts.length == 0 ? null : (
            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
              {carts.length > 9 ? '9+' : carts.length}
              <span className='visually-hidden'>unread messages</span>
            </span>
          )}
        </button>
      </Link>
      <Link to={'/about'}>
        <button
          className={
            'btn btn-outline-secondary button-spacing' +
            (tab === 'about' ? ' active' : '')
          }
          onClick={() => setTab('about')}
          ref={aboutTabRef}
        >
          About
        </button>
      </Link>
      <button
        className='btn btn-outline-danger button-spacing'
        onClick={() => setToken('')}
      >
        Logout
      </button>
      <hr />
    </div>
  )
}
