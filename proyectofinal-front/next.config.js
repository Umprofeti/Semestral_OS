/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
      },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Authorization", value: "Users API-Key 03068e56-cf08-4ae8-87d2-efb7953ff3e7"},
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                  ]
            }
        ]
    }
}

module.exports = nextConfig
