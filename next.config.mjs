/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://iran-locations-api.ir/api/:path*',
        },
      ]
    },
  };
  
  export default nextConfig;