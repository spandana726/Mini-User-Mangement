export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C7AE0",
        primaryDark: "#5A67D8",
        muted: "#6B7280",
        danger: "#DC2626"
      },
      boxShadow: {
        card: "0 20px 40px rgba(0,0,0,0.08)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};
