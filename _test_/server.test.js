const app = require("../server");
const supertest = require("supertest");

describe("Testing the API", () => {
  it("test the correct endpoint and expected status(200) returned from API.", async () => {
    const response = await supertest(app).get(
      "/api/visitors?date=1404198000000&museum=avila_adobe"
    );

    // console.log(response.body);
    expect(response.status).toBe(200);
  });

  it("test the success scenario and  expected response returned from API.", async () => {
    const response = await supertest(app).get(
      "/api/visitors?date=1404198000000&museum=avila_adobe"
    );

    // console.log(response.body);
    expect(response.body.result["visitors"]).toBe(32378);
  });

  it("Null response from the backend for out of scope month(time) input", async () => {
    const response = await supertest(app).get(
      "/api/visitors?date=&museum=avila_adobe"
    );

    // console.log(response.body);
    expect(response.body.result["visitors"]).toBe(null);
  });

  it("Undefined time input provided and expected error received", async () => {
    const response = await supertest(app).get(
      "/api/visitors?date1=&museum=avila_adobe"
    );

    //console.log(response.body);
    expect(response.body.message).toBe("Bad Request");
  });

  it("Incorrect time input provided and expected error received", async () => {
    const response = await supertest(app).get(
      "/api/visitors?date=canadec&museum=avila_adobe"
    );

    //console.log(response.body, typeof response.status);
    expect(response.status).toBe(400);
  });

  it("Incorrect URL used", async () => {
    const response = await supertest(app).get(
      "/api/v1/visitors?date=canadec&museum=avila_adobe"
    );

    //console.log(response.body, response.status);
    expect(response.status).toBe(404);
  });
});

afterAll((done) => {
  app.close();
  done();
});
