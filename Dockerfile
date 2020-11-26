# docker build -f Dockerfile -t tomas487/erp-ang-arm:0.1 .
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/ .
EXPOSE 443
