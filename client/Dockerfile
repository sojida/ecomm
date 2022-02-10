FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN npm install pm2 -g

ARG PM2_PUBLIC_KEY
ARG PM2_SECRET_KEY
ENV PM2_PUBLIC_KEY=$PM2_PUBLIC_KEY
ENV PM2_SECRET_KEY=$PM2_SECRET_KEY


# Bundle app source
COPY . .

EXPOSE 3333
CMD ["pm2-runtime", "index.js"]

