const tracer = require("dd-trace").init();
const express = require("express");
const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
  const response = {
    message: "Hello, World!",
    timestamp: new Date(),
  };

  res.json(response);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
