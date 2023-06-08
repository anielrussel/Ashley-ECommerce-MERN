import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Login from './pages/Login.tsx'
import NewProduct from './pages/NewProduct.tsx'
import Signup from './pages/Signup.tsx'
import { store } from './redux/index.ts'
import { Provider } from 'react-redux'
import Menu from './pages/Menu.tsx'
import Products from './pages/Products.tsx'
import Cart from './pages/Cart.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='menu' element={<Menu />} />
      <Route path='product/:filterby' element={<Products />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='newproduct' element={<NewProduct />} />
      <Route path='signup' element={<Signup />} />
      <Route path='cart' element={<Cart />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
