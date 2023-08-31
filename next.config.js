/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  sassOptions: {
    prependData: `@use "./src/styles/variables.scss" as *;`,
  },
};

module.exports = nextConfig;
