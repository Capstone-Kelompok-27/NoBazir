import { CalorieContextProvider } from "@/app/_context/calorieContext";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>
        <CalorieContextProvider>{children}</CalorieContextProvider>
      </body>
    </html>
  );
}
