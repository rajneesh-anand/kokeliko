import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  const slug = req.query.slug;
  try {
    const blogDetail = await prisma.post.findFirst({
      where: {
        slug: slug,
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

    res.status(200).json({
      data: blogDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
