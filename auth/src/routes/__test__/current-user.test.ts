import request from "supertest";
import app from "../../app";

it("responds with details about the current user", async () => {
  const cookie = await global.signin();

  const currentUserResponse = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send({ email: "test@test.com", password: "password" })
    .expect(200);

  expect(currentUserResponse.body.currentUser.email).toEqual("test@test.com");
});
