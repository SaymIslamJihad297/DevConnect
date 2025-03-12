import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from './components/Pages/Home.jsx';
import Login from './components/Pages/Login.jsx'
import Signup from './components/Pages/SignUp.jsx';
import ApiContextProvider from './ApiContextProvider.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ApiContextProvider>
    <RouterProvider router={router} />
  </ApiContextProvider>
  // </StrictMode>,
)
