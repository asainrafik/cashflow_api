const request = require("supertest");
const app = require("../../app");


test("login", async () => {
    await request(app)
        .post("/api/v1/login")
        .send({
            email:"admin@gmail.com",
            password:"12345678",
        }).expect(200);
});
test("login", async () => {
    await request(app)
        .post("/api/v1/login")
        .send({
            email: "admin@gmail.com",
            password: "1345678",
        })
        .expect(400);
});
test("login", async () => {
    await request(app)
        .post("/api/v1/login")
        .send({
            email: "adin@gmail.com",
            password: "12345678",
        })
        .expect(400);
});
