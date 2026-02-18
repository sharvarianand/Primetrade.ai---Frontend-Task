# PrimeTrade Task Management System 🚀

**Live Demo:** [https://primetrade-ai-frontend-task-nu.vercel.app/](https://primetrade-ai-frontend-task-nu.vercel.app/)

A full-stack, production-ready task management application with AI-powered assistance, built with modern technologies and best practices. This project demonstrates scalable architecture, stunning UI/UX with premium dark theme, and comprehensive functionality.

![Project Status](https://img.shields.io/badge/status-production--ready-success)
![Tech Stack](https://img.shields.io/badge/stack-Next.js%20%2B%20Express%20%2B%20Supabase-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✅ Requirements Checklist

### Core Features (All Implemented ✅)
- ✅ **Frontend**: Built with Next.js 14 (React framework)
- ✅ **Responsive Design**: TailwindCSS with mobile-first approach
- ✅ **Form Validation**: Client-side (Zod) + Server-side (express-validator)
- ✅ **Protected Routes**: JWT-based authentication for dashboard
- ✅ **Backend**: Node.js + Express.js with RESTful APIs
- ✅ **Authentication**: JWT-based signup/login with refresh tokens
- ✅ **Profile Management**: Fetch and update user profiles
- ✅ **CRUD Operations**: Complete task management system
- ✅ **Database**: Supabase (PostgreSQL) with indexed queries
- ✅ **Security**: bcrypt password hashing + JWT middleware
- ✅ **Error Handling**: Comprehensive validation and error responses
- ✅ **Scalable Code**: Modular structure with separation of concerns

### Dashboard Features (All Implemented ✅)
- ✅ **User Profile Display**: Fetched from backend with avatar support
- ✅ **CRUD Operations**: Full task management with real-time updates
- ✅ **Search UI**: Debounced search with instant filtering
- ✅ **Filter UI**: Status and priority filters
- ✅ **Logout Flow**: Secure token invalidation
- ✅ **Statistics Dashboard**: Real-time task analytics

### Bonus Features (Implemented 🎁)
- 🎁 **AI Chatbot Assistant**: Rule-based task automation (no API key required)
- 🎁 **Ethereal Beams Background**: 3D animated background using Three.js
- 🎁 **Glassmorphism UI**: Premium dark theme with blur effects
- 🎁 **Glowing Effects**: Interactive hover effects on cards
- 🎁 **Overdue Task Indicators**: Visual warnings for expired deadlines
- 🎁 **Instant Task Creation**: Modal-based workflow
- 🎁 **Performance Optimizations**: Blazing fast loading (150ms animations)
- 🎁 **Custom Branding**: Favicon and chatbot avatar

## 🚀 Features

### Authentication System
- JWT-based authentication (access + refresh tokens)
- Secure password hashing with bcrypt (12 rounds)
- Registration, Login, Logout, and Token Refresh
- Protected routes with middleware
- Persistent auth state across sessions
- "Remember me" functionality

### Task Management
- Full CRUD operations for tasks
- Search functionality with debouncing (300ms)
- Filter by status (Pending, In Progress, Completed)
- Filter by priority (Low, Medium, High)
- Grid and List view modes
- Real-time statistics and analytics
- Overdue task highlighting with red indicators
- Responsive dashboard with visual stats
- Task creation modal for instant workflow

### AI Chatbot Assistant 🤖
- **Rule-based intelligence** (no external API required)
- Natural language task creation: "Create task Buy Milk"
- Task deletion: "Delete task Deploy App"
- Task listing: "Show my pending tasks"
- Friendly conversational interface
- Custom avatar with gradient design
- Typing indicators and smooth animations

### User Experience
- **Premium Dark Theme** with glassmorphism effects
- **Ethereal Beams Background** - 3D animated beams using Three.js
- **Glowing Effects** on interactive elements
- Smooth animations with Framer Motion (optimized to 150ms)
- Loading skeletons for better perceived performance
- Toast notifications for all actions
- Empty states with helpful CTAs
- Mobile-first responsive design
- Form validation with Zod and React Hook Form
- Instant UI updates with optimistic rendering

## 📸 Screenshots

### Landing Page
- Hero section with animated gradient background and Ethereal Beams
- Feature showcase with glowing hover effects
- Testimonials and social proof
- Footer with navigation links

### Dashboard
- Statistics cards with animated counters and glowing borders
- Recent tasks overview with overdue indicators
- Quick actions for task management
- Responsive sidebar navigation with glassmorphism
- AI Chatbot floating button

### Tasks Page
- Grid/List view toggle
- Advanced search and filtering
- Task cards with status badges and priority indicators
- Add/Edit task modals
- Delete confirmation dialogs

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.0.4 | React framework with App Router |
| React | 18.2.0 | UI library |
| TypeScript | 5.3.3 | Type safety |
| TailwindCSS | 3.3.6 | Styling |
| Framer Motion | 10.16.16 | Animations |
| Three.js | Latest | 3D Beams background |
| @react-three/fiber | Latest | React renderer for Three.js |
| Axios | 1.6.2 | HTTP client |
| React Hook Form | 7.48.2 | Form management |
| Zod | 3.22.4 | Schema validation |
| Sonner | 1.3.1 | Toast notifications |
| Lucide React | 0.294.0 | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | Runtime |
| Express.js | 4.18.2 | Web framework |
| Supabase | 2.38.4 | Database & Auth |
| bcryptjs | 2.4.3 | Password hashing |
| jsonwebtoken | 9.0.2 | JWT tokens |
| express-validator | 7.0.1 | Request validation |
| cors | Latest | Cross-origin requests |
| dotenv | Latest | Environment variables |

## 📁 Project Structure

```
FrontendTaskGLM5/
├── client/                          # Next.js Frontend
│   ├── public/
│   │   ├── chatbot-avatar.png       # AI assistant avatar
│   │   └── favicon.png              # App favicon
│   ├── src/
│   │   ├── app/                     # Next.js App Router pages
│   │   │   ├── (auth)/              # Auth route group
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── (dashboard)/         # Protected route group
│   │   │   │   ├── dashboard/
│   │   │   │   ├── tasks/
│   │   │   │   ├── profile/
│   │   │   │   └── layout.tsx
│   │   │   ├── page.tsx             # Landing page
│   │   │   ├── layout.tsx           # Root layout
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── ui/                  # UI components
│   │   │   │   ├── glowing-effect.tsx
│   │   │   │   ├── beams-background.tsx
│   │   │   │   └── ethereal-beams-hero.tsx
│   │   │   ├── auth/                # Auth components
│   │   │   ├── dashboard/           # Dashboard components
│   │   │   │   ├── AIChatbot.tsx    # AI assistant
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Topbar.tsx
│   │   │   │   ├── StatsCards.tsx
│   │   │   │   ├── TaskCard.tsx
│   │   │   │   └── TaskForm.tsx
│   │   │   ├── landing/             # Landing page components
│   │   │   └── shared/              # Shared components
│   │   ├── context/
│   │   │   ├── AuthContext.tsx      # Auth provider
│   │   │   └── TaskContext.tsx      # Task state management
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useTasks.ts
│   │   │   └── useDebounce.ts
│   │   ├── lib/
│   │   │   ├── axios.ts
│   │   │   ├── utils.ts
│   │   │   └── validations.ts
│   │   └── types/
│   │       └── index.ts
│   ├── tailwind.config.ts
│   ├── next.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── server/                          # Express.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # Supabase connection
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── validate.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── utils/
│   │   │   ├── generateToken.js
│   │   │   └── apiResponse.js
│   │   └── app.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── postman/
│   └── PrimeTrade_API_Collection.json
├── SCALING_NOTES.md
├── README.md
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd FrontendTaskGLM5
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   
   # Create a .env file
   cp .env.example .env
   
   # Fill in your environment variables
   # SUPABASE_URL=your_supabase_project_url
   # SUPABASE_KEY=your_supabase_anon_key
   # JWT_SECRET=your_super_secret_jwt_key
   # JWT_REFRESH_SECRET=your_refresh_secret
   # FRONTEND_URL=http://localhost:3000
   
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   
   # Create a .env.local file
   cp .env.example .env.local
   
   # Set the API URL
   # NEXT_PUBLIC_API_URL=http://localhost:5000/api
   
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

4. **Database Setup (Supabase)**

   Create the following tables in your Supabase project:

   **users table:**
   ```sql
   CREATE TABLE users (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     avatar TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE INDEX idx_users_email ON users(email);
   ```

   **tasks table:**
   ```sql
   CREATE TABLE tasks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     title VARCHAR(500) NOT NULL,
     description TEXT,
     status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
     priority VARCHAR(50) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
     due_date TIMESTAMP,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE INDEX idx_tasks_user_id ON tasks(user_id);
   CREATE INDEX idx_tasks_status ON tasks(status);
   CREATE INDEX idx_tasks_priority ON tasks(priority);
   ```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": null,
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "accessToken": "jwt_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

#### POST /api/auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:** same as register endpoint

#### POST /api/auth/refresh
Refresh access token.

**Request Body:**
```json
{
  "refreshToken": "refresh_token"
}
```

#### POST /api/auth/logout
Logout user (requires authentication).

**Headers:**
```
Authorization: Bearer <access_token>
```

### User Endpoints

#### GET /api/users/profile
Get user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <access_token>
```

#### PUT /api/users/profile
Update user profile (requires authentication).

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Task Endpoints

#### GET /api/tasks
Get all tasks for authenticated user.

**Query Parameters:**
```
search=keyword
status=pending
priority=high
page=1
limit=10
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tasks": [...],
    "totalTasks": 25,
    "currentPage": 1,
    "totalPages": 3
  }
}
```

#### GET /api/tasks/stats
Get task statistics (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 25,
    "pending": 10,
    "inProgress": 8,
    "completed": 7,
    "highPriority": 5
  }
}
```

#### POST /api/tasks
Create a new task (requires authentication).

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish all features",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

#### PUT /api/tasks/:id
Update a task (requires authentication).

#### DELETE /api/tasks/:id
Delete a task (requires authentication).

## 🎨 Design System

### Colors
- **Background:** `#000000` (pure black)
- **Surface:** `#0a0a0f` (near-black)
- **Card:** `rgba(255, 255, 255, 0.05)` (glassmorphic)
- **Primary:** `#6366f1` (indigo) with gradient to `#8b5cf6` (violet)
- **Text:** `#ffffff` (primary), `rgba(255, 255, 255, 0.6)` (secondary)
- **Border:** `rgba(255, 255, 255, 0.1)`

### Typography
- **Font:** Inter
- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
All components follow a consistent design language with:
- Rounded corners (border-radius: 0.75rem - 1rem)
- Glassmorphism effects with backdrop blur
- Glowing borders on hover
- Smooth transitions (150ms - 300ms)
- Ethereal Beams background for depth

## 🔒 Security Features

- Passwords hashed with bcrypt (12 rounds)
- JWT access tokens (15 min expiry)
- JWT refresh tokens (7 day expiry)
- CORS configured for trusted origins
- Input validation on client and server
- Environment variables for sensitive data
- Protected routes with authentication middleware
- SQL injection prevention via parameterized queries
- XSS protection with input sanitization

## 📊 Performance Optimizations

- Code splitting with Next.js App Router
- Lazy loading of components
- Optimized images with Next.js Image
- Debounced search (300ms)
- Pagination for large datasets
- Efficient re-renders with React hooks
- Minified CSS and JS
- **Blazing fast animations** (150ms transitions)
- **Optimistic UI updates** (no loading flicker)
- **Cached task context** for instant navigation

## 🤖 AI Chatbot Features

The AI assistant is **completely self-contained** and requires **no external API keys**:

- **Rule-based NLP**: Pattern matching for task operations
- **Task Creation**: "Create task Buy Milk" → Instant task creation
- **Task Deletion**: "Delete task Deploy App" → Smart search and delete
- **Task Listing**: "Show my pending tasks" → Filtered task display
- **Conversational UI**: Typing indicators, smooth animations
- **Custom Avatar**: Branded AI brain design
- **Zero Dependencies**: No OpenAI, Anthropic, or other AI APIs needed

## 🚢 Deployment

**Live Application URL:** [https://primetrade-ai-frontend-task-nu.vercel.app/](https://primetrade-ai-frontend-task-nu.vercel.app/)

### Frontend (Vercel)
```bash
cd client
npm run build
vercel --prod
```

### Backend (Render/Railway)
```bash
cd server
npm start
# Deploy via Render dashboard or CLI
```

### Database (Supabase)
- Already configured with your Supabase project

## 📦 Deliverables

✅ **GitHub Repository**: Complete source code with clean structure
✅ **Functional Authentication**: Register/Login/Logout with JWT
✅ **Dashboard with CRUD**: Full task management system
✅ **API Documentation**: Comprehensive endpoint documentation
✅ **Scaling Notes**: See `SCALING_NOTES.md` for production strategies
✅ **Postman Collection**: `postman/PrimeTrade_API_Collection.json`

## 🎯 Evaluation Criteria Met

✅ **UI/UX Quality**: Premium dark theme with glassmorphism and 3D effects
✅ **Responsiveness**: Mobile-first design, works on all screen sizes
✅ **Frontend-Backend Integration**: Seamless API communication with error handling
✅ **Security Practices**: bcrypt hashing, JWT validation, input sanitization
✅ **Code Quality**: TypeScript, modular structure, clean code principles
✅ **Documentation**: Comprehensive README, API docs, scaling notes
✅ **Scalability**: Modular architecture, context-based state, optimized queries

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- PrimeTrade.ai for the opportunity
- Supabase for the excellent database service
- The open-source community for amazing tools and libraries

---

**Built for PrimeTrade.ai Frontend Developer Internship Task**

**Live Demo:** [https://primetrade-ai-frontend-task-nu.vercel.app/](https://primetrade-ai-frontend-task-nu.vercel.app/)

**Developed by:** Sharvari Anand  
**Contact:** saami@primetrade.ai, nagasai@primetrade.ai, chetan@primetrade.ai  
**CC:** sonika@primetrade.ai
