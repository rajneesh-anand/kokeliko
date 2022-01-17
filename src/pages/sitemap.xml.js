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

  const baseUrl = "https://www.tswan.club";

  const staticPages = [
    "https://www.tswan.club/about",
    "https://www.tswan.club/contact",
    "https://www.tswan.club/politics",
    "https://www.tswan.club/sports",
    "https://www.tswan.club/technology",
    "https://www.tswan.club/jobs",
    "https://www.tswan.club/health",
    "https://www.tswan.club/entertainment",
    "https://www.tswan.club/travel",
    "https://www.tswan.club/fashion-beauty",
    "https://www.tswan.club/yoga-meditation",
    "https://www.tswan.club/privacy",
    "https://www.tswan.club/terms",
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
