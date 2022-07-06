const request = require("supertest");
const app = require("../../app");

let token = "";

beforeAll(async () => {
    const response = await request(app).post("/api/v1/login").send({
        email:"admin@gmail.com",
        password:"12345678",
    });
    token = response.body.token;
});
test("Get API feeMaster Positive", async () => {
    await request(app).get("/api/v1/feeMaster").set("Authorization", `Bearer${token}`).expect(200);
});
test("FeeMaster Insert Record", async () => {
    await request(app)
        .post("/api/v1/feeMaster")
        .set("Authorization", `Bearer ${token}`)
        .send({
            fee_type_name: "BUS-Namakkal",
            order_id: 1,
            transport_fee: "true",
            hostal_fee: "false",
            optional_fee: "true",
        })
        .expect(201);
});


test("FeeMaster not require data", async () => {
    await request(app)
        .post("/api/v1/feeMaster")
        .set("Authorization", `Bearer ${token}`)
        .send({
            order_id: 1,
            transport_fee: "true",
            hostal_fee: "false",
            optional_fee: "false",
        })
        .expect(422);
});

test("Post API FeeMaster already", async () => {
    await request(app)
        .post("/api/v1/feeMaster")
        .set("Authorization", `Bearer ${token}`)
        .send({
            fee_type_name:"BUS-Namakkal",
            order_id: 1,
            transport_fee: "true",
            hostal_fee: "false",
            optional_fee: "true",
        }).expect(409);
});

test("Update API FeeMaster Postive", async () => {
    await request(app).put("/api/v1/feeMaster/59").set("Authorization", `Bearer ${token}`).send({fee_type_name:"Misscilion"}).expect(200); 
})

test("Delete API feemaster negative", async () => {
    await request(app).delete("/api/v1/feeMaster").set("Authorization", `Bearer ${token}`).send({fee_master_id: 67}).expect(409);
});
test("Delete API feemaster Postive", async () => {
    await request(app).delete("/api/v1/feeMaster").set("Authorization", `Bearer ${token}`).send({fee_master_id: 68}).expect(200);
})