# Use an official Node.js image as the base
FROM node:18

WORKDIR /app

COPY my-app/package.json my-app/package-lock.json ./

RUN npm install

# COPY . .

# EXPOSE 3000

# Start the React development server
# CMD ["npm", "start"]
CMD ["npm", "run", "build"]
# CMD ["tail", "-f"]
