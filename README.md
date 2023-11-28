# Dental Transactions Monorepo

Manage dental operations by registering procedures performed (income) and costs (outcome).

- `/app:` Frontend of Dental Transactions application using React
- `/backend:` Backend of Dental Transactions application using Node with Nest Framework

## Prerequisites

What things you need to install the software and how to install them.

- [Git](https://git-scm.com/)
- [NPM](https://www.npmjs.com/)
- [Node](https://nodejs.org/en/) `>=18.0.0` (We recommend you install it using [NVM](https://github.com/nvm-sh/nvm))
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Getting secrets

- Copy the [.env.example](./backend/.env.example) to a new file `.env` . This file is in the .gitignore to avoid exposing credentials unintentionally.
  Inside the `.env` file are the secret paths, replace the values ​​with the content of each one of them.

2. Install dependencies

```bash
$ nvm use && npm install
```

## Running Local:

- Starting all services:

```bash
  make all
```

- Starting only frontend:

```bash
  make start-frontend
```

- Starting only backend:

```bash
  make start-backend
```
