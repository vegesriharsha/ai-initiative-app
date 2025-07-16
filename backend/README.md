# Backend Setup Instructions

## Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on http://localhost:3000

## File Storage

All submitted ideas are stored in `ai_ideas.json` in the backend directory. This file is automatically created when the first idea is submitted.

## API Testing

You can test the API endpoints using curl or any HTTP client:

```bash
# Health check
curl http://localhost:3000/api/health

# Get all ideas
curl http://localhost:3000/api/ideas

# Submit an idea (example)
curl -X POST http://localhost:3000/api/submit-idea \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test_123",
    "teamName": "Engineering",
    "submitterName": "Test User",
    "submitterEmail": "test@example.com",
    "ideaTitle": "Test Idea",
    "ideaDescription": "This is a test idea",
    "category": "automation",
    "priority": "medium",
    "estimatedImpact": "moderate",
    "submissionDate": "2025-07-16T10:00:00.000Z"
  }'
```

## Troubleshooting

- Make sure port 3000 is not in use by another application
- Check the console for any error messages
- Ensure you have write permissions in the backend directory for the JSON file
