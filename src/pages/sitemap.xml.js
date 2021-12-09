import prisma from "@/libs/prisma";

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

  const baseUrl = "https://kokeliko.vercel.app";

  const staticPages = [
    "https://kokeliko.vercel.app/about",
    "https://kokeliko.vercel.app/contact",
    "https://kokeliko.vercel.app/politics",
    "https://kokeliko.vercel.app/sports",
    "https://kokeliko.vercel.app/technology",
    "https://kokeliko.vercel.app/jobs",
    "https://kokeliko.vercel.app/health",
    "https://kokeliko.vercel.app/entertainment",
    "https://kokeliko.vercel.app/travel",
    "https://kokeliko.vercel.app/fashion-beauty",
    "https://kokeliko.vercel.app/yoga-meditation",
    "https://kokeliko.vercel.app/privacy",
    "https://kokeliko.vercel.app/terms",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
   
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
                <loc>${baseUrl}/read/${blog.slug}</loc>
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
