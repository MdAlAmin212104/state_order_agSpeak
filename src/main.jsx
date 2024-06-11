import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import router from './Router/Router.jsx'
import theme from './components/theme/Theme.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)


