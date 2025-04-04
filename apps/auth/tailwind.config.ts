// import config from "@repo/design-sys/src/tailwind-base";
import config from "../../../design-system/tailwind-base";
export default {
  ...config,
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
}