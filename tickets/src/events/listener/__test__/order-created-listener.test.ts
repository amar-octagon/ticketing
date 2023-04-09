import { OrderCreatedEvent, OrderStatus } from "@amoctagoninfotech/common";
import { OrderCreatedListener } from "../order-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const ticket = Ticket.build({
    title: "New Concert",
    price: 20,
    userId: "243235432",
  });

  await ticket.save();

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: "234234",
    expiresAt: "afsfsf",
    status: OrderStatus.Created,
    version: 0,
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { data, ticket, msg, listener };
};

it("Check to see if order has been reserved", async () => {
  const { data, ticket, msg, listener } = await setup();

  listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket?.orderId).toEqual(data.id);
});

it("Check if ack has been called", async () => {
  const { data, ticket, msg, listener } = await setup();

  listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
