import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";

it("fetches the order", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),

    title: "Concert",
    price: 200,
  });

  ticket.save();

  const user = await global.signin();

  //create a new order by making a request
  const { body: userOrder } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  //fetch the order with given for give user id
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${userOrder.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(userOrder.id).toEqual(fetchedOrder.id);
});

it("returns 404 if one user tries to access order of another user", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Concert",
    price: 200,
  });

  ticket.save();

  const user = await global.signin();

  //create a new order by making a request
  const { body: userOrder } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  //fetch the order with given for give user id
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${userOrder.id}`)
    .set("Cookie", await global.signin())
    .send()
    .expect(404);
});
