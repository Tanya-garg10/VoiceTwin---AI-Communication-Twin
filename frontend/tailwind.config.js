export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#08080a",
        card: "#111113",
        border: "#1e1e22",
        accent: "#8b7bff",
        accent2: "#5ef2c8",
        muted: "#9aa0a6"
      },
      fontFamily: { sans: ["Geist","Inter","system-ui"] },
      borderRadius: { xl: "1.2rem" }
    }
  },
  plugins: []
}
