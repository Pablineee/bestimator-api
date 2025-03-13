const { requireAuth, clerkMiddleware } = require('@clerk/express');

// Middleware to authenticate user and protect routes
const clerkAuth = requireAuth();

module.exports = {
    clerkAuth,
    clerkMiddleware
}