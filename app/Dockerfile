FROM node:16-alpine AS build

# Install Chromium
RUN apk add --no-cache chromium

ENV CHROMIUM_BIN=/usr/bin/chromium-browser
WORKDIR /app

COPY . .

RUN npm install

RUN npm run test

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/app/ /usr/share/nginx/html

EXPOSE 80