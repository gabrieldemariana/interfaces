/** @type {import('tailwindcss').Config} */
module.exports = {
  // Requisito: Configuración de Tailwind para estilos responsivos
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      // Requisito: Animaciones personalizadas para mejor UX
      animation: {
        "gradient-x": "gradient 15s ease infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
