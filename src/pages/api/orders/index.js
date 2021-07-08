import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const {
    order_number,
    name,
    email,
    address,
    total_products,
    total_amount,
    product_details,
    payment_id,
  } = req.body;

  try {
    const result = await prisma.orders.create({
      data: {
        OrderNumber: order_number,
        Name: name,
        Email: email,
        Address: JSON.stringify(address),
        TotalProducts: total_products,
        TotalAmount: JSON.parse(total_amount),
        ProductDetals: JSON.stringify(product_details),
        PaymentID: payment_id,
      },
    });

    return res.status(200).json({
      msg: "success",
      data: result,
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
