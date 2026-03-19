/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6D28D9", // Purple for premium feel
        secondary: "#10B981", // Green for health/success
        background: "#F9FAFB",
        card: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
