FROM node:22.15.0-alpine AS frontend
ADD . /usr/app
WORKDIR /usr/app
RUN npm install && npm run build && rm -fr node_modules
