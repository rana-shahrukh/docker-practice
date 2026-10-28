const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Docker GitHub CI/CD application is running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK"
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
