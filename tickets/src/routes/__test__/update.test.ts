import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { natsWrapper } from "../../nats-wrapper";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", await global.signin())
    .send({
      title: "asdfasdf",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "asdfasdf",
      price: 20,
    })
    .expect(401);
});

it("returns a 401 if the user does not own the tickets", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", await global.signin())
    .send({
      title: "adfgsasfasdf",
      price: 30,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", await global.signin())
    .send({
      title: "asfasdf",
      price: 10,
    })
    .expect(401);
});

it("returns a 400 if the user provided invalid title or price", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "fasfasdf",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "fasfsadf",
      price: -20,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "safasdf",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "New Title",
      price: 200,
    })
    .expect(200);

  const ticketRes = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketRes.body.title).toEqual("New Title");
  expect(ticketRes.body.price).toEqual(200);
});

it("Publishes an event", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "safasdf",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "New Title",
      price: 200,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
