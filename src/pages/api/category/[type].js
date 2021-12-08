import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  const category = req.query.type;
  const curPage = req.query.page || 1;
  const perPage = req.query.limit || 30;
  const totalPosts = await prisma.post.count();

  try {
    const posts = await prisma.post.findMany({
      take: perPage * curPage,
      where: {
        published: true,
        category: category,
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send({
      message: "success",
      data: posts,
      curPage: curPage,
      maxPage: Math.ceil(totalPosts / perPage),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
