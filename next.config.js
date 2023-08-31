/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    additionalData: `@use "./_variables.scss" as *;`,
  },
};

module.exports = nextConfig;
