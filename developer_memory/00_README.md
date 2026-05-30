# Developer Memory

## Overview
This directory contains AI memory files that document important project decisions, context, and guidelines for the VistaHaven real estate platform development.

## Directory Structure
```
developer_memory/
├── 00_README.md              # This file - overview
├── 01_PROJECT_CONTEXT.md      # Project context and goals
├── 02_DECISION_LOG.md        # Key architectural decisions
├── 03_ISSUE_LEDGER.md       # Known issues and bugs
├── 04_TECHNICAL_STANDARDS.md # Coding standards and conventions
├── 05_API_REFERENCE.md       # API documentation
├── 06_WORKFLOW_GUIDES.md    # Development workflows
├── 07_TEST_STATUS.md        # Testing status
├── 08_KNOWLEDGE_BASE.md     # General knowledge base
└── 09_SESSION_LOG.md        # Daily session summaries
```

## Project Architecture

### System Overview (Docker-Enabled)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         VistaHaven Platform (Development)                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    Docker (Backend Services)                          │  │
│  │  ┌───────────────────┐         ┌──────────────────────────────┐      │  │
│  │  │   PostgreSQL     │         │   Payload CMS + Admin         │      │  │
│  │  │   Container       │         │   Container                  │      │  │
│  │  │   Port: 5433 (ext)│         │   Port: 3010 (ext)           │      │  │
│  │  │   Port: 5432 (int)│         │   Port: 3000 (int)           │      │  │
│  │  └───────────────────┘         └──────────────────────────────┘      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                    │                                         │
│                                    │ REST API                                │
│                                    ▼                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    Public Frontend (Vite)                             │  │
│  │                    localhost:5173                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Two Main Applications + Docker

| Application | Port | Purpose | Tech Stack | Location |
|-------------|------|---------|------------|----------|
| **Frontend** | 5173 | Public website for property browsing | Vite + React | Local |
| **Payload CMS** | **3010** | REST API + Admin Panel | Payload v3 + Next.js | Docker |
| **PostgreSQL** | **5433** | Database | PostgreSQL 16 | Docker |

**Note:** Docker uses ports 5433 and 3010 to avoid conflicts with local services running on 5432 and 3000.

### Docker Setup Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Orchestrates PostgreSQL + Payload containers |
| `real-estate-backend/Dockerfile` | Multi-stage build for Payload CMS |
| `.env.docker.example` | Template for Docker environment variables |

---

## Key Files

### Session Log (09_SESSION_LOG.md)
- Daily work tracking and summaries
- Append new sessions at the end
- Include: work done, files created/modified, decisions made, next steps

### Decision Log (02_DECISION_LOG.md)
- Append new decisions at TOP of file (most recent first)
- Include: context, alternatives considered, consequences

---

## Update Protocol
1. After each development session, update 09_SESSION_LOG.md
2. When adding new decisions, prepend to 02_DECISION_LOG.md
3. When changing architecture, update 01_PROJECT_CONTEXT.md
4. When adding issues, prepend to 03_ISSUE_LEDGER.md
