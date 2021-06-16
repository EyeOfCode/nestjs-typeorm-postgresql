# Build app first
FROM node:12 AS development
WORKDIR /usr/src
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build service

# Smaller image for production
FROM node:12-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG PROFILE=production
ENV PROFILE=${PROFILE}
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn ci --only=production
COPY --from=development /usr/src/app/dist ./dist/
USER node
EXPOSE 8000
CMD [ "node", "dist/src" ]