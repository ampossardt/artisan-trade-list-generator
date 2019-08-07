FROM node:10-alpine

WORKDIR /app

# Set up argument binding for working locally with environmental variables
ARG PORT
ENV PORT=$PORT

ARG OAUTH_ID
ENV OAUTH_ID=$OAUTH_ID

ARG OAUTH_SECRET
ENV OAUTH_SECRET=$OAUTH_SECRET

ARG CORS_ALLOWED
ENV CORS_ALLOWED=$CORS_ALLOWED

COPY package.json .
RUN npm install

COPY index.js .
COPY routes.js .
COPY assets/ assets/
COPY tools/ tools/

CMD ["node", "index.js"]