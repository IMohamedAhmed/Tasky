module.exports = {
    ALLOWED_ROUTES: {
        path: [
            '/app/user/sign-in',
            '/app/user/oauth/sign-in',
            '/app/user/reset/password',
            '/app/user/reset',
            '/app/user/sign-up',
            '/app/user/sign-up/complete',
            '/app/user/verify-otp',
            { url: "/app-docs", methods: ["GET"] },
            { url: /^\/app-docs\/.*/, methods: ["GET"] }
        ]
    }
}