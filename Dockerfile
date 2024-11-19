FROM node:16.20.2

WORKDIR /home/node/app

COPY package*.json ./

COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN npm install --prefix /dd_tracer/node dd-trace@latest-node16  --save

COPY . .

EXPOSE 8080

ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1

ENTRYPOINT ["/app/datadog-init"]

CMD [ "node", "index.js" ]