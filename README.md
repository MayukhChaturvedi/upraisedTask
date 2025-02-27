```markdown
# 🕵️♂️ IMF Gadget Management API

[![Deployed on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=)

A secure API for managing Impossible Missions Force (IMF) gadgets with self-destruct capabilities and mission success probability calculations.

## 📌 Overview

Built with:

- Node.js
- Express
- PostgreSQL
- Prisma (ORM)
- JWT Authentication

Implements mission-critical features:

- 🔒 Secure authentication/authorization
- 💣 Self-destruct sequences
- 🎰 Mission success probability generator
- 🕶️ Covert operation logging

## 🚀 Installation

1. Clone repo:
```

git clone https://github.com/MayukhChaturvedi/upraisedTask/
cd upraisedTask

```

2. Install dependencies:
```

npm install

```

3. Environment setup:
```

cp .env.example .env

# Configure your PostgreSQL database URL

```

4. Database setup:
```

npx prisma migrate dev --name init
npx prisma generate

```

5. Start server:
```

npm start

```

## 🔧 Environment Variables

```

PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/imf_gadgets"
JWT_SECRET="your_ultra_secure_secret"

```

## 🛠️ API Endpoints

### 🔑 Authentication
| Method | Endpoint    | Description          |
|--------|-------------|----------------------|
| POST   | /users/login | Get JWT token        |
| POST   | /users/signup| Create new agent     |

### 🧰 Gadget Management
| Method | Endpoint                      | Description                          |
|--------|-------------------------------|--------------------------------------|
| GET    | /api/gadgets?status=status    | List all gadgets with success odds   |
| POST   | /api/gadgets                  | Create new gadget                    |
| PATCH  | /api/gadgets/:id              | Update gadget details                |
| DELETE | /api/gadgets/:id              | Decommission gadget                  |
| POST   | /api/gadgets/:id/self-destruct| Initiate self-destruct sequence      |

## 📋 Example Requests

**Create Gadget:**
```

curl -X POST -H "Authorization: Bearer " -H "Content-Type: application/json" -d '{
"name": "Holographic Disguise Kit"
}' http://localhost:3000/api/gadgets

```

**Sample Response:**
```

{
"id": "550e8400-e29b-41d4-a716-446655440000",
"name": "The Chimera",
"status": "Available",
"successProbability": 78
}

```

## 🔒 Authentication
1. Get JWT token from `/users/login`
2. Include in headers:
```

Authorization: Bearer

```

## 🗄️ Data Models

### User
```

model User {
id String @id @default(uuid())
email String @unique
name String
password String
}

```

### Gadget
```

model Gadget {
id String @id @default(uuid())
name String
status Status @default(Available)
decommissionedAt DateTime?
}

enum Status {
Available
Deployed
Decommissioned
Destroyed
}

```

## 🚄 Deployment

1. Create Railway account
2. Import repository
3. Add environment variables
4. Deploy!

[![Deploy on Railway](https://railway.app/button.svg)](https://upraisedtask-production.up.railway.app/)
```
