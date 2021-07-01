import prisma from "../lib/prisma";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const blogs = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      slug: true,
    },
  });

  const movies = await prisma.movie.findMany({
    where: {
      status: true,
    },
    select: {
      slug: true,
    },
  });

  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://vic.vercel.app",
  }[process.env.NODE_ENV];

  const staticPages = [
    "https://vic.vercel.app/about",
    "https://vic.vercel.app/contact",
    "https://vic.vercel.app/blogs",
    "https://vic.vercel.app/shop",
    "https://vic.vercel.app/photos",
    "https://vic.vercel.app/privacy",
    "https://vic.vercel.app/termsofuse",
    "https://vic.vercel.app/user/newpost",
    "https://vic.vercel.app/user/account",
    "https://vic.vercel.app/user/product",
    "https://vic.vercel.app/user/upload",
    "https://vic.vercel.app/auth/signin",
    "https://vic.vercel.app/movie",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}


          ${blogs
            .map((blog) => {
              return `
              <url>
                <loc>${baseUrl}/read/${blog.id}/${blog.slug}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>1.0</priority>
              </url>
            `;
            })
            .join("")}

              ${movies
                .map((movie) => {
                  return `
              <url>
                <loc>${baseUrl}/movie/${movie.slug}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>1.0</priority>
              </url>
            `;
                })
                .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
