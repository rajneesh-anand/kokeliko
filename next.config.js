const isProd = process.env.NODE_ENV === "production";

const apiUrl = isProd
  ? " https://nodappserver.herokuapp.com/api"
  : "http://localhost:8080/api";

module.exports = {
  env: {
    PUBLIC_URL: "",
    API_URL: apiUrl,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
