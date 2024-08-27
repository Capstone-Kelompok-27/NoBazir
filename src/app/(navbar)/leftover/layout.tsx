import { CatalogContextProvider } from "@/app/_context/catalogContext";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>
        <CatalogContextProvider>{children}</CatalogContextProvider>
      </body>
    </html>
  );
}
