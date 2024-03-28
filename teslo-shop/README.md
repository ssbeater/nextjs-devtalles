# Teslo Shop | Learning Next JS

## Setup Development Enviroment
1. Clone repository.
2. Create a copy of ```.env.template``` to ```.env``` file and change the enviroment variables.
3. Install dependencies ```npm install```
4. Setup the data base ```docker compose up -d```
5. Run Prisma migration ```npx prisma migrate dev --name init```
6. Execute seed ```npm run seed```
7. Run the proyect ```npm run dev```

## Prisma commands
```
npx prisma init --datasource-provider PostgreSQL
npx prisma migrate dev
npx prisma generate
```