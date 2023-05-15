#
FROM node:19.4.0 as build-stage
WORKDIR /var/jenkins_home/workspace/juchapika/frontend
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install socket.io-client --legacy-peer-deps
COPY . .
RUN npm install react-scripts -g --legacy-peer-deps
RUN npm run build --legacy-peer-deps

#
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/juchapika/frontend/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/juchapika/frontend/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]
