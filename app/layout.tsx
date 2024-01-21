import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CookieConsentButton, CookieConsentWrapper } from './_components/cookie-consent-components'
import { Button } from '@/components/ui/button'
import CookieConsent, { Cookies, resetCookieConsentValue } from "react-cookie-consent";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CookieConsentWrapper />
        <div className='h-screen w-screen flex flex-col justify-between'>
          {/* A full width, bar at the top of the screen */}
          <div
            className='h-16 w-full'
          >
            {/* TODO design top bar */}
            <p>
              Top bar
            </p>
          </div>
          
          <div className='h-full w-full bg-slate-800 text-white'>
            {children}
          </div>

          {/* A full width, bar at the bottom of the screen */}
          <div
            className='h-16 w-full'
          >
            {/* TODO design bottom bar */}
            
            <CookieConsentButton />
          </div>
        </div>
      </body>
    </html>
  )
}
