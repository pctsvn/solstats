const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/, // Xử lý file TypeScript
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.svg$/, // Xử lý file SVG
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/, // Xử lý file ảnh
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]', // Lưu ảnh trong thư mục `images`
                },
            },
            {
                test: /\.scss$/, // Xử lý SCSS
                use: [
                    'style-loader',    // Chèn CSS vào DOM
                    'css-loader',      // Xử lý file CSS
                    'resolve-url-loader', // Sửa đường dẫn tương đối trong CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true, // Cần thiết nếu dùng resolve-url-loader
                        },
                    },
                ],
            },
            {
                test: /\.css$/, // Xử lý CSS thuần
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};