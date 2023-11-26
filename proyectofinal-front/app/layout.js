import { Inter } from 'next/font/google'
import './globals.css'
import { ApolloWrapper } from '@/src/context/dataWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistema de videojuegos',
  description: 'Proyecto final de SO por: Eric Soto, Jonathan Rodriguez, Abdel Lasso',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}
