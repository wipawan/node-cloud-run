FROM node:14

WORKDIR /home/node/app

COPY package*.json ./

COPY --from=datadog/serverless-init:1 /datadog-init /home/node/app/datadog-init
RUN npm install --prefix /dd_tracer/node dd-trace@3  --save
# RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT ["/home/node/app/datadog-init"]

CMD [ "node", "index.js" ]