FROM node:20
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV DD_SERVICE="simple-node-app"
ENV DD_ENV="staging"

ENV NODE_OPTIONS="--require dd-trace/init"

# ENTRYPOINT ["/app/datadog-init"]

ENTRYPOINT [ "node", "index.js" ]