import "./globals.css";

export const metadata = {
  title: "Delibra",
  description: "IA para reflexão e tomada de decisões",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
