start-frontend:
	cd app && npm run dev

start-backend:
	cd backend && npm run start:dev

all: 
	docker-compose up -d
	pnpm run start
