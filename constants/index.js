module.exports = {
    ALLOWED_ROUTES: {
        path: [
            '/app/user/sign-in',
            '/app/user/sign-up',
            { url: "/app-docs", methods: ["GET"] },
            { url: /^\/app-docs\/.*/, methods: ["GET"] }
        ]
    }
}