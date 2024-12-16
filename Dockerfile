FROM node:20
WORKDIR /app

COPY package*.json ./

# COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init

RUN npm install

COPY . .

EXPOSE 8080

# ENV NODE_OPTIONS="--require dd-trace/init"

# ENTRYPOINT ["/app/datadog-init"]

ENTRYPOINT [ "node", "index.js" ]