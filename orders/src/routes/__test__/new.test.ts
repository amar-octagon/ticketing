import { OrderStatus } from "@amoctagoninfotech/common";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";

it("returns an error if the ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", await global.signin())
    .send({ ticketId })
    .expect(404);
});

it("returns an error if the ticket is already resserved", async () => {
  const ticket = Ticket.build({
    title: "Some new title",
    price: 200,
  });

  await ticket.save();

  const order = Order.build({
    userId: "sadfasdfasdf",
    status: OrderStatus.Created,
    ticket,
    expiresAt: new Date(),
  });

  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", await global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserve a ticket", async () => {
  //
});
