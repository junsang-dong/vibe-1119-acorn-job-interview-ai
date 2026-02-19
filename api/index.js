/**
 * Vercel Serverless Function - Express API 진입점
 * /api/* 요청이 이 핸들러로 라우팅됩니다.
 */
const app = require('../backend/server');
module.exports = app;
