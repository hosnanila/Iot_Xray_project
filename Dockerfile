FROM nrp.devpod.ir:8138/repository/applicationplatform-docker-hosted/node:16-alpine
WORKDIR /app
RUN apk add --no-cache curl busybox-extras
COPY package*.json .npmrc ./
RUN npm install --verbose
COPY . .
RUN set -ex \
    && npm run build \
    && rm -f .npmrc

EXPOSE 3002
CMD [ "node", "dist/main.js" ]
