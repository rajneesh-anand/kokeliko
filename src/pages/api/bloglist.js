import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send({
      message: "success",
      data: posts,
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
