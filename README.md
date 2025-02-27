# 🕵️♂️ IMF Gadget Management API

[![Deployed on Railway](https://img.shields.io/badge/Deployed%20on-Railway-purple)](https://upraisedtask-production.up.railway.app/)

A secure API for managing Impossible Missions Force (IMF) gadgets with self-destruct capabilities and mission success probability calculations.

## 📌 Overview

### Built with:

- Node.js & Express
- PostgreSQL & Prisma ORM
- JWT Authentication

### Key Features:

- 🔒 Secure authentication/authorization
- 💣 Self-destruct sequences
- 🎰 Mission success probability generator
- 🕶️ Covert operation logging

## 🚀 Quick Start
```bash
# 1. Clone repo
git clone https://github.com/MayukhChaturvedi/upraisedTask/
cd upraisedTask

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env

# 4. Initialize database
npx prisma migrate dev --name init
npx prisma generate

# 5. Launch server
npm start
```


## 🔧 Environment Setup

```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/imf_gadgets"
JWT_SECRET="your_ultra_secure_secret"
```

## 🛠️ API Reference

### Authentication Endpoints

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| POST   | /users/login  | Get JWT token |
| POST   | /users/signup | Create agent  |

### Gadget Operations

| Method | Endpoint                       | Description            |
| ------ | ------------------------------ | ---------------------- |
| GET    | /api/gadgets                   | List gadgets with odds |
| POST   | /api/gadgets                   | Create gadget          |
| PATCH  | /api/gadgets/:id               | Update gadget          |
| DELETE | /api/gadgets/:id               | Decommission gadget    |
| POST   | /api/gadgets/:id/self-destruct | Trigger self-destruct  |

## 📋 Usage Examples

### Create Gadget

```bash
curl -X POST \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    -d '{"name": "Holographic Disguise Kit"}' \
    http://localhost:3000/api/gadgets
```

### Response

```json
{
	"id": "550e8400-e29b-41d4-a716-446655440000",
	"name": "The Chimera",
	"status": "Available",
	"successProbability": 78
}
```

## 🗄️ Data Schema

### User Model

```prisma
model User {
    id       String @id @default(uuid())
    email    String @unique
    name     String
    password String
}
```

### Gadget Model

```prisma
model Gadget {
    id              String    @id @default(uuid())
    name            String
    status          Status    @default(Available)
    decommissionedAt DateTime?
}

enum Status {
    Available
    Deployed
    Decommissioned
    Destroyed
}
```

## 🚄 Deploy

1. Sign up on Railway
2. Import repository
3. Configure environment
4. Deploy
