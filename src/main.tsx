
import { createRoot } from 'react-dom/client'
import { Routes } from '@generouted/react-router'

import './index.css'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
    <>
        <Routes />
        <Toaster />
    </>
)