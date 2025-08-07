import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Aos from 'aos'
import 'aos/dist/aos.css';



const queryClient = new QueryClient();

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-11/12 mx-auto'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer position="top-right" reverseOrder={false} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
