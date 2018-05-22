# specify the node base image with your desired version node:<version>
FROM node:9

#make home directory
RUN mkdir /app

#make the working directory the /app
WORKDIR /app

#copy the p.json file into /app
COPY package.json /app

#install all the dependencies in p.json
RUN npm install

#copy all the other files in current directory into /app
COPY . /app


EXPOSE 3000


CMD ["npm", "start", "process.json"]
