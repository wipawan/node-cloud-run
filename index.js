const express = require("express");
const app = express();

const PORT = 8080;

const recursiveFunction = (counter, callback) => {
  if (counter <= 0) {
    if (callback) callback();
    return;
  }

  // Wait for 1 second before the next recursion
  setTimeout(() => {
    recursiveFunction(counter - 1, callback);
  }, 1000);
};

app.get("/hello", (req, res) => {
  const response = {
    message: "Hello, World!",
    timestamp: new Date(),
  };
  recursiveFunction(5, () => res.json(response));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
