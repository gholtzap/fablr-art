import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="h-screen bg-gradient-to-b scrollbar-thin scrollbar-thumb-[#8a5cb5] scrollbar-track-gray-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
