############ 生产镜像制作阶段
# 选择更小体积的基础镜像
FROM nginx:alpine

# 将构建产物移至 nginx 中
COPY dist/ /usr/share/nginx/html/

COPY deploy_conf/conf.d /etc/nginx/conf.d
