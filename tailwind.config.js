/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-0": "var(--color-premitive-grey-0)",
        "primary-1": "var(--color-premitive-grey-1)",
        "primary-2": "var(--color-premitive-grey-2)",
        "primary-3": "var(--color-premitive-grey-3)",
        "primary-4": "var(--color-premitive-grey-4)",
        "primary-5": "var(--color-premitive-grey-5)",
        customShade: {
          50: "#ffffff",
          100: "#f6f6f6",
          200: "#eeeeee",
          300: "#e2e2e2",
          400: "#cbcbcb",
          500: "#afafaf",
          600: "#757575",
          700: "#545454",
          800: "#333333",
          900: "#141414",
          950: "#000000"
        },
        home: {
          1: "#7A7A7A",
          2: "#CCCCCC",
          3: "#DDFF00",
        }
      },
      backgroundColor: {
        customShade: {
          1: "var(--primary-bg-color-0)",
          2: "var(--primary-bg-color-1)",
          3: "var(--primary-bg-color-2)",
          4: "var(--primary-bg-color-3)",
          5: "var(--primary-bg-color-4)",
        },
        home: {
          1: "#0d0d0d",
          2: "rgba(23, 23, 23, 0.6)",
          3: "#161616",
          "btn1": "rgb(221, 255, 0)",
        }
      },
      borderColor: {
        home: {
          1: "rgb(38, 38, 38)",
        }
      }
    },
  },
  plugins: [],
}