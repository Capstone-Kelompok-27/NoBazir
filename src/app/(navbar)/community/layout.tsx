import { CommunityContextProvider } from "@/app/_context/communityContext";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>
        <CommunityContextProvider>{children}</CommunityContextProvider>
      </body>
    </html>
  );
}
