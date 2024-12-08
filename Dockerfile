FROM node:20

WORKDIR /home/node/app

COPY package*.json ./

# COPY --from=datadog/serverless-init:1 /datadog-init /home/datadog-init
# RUN ls -la /
# RUN ls -la /home
# RUN npm install --prefix /dd_tracer/node dd-trace@3  --save
RUN npm install

COPY . .

EXPOSE 8080

# ENTRYPOINT ["/app/datadog-init"]

ENTRYPOINT [ "node", "index.js" ]