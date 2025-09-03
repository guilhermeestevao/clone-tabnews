import database from "infra/database.js";
import orquestrator from "tests/orquestrator.js";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const responseBody1 = await response1.json();
  expect(Array.isArray(responseBody1)).toBe(true);
  expect(responseBody1.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const responseBody2 = await response2.json();
  expect(Array.isArray(responseBody2)).toBe(true);
  expect(responseBody2.length).toBe(0);
});
