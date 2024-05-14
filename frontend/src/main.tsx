import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from 'react-router-dom';
import router from './routes';
import './index.css'
import { Toaster } from './components/ui/toaster';
import { Header } from './components/Header';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router} />
    <Toaster/>
  </React.StrictMode>,
)
