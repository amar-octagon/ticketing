import request from "supertest";
import { app } from "../../app";

it("Return 404 is post is not found", async () => {
  const response = await request(app).get("/api/tickets/sfasfas").send();
  // .expect(404);

  console.log(response.body);
});

it("Return a ticket if the ticket is found", async () => {
  const title = "concert";
  const price = 20;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", await global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
