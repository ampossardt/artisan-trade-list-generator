FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
# RUN npm install env-cmd -g
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.17.2
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf.template /etc/nginx/conf.d/default.conf.template

# Build-time arguments that will be added as environmental variables
ARG REACT_APP_GITHUB_CLIENT_ID
ARG REACT_APP_API_BASE_URL
ARG REACT_APP_GITHUB_SCOPES
ARG REACT_APP_REDIRECT_URI

ENV REACT_APP_GITHUB_CLIENT_ID=$REACT_APP_GITHUB_CLIENT_ID
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_GITHUB_SCOPES=$REACT_APP_GITHUB_SCOPES
ENV REACT_APP_REDIRECT_URI=$REACT_APP_REDIRECT_URI

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'