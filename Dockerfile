#第一个阶段：拉去node镜像来打包react项目
FROM node:16 as build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY tsconfig.json ./
COPY public public/
COPY src src/
RUN yarn build

#第二个阶段：创建并运行Nginx服务器，并且把打包好的文件复制粘贴到服务器文件夹中
FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]
