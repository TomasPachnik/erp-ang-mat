FROM arm32v7/nginx:stable

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/ .
EXPOSE 5678
