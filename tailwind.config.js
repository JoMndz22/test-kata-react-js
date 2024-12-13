/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      extend: {
        animation: {
          spin: "spin 1s linear infinite", // Customize the speed here (default is 1s)
        },
      },
    },
  },
  plugins: [],
};
