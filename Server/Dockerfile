FROM node:16

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép mã nguồn của ứng dụng vào thư mục làm việc
COPY . .

# Mở cổng 3000 cho ứng dụng
EXPOSE 5001

# Lệnh để chạy ứng dụng khi container khởi chạy
CMD ["npm", "start"]
