/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        loginbg: "#EEF2F7",
loginconbg: "#FFFFFF",
primary: "#0F172A",
secondary: "#475569",
input: "#1E293B",
inputBorder: "#CBD5E1",
button:'#3B5BFF',
buttonHover:'#2C50E4',
loginLink:'#3B5BFF',
inputFocus:'#3B82F6',
      },
    },
  },
}