/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "4bran-image-storage.s3.amazonaws.com",
        port: "",
        pathname: "**",
      }
    ]
  }
};

export default nextConfig;
