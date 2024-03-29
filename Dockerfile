FROM node:16-slim
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
RUN yarn cache clean --force
ENV NODE_ENV="production"
COPY . .
CMD [ "yarn", "start" ]
