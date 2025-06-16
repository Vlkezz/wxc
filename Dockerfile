FROM node:20

WORKDIR /app/frontend

COPY /frontend/package*.json ./

RUN npm install

COPY frontend ./

RUN chmod +x /app/frontend/start.sh

EXPOSE 5173

CMD ["sh", "/app/frontend/start.sh"]