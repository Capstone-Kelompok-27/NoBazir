import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        montserrat: ['Montserrat', 'sans-serif'],
        'source-sans': ['Source Sans Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
