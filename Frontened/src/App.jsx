import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import CreateBooks from './pages/CreateBooks'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'

const App = () => {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
     {
      path:'/home',
      element:<Home/>
    },
    {
      path:'/books/create',
      element:<CreateBooks/>
    },
    {
      path:'/books/details/:id',
      element:<ShowBook/>
    },
    {
    path:'/books/edit/:id',
    element:<EditBook/>
    },
    {
      path:'books/delete/:id',
      element:<DeleteBook/>
    }
  ]
    
  )
  return (
    <RouterProvider router={router}/>
  )
}

export default App
