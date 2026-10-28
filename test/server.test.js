const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");

const app = require("../src/server");

test("health endpoint should return HTTP 200", async () => {
  const server = http.createServer(app);

  await new Promise((resolve) => {
    server.listen(0, resolve);
  });

  const { port } = server.address();

  try {
    const response = await fetch(`http://localhost:${port}/health`);

    assert.strictEqual(response.status, 200);

    const body = await response.json();

    assert.strictEqual(body.status, "OK");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test("root endpoint should return application message", async () => {
  const server = http.createServer(app);

  await new Promise((resolve) => {
    server.listen(0, resolve);
  });

  const { port } = server.address();

  try {
    const response = await fetch(`http://localhost:${port}/`);

    assert.strictEqual(response.status, 200);

    const body = await response.json();

    assert.strictEqual(
      body.message,
      "Docker GitHub CI/CD application is running"
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
