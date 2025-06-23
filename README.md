# 🌾 Farming Scheme Application

A full-stack web application that helps farmers discover, apply for, and track government agriculture schemes based on their eligibility. The application supports registration, login, profile management, financial details, and real-time application status tracking.

## Overview

The Farmer Schemes Portal is a comprehensive platform designed to connect farmers with government agricultural schemes and resources. This platform bridges the gap between farmers and government initiatives by providing easy access to scheme information, application processes, and agricultural resources.

## 🌐 Hosted links
- Front-end: [https://agriculture-schemes-9a11.vercel.app](https://agriculture-schemes-9a11.vercel.app/)
- Back-end : [https://agriculture-schemes.onrender.com](https://agriculture-schemes.onrender.com/)

## Features

### For Farmers
- **Scheme Discovery**: Browse and search through various central and state agricultural schemes
- **Scheme Comparison**: Compare different schemes to find the most suitable options
- **Online Application**: Apply for schemes directly through the portal
- **Document Management**: Upload and manage required documents
- **Application Tracking**: Track application status in real-time
- **User Dashboard**: Personalized dashboard showing applied schemes and application status
- **Crop Information**: Access detailed information about various crops
- **Profile Management**: Manage personal and bank details

### For Administrators
- **Scheme Management**: Add, edit, and manage scheme information
- **Application Processing**: Review, approve, or reject scheme applications
- **Crop Database**: Maintain and update crop information
- **Analytics Dashboard**: View statistics on scheme applications and approvals
- **Document Verification**: Verify uploaded documents

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Setup Instructions

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/farming-scheme-app.git
cd farming-scheme-app 
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
farmer-schemes-portal/
├── app/                    # Next.js app directory
│   ├── admin/              # Admin pages
│   ├── apply/              # Scheme application pages
│   ├── crops/              # Crop information pages
│   ├── schemes/            # Scheme listing pages
│   ├── user/               # User dashboard and profile pages
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page
├── backend                 # Backend code
│    ├── Controllers
│    │    ├── apploicationController.js
│    │    ├── authController.js
│    │    ├── cropController.js
│    │    ├── schemeController.js
│    │    ├── userController.js
│    ├── Middleware
│    │    ├── authMiddleware.js
│    ├── Models
│    │    ├── Application.js
│    │    ├── Crop.js
│    │    ├── Scheme.js
│    │    ├── Users.js
│    ├── Public
│    │    ├── images
│    ├── Routes
│    │    ├── applications.js
│    │    ├── auth.js
│    │    ├── crops.js
│    │    ├── schemes.js
│    │    ├── user.js
│    ├── Utils
│    │    ├── savefiles.js
│    │    ├── token.js
│    ├── app.js
│    ├── package-lock.json
│    ├── package.json
├── components/             # Reusable components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Page footer
│   ├── Sidebar.tsx         # Dashboard sidebar
│   ├── SchemeCard.tsx      # Scheme display card
│   └── ...                 # Other components
├── public/                 # Static assets
│   └── images/             # Image files
├── utils/                  # Utility functions
│   ├── mockdata.ts         # Mock data for development
│   └── theme.ts            # Theme configuration
├── .env.local              # Environment variables (create this file)
├── package.json            # Project dependencies
├── tailwind.config.ts      # Tailwind CSS configuration
└── README.md               # Project documentation
```

## Technologies Used

- **Frontend**:
  - Next.js 14 (React framework)
  - TypeScript
  - Tailwind CSS for styling
  - React Hook Form for form handling

- **Backend**:
  - Express.js
  - Mongo DB Atlas
  - Json web tokens 

- **State Management**:
  - React Context API
  - React Hooks

- **Authentication**:
  - JWT (JSON Web Tokens)
  - HTTP-only cookies for token storage

- **UI Components**:
  - Custom components
  - Responsive design for mobile and desktop

## Usage Guide

### Farmer User Flow

1. **Registration/Login**:
   - Create a new account or log in with existing credentials
   - Complete profile information including personal and bank details

2. **Discovering Schemes**:
   - Browse schemes on the home page or schemes section
   - Use filters to find schemes by category, state, or eligibility
   - View detailed information about each scheme

3. **Applying for Schemes**:
   - Select a scheme and click "Apply"
   - Fill out the application form
   - Upload required documents
   - Submit application

4. **Tracking Applications**:
   - View all applications in the user dashboard
   - Check status (Pending, Approved, Rejected)
   - Receive notifications about application updates

### Administrator User Flow

1. **Login**:
   - Access the admin panel through the admin login page

2. **Managing Schemes**:
   - Add new schemes with details, eligibility criteria, and required documents
   - Edit existing scheme information
   - Activate or deactivate schemes

3. **Processing Applications**:
   - Review submitted applications
   - View uploaded documents
   - Approve or reject applications with comments
   - Track application statistics


# 🚀 Optimization Techniques

**✅ Code-Level**
- Avoid unnecessary re-renders using `React.memo`
- Used modular structure for controllers and routes
- Removed redundant database calls

**✅ Architecture-Level**
- Stateless APIs
- Decoupled frontend and backend
- API versioning for scalability
- Asynchronous functions for I/O operations

**✅ Database-Level**
- Indexed key fields like user ID and scheme ID
- Avoided nested loops in queries
- Used pagination in listing endpoints

---


## 🧪 Testing

**Manual Test Cases**

| Test cases | Inpute | Expected output |
|---|---|---|
| Register a farmer | name, email, password, Phone | Success massege and JWT Token|
| Login with valid credentials | Email, Password | Redirect to dashboard |
| Apply for a scheme | fill the needed information | Application submitted message |
| Admin login | Email, Password (Admin) | Admin dashboard with scheme, crops, applications control |
| Try access dashboard without logging in | - | Redirect to login page with 401 error |
## Contributors

This is a group project made with the efforts of each contributor **👨‍💻**

1. **[Atul Mishra](https://github.com/AtulMishra001) :** 
 contributed by 
 - Developing the RESTful API.
 - Integration of Front-end, Back-end.
 - Deployment of Front-end(on Vercel), Back-end(on rander)

2. **[Anurag Singh](https://github.com/manvesingh) :**
- contributed by creating a responsive and optimized Front-end.

3. **[Praveen Kumar](https://github.com/praveenpal21) :**
- Contributed by writting Documentation and creating test cases for better development.