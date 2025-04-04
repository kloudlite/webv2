import config from "@repo/design-sys/src/tailwind-base";

export default {
  ...config,
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
}