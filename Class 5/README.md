# Class 5: Personal AI Clone Portfolio

A personal AI clone portfolio website built with **Next.js 14**, **React 18**, **TypeScript**, and modern CSS.

## 📁 Directory Structure

```
Class 5/
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── Linkedin.pdf              # Resume / Profile reference
├── README.md                 # Documentation
└── Personal AI Clone/        # Next.js Application
    ├── app/
    │   ├── globals.css       # Global styles and design system
    │   ├── layout.tsx        # App layout and metadata
    │   ├── not-found.tsx     # 404 page
    │   └── page.tsx          # Main interactive portfolio & clone UI
    ├── package.json          # Node dependencies & scripts
    ├── tsconfig.json         # TypeScript configuration
    └── next-env.d.ts
```

## 🚀 Getting Started

### 1. Install Dependencies
Navigate to the `Personal AI Clone` folder and install packages:

```bash
cd "Personal AI Clone"
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in the project root:

```bash
cp ../.env.example .env
```
Add your API keys inside `.env` if needed:
```env
OPEN_ROUTER_API_KEY=your_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
