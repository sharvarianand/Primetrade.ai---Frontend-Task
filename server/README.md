---
title: Primetrade.ai Backend
emoji: ⚡
colorFrom: indigo
colorTo: purple
sdk: docker
pinned: false
app_port: 7860
---

# PrimeTrade Backend

Express.js backend API for the PrimeTrade Task Management application.

**🚀 Live API:** https://sharvarianand-primetrade-ai.hf.space

## API Endpoints

- **`GET /`** - API information and documentation
- **`GET /api/health`** - Health check
- **`POST /api/auth/register`** - User registration
- **`POST /api/auth/login`** - User login
- **`POST /api/auth/refresh`** - Refresh access token
- **`POST /api/auth/logout`** - User logout
- **`GET /api/tasks`** - Get all tasks (requires auth)
- **`POST /api/tasks`** - Create new task (requires auth)
- **`GET /api/tasks/:id`** - Get task by ID (requires auth)
- **`PUT /api/tasks/:id`** - Update task (requires auth)
- **`DELETE /api/tasks/:id`** - Delete task (requires auth)
- **`GET /api/users/profile`** - Get user profile (requires auth)
- **`PUT /api/users/profile`** - Update user profile (requires auth)
