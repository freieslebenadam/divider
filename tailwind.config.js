module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Inter"],
        "mono": ["Roboto Mono"]
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "5rem",
          xl: "6rem",
          "2xl": "12rem"
        }
      },
      colors: {
        neutral: {
          "1000": "rgb(20,20,20)"
        },
        dim: {
          "50":   "rgba(0,0,0,0.05)",
          "100":  "rgba(0,0,0,0.10)",
          "200":  "rgba(0,0,0,0.20)",
          "300":  "rgba(0,0,0,0.30)",
          "400":  "rgba(0,0,0,0.40)",
          "500":  "rgba(0,0,0,0.50)",
          "600":  "rgba(0,0,0,0.60)",
          "700":  "rgba(0,0,0,0.70)",
          "800":  "rgba(0,0,0,0.80)",
          "900":  "rgba(0,0,0,0.90)",
        },
        lighter: {
          "50":   "rgba(255,255,255,0.05)",
          "100":  "rgba(255,255,255,0.10)",
          "200":  "rgba(255,255,255,0.20)",
          "300":  "rgba(255,255,255,0.30)",
          "400":  "rgba(255,255,255,0.40)",
          "500":  "rgba(255,255,255,0.50)",
          "600":  "rgba(255,255,255,0.60)",
          "700":  "rgba(255,255,255,0.70)",
          "800":  "rgba(255,255,255,0.80)",
          "900":  "rgba(255,255,255,0.90)",
        }
      },
      animation: {
				fade: "fadeIn 200ms ease-in-out",
				slide: "slideIn 200ms ease-in-out",
				jump: "jump 200ms ease-in-out",
				shift: "shift 200ms ease-in-out",
        rollout: "rollOut 200ms ease-in-out",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 }
				},
				slideIn: {
					"0%": { transform: "translateY(-150px)" },
					"60%": { transform: "translateY(10px)" },
					"85%": { transform: "translateY(-10px)" },
					"100%": { transform: "translateX(0)" }
				},
				jump: {
					"0%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-4px)" },
					"100%": { transform: "translateY(0)" },
				},
				shift: {
					"0%": { transform: "translateX(0)" },
					"40%": { transform: "translateX(-6px)" },
					"60%": { transform: "translateX(6px)" },
					"100%": { transform: "translateX(0)" },
				},
        rollOut: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" }
        },
			},
    },
  },
  plugins: [],
}
