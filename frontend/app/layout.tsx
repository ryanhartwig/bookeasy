import '@/styles/globals.css'

export default function RootLayout({children}: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <p>test</p>
        {children}</body>
    </html>
  )
}

export const metadata = {
  title: 'book it',
  description: 'Appointment scheduling solution',
}