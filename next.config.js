const withImages = require("next-images");
const isProd = process.env.NODE_ENV === "production";

const apiUrl = isProd
  ? "https://blognodeserver.herokuapp.com/api"
  : "http://localhost:8080/api";

const publicUrl = isProd
  ? "https://kokeliko.vercel.app"
  : "http://localhost:3000";

module.exports = withImages({
  env: {
    PUBLIC_URL: publicUrl,
    API_URL: apiUrl,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "blogsite-aws-bucket.s3.ap-south-1.amazonaws.com",
      "source.unsplash.com",
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
});
