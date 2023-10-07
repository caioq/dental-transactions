start-frontend:
	cd app && npm run dev

start-backend:
	cd backend && npm run start:dev

all: 
	pnpm run start
