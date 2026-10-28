# Docker GitHub CI/CD

A simple Node.js (Express) health-check application that is containerized with Docker and automatically tested and built using GitHub Actions.

## Features

- Express server with two endpoints:
  - `GET /` returns an application message
  - `GET /health` returns `{"status": "OK"}` with HTTP 200
- Automated tests using Node's built-in test runner (`node --test`)
- Lightweight Docker image based on `node:22-alpine`
- GitHub Actions workflow that tests the app and builds the Docker image on every push and pull request

## Tech Stack

- Node.js 22
- Express 5
- Docker
- GitHub Actions

## Project Structure

```
docker-practice/
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions workflow
├── docs/
│   └── github-actions-success.png   # Screenshot of a successful run
├── src/
│   └── server.js             # Express application
├── test/
│   └── server.test.js        # Automated tests
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
└── package-lock.json
```

## Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) 22 or newer
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/)

Check your versions:

```bash
node --version
npm --version
docker --version
```

## Setup Instructions (Run Locally)

1. **Clone the repository**

   ```bash
   git clone https://github.com/rana-shahrukh/docker-practice.git
   cd docker-practice
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the application**

   ```bash
   npm start
   ```

   You should see: `Server running on port 3000`

4. **Test it in another terminal (or your browser)**

   ```bash
   curl http://localhost:3000/
   curl http://localhost:3000/health
   ```

   Expected responses:

   ```json
   {"message":"Docker GitHub CI/CD application is running"}
   {"status":"OK"}
   ```

5. **Run the automated tests**

   ```bash
   npm test
   ```

## Docker Commands

**Build the image**

```bash
docker build -t docker-practice:1.0 .
```

**Run the container**

```bash
docker run -d --name docker-practice -p 3000:3000 docker-practice:1.0
```

> If port 3000 is already in use on your machine, map a different host port instead, for example `-p 3001:3000`, then open `http://localhost:3001`.

**Check that it is running**

```bash
docker ps
curl http://localhost:3000/health
```

**View logs**

```bash
docker logs docker-practice
```

**Stop and remove the container**

```bash
docker stop docker-practice
docker rm docker-practice
```

**List and remove the image**

```bash
docker image ls docker-practice
docker rmi docker-practice:1.0
```

### Environment Variables

| Variable   | Default | Description                  |
|------------|---------|------------------------------|
| `PORT`     | `3000`  | Port the server listens on   |
| `NODE_ENV` | `production` (in Docker) | Node environment |

## CI/CD Workflow Overview

The workflow is defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

**Triggers**

- Push to the `main` branch
- Pull requests targeting `main`

**Job: `test-and-build`** (runs on `ubuntu-latest`)

| Step | What it does |
|------|--------------|
| Checkout repository | Downloads the code using `actions/checkout@v4` |
| Setup Node.js | Installs Node.js 22 and caches npm packages using `actions/setup-node@v4` |
| Install dependencies | Runs `npm ci` for a clean, reproducible install |
| Run tests | Runs `npm test` (the build fails if any test fails) |
| Build Docker image | Runs `docker build -t docker-practice:${{ github.sha }} .` so each image is tagged with the commit SHA |

If any step fails, the workflow stops and the run is marked as failed, so broken code is caught early.

## Successful Workflow Run

Screenshot of a successful GitHub Actions run:

![GitHub Actions successful run](docs/github-actions-success.png)

## API Reference

| Method | Endpoint  | Response |
|--------|-----------|----------|
| GET    | `/`       | `{"message": "Docker GitHub CI/CD application is running"}` |
| GET    | `/health` | `{"status": "OK"}` (HTTP 200) |

## Author

**Muhammad Shahrukh**
GitHub: [@rana-shahrukh](https://github.com/rana-shahrukh)
