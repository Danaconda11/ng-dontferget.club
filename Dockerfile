FROM node:latest
ADD src /app
EXPOSE 80
CMD ["/usr/local/bin/node", "/app/index.js"]
