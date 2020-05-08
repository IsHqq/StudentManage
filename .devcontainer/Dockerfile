FROM node:13.13

RUN npm config set registry https://registry.npm.taobao.org \
    npm install -g yarn \
    yarn config set registry https://registry.npm.taobao.org \
    yarn global add @vue/cli

WORKDIR /workspace

EXPOSE 8080