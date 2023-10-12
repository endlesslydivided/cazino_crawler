/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'cdn.plaingaming.net'],
    },
    output: 'standalone',
    serverRuntimeConfig: {
        // Will only be available on the server side
        apiUrl: process.env.NEXT_SERVER_API_URI
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        apiUrl: process.env.NEXT_PUBLIC_API_URI
    }
};

module.exports = nextConfig;
