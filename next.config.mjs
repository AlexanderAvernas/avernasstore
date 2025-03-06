// const nextConfig = {
//     output: "standalone", // Optional: Use for serverless deployment
//     // Add other configuration options here if needed
//   };

//   export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone", // Behåll din nuvarande inställning
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.ctfassets.net",
        },
      ],
    },
  };

  export default nextConfig;
