const tracer = require("dd-trace").init();
const express = require("express");
const app = express();

const PORT = 8080;

tracer.init({
  profiling: true,
  env: "local",
  service: "simple-nodejs",
  version: "1.0.0",
});

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

require("@google-cloud/profiler")
  .start({
    serviceContext: {
      service: "simple-nodejs",
      version: "1.0.0",
    },
  })
  .catch((err) => {
    console.log(`Failed to start profiler: ${err}`);
  });

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
