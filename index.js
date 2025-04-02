// const tracer = require("dd-trace").init({
//   logInjection: true,
// });
const tracer = require("dd-trace");
const formats = require("dd-trace/ext/formats");
const express = require("express");
const app = express();
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Console(),
    // new transports.File({ filename: `./shared-volume/logs/app.log` }),
  ],
});

const consoleLogger = function (message) {
  const level = "INFO";
  const span = tracer.scope().active();
  const time = new Date().toISOString();
  const record = { time, level, message };

  if (span) {
    tracer.inject(span.context(), formats.LOG, record);
  }

  console.log(JSON.stringify(record));
};

// Allow all origins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, traceparent, tracestate"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.get("/", (_, res) => {
  logger.info("Welcome!");
  consoleLogger("Welcome from console!");
  const shouldFail = Math.random() < 0.5; // 50% chance of error

  if (shouldFail) {
    logger.info("❌ Simulated error");
    return res.status(500).json({
      error: {
        message: "Simulated server error 💥",
      },
    });
  }

  logger.info("✅ Success response");
  res
    .status(200)
    .json({ message: "Success! 🎉", timestamp: new Date().toISOString() });
});

app.get("/hello", (_, res) => {
  logger.info("Hello!");
  console.log("Hello from console!");
  metricPrefix = "nodejs-cloudrun";
  // Send three unique metrics, just so we're testing more than one single metric
  // metricsToSend = ["sample_metric_1", "sample_metric_2", "sample_metric_3"];
  // metricsToSend.forEach((metric) => {
  //   for (let i = 0; i < 20; i++) {
  //     tracer.dogstatsd.distribution(`${metricPrefix}.${metric}`, 1);
  //   }
  // });
  res.status(200).json({ msg: "Sending metrics to Datadog" });
});

const port = process.env.PORT || 8080;
app.listen(port);
