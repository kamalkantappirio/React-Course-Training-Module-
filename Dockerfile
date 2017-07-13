# Dockerfile
FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# Install app dependencies
COPY package.json /usr/src/app/
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn install

# Bundle app source
COPY . /usr/src/app

# Build and optimize react app
RUN npm start

EXPOSE 3000

# defined in package.json
CMD [ "npm", "start" ]
