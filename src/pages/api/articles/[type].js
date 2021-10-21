import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  const category = req.query.type;
  const query = req.query;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const startIndex = (page - 1) * limit;
  const totalCount = await prisma.post.count();

  try {
    const product = await prisma.post.findMany({
      take: limit,
      skip: startIndex,
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

    res.status(200).json({
      msg: "success",
      data: product,
      maxPage: Math.ceil(totalCount / limit),
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
