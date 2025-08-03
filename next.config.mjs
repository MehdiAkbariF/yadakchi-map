/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/yadakchi/:path*',
        destination: 'https://api-yadakchi.loca.lt/api/maps/:path*',
      },
    ]
  },
};

// به جای module.exports از این خط استفاده کنید
export default nextConfig;