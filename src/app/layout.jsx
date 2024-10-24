
import { Inter } from "next/font/google";
import { StoreProvider } from "../components/provider/Provider";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Saree Pasal",
  description: "Saree Pasal",
};

export default function RootLayout({ children,pageProps }) {
  return (
    <StoreProvider {...pageProps}>
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
    </StoreProvider>
  );
}
