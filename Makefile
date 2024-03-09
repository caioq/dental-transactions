run-migrations:
	cd backend && npm run prisma:migrate && npm run prisma:generate && npm run prisma:seed

install:
	npm install
	cd app && npm install
	cd backend && npm install

build:
	cd backend && npm run prisma:generate

start-frontend:
	cd app && npm run dev

start-backend:
	cd backend && npm run start:dev

all:
	docker-compose up -d
	pnpm run start

setup: install build run-migrations all
