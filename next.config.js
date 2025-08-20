/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',       // 画像URLのプロトコル
          hostname: 'placehold.jp' // 画像のドメイン
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  