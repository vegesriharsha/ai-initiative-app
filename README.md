# AI Initiative Ideas Collection App

A simple web application to collect AI initiative ideas from teams across your organization.

<img width="1796" height="977" alt="image" src="https://github.com/user-attachments/assets/17754b96-c536-468f-acb6-175203c3839b" />

## Project Structure

```
ai-initiative-app/
├── backend/           # Node.js Express server
├── frontend/          # Angular application
└── README.md         # This file
```

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
Server will run on http://localhost:3000

### 2. Frontend Setup
```bash
cd frontend
npm install
ng serve
```
Frontend will run on http://localhost:4200

### 3. Production Build
```bash
cd frontend
ng build
# Copy dist/ contents to backend/public/
cd ../backend
npm start
```
Access the full app at http://localhost:3000

## Features

- ✅ Simple idea submission form
- ✅ Real-time validation
- ✅ Ideas saved to JSON file on server
- ✅ Export to JSON/CSV/Text formats
- ✅ Responsive design
- ✅ No database required
- ✅ Offline fallback using localStorage

## Data Storage

Ideas are stored in `backend/ai_ideas.json` file in the following format:
```json
[
  {
    "id": "idea_1642123456789_abc123",
    "teamName": "Engineering",
    "submitterName": "John Doe",
    "submitterEmail": "john@company.com",
    "ideaTitle": "Automated Code Review",
    "ideaDescription": "Implement AI-powered code review...",
    "category": "automation",
    "priority": "high",
    "estimatedImpact": "significant",
    "submissionDate": "2025-07-16T10:30:00.000Z"
  }
]
```

## API Endpoints

- `POST /api/submit-idea` - Submit new idea
- `GET /api/ideas` - Get all ideas
- `GET /api/ideas/team/:teamName` - Get ideas by team
- `GET /api/export/json` - Download JSON export
- `GET /api/export/csv` - Download CSV export
- `GET /api/health` - Health check

## Support

For issues or questions, check the console logs or contact your development team.
