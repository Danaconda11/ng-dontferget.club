FROM node:latest
ADD src /app
WORKDIR /app
RUN npm run build:production
EXPOSE 80
CMD ["/usr/local/bin/node", "/app/index.js"]
