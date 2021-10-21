import prisma from "../../../libs/prisma";

export default async function handle(req, res) {
  try {
    const postId = req.query.id;
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: false },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
