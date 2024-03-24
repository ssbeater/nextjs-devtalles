# Development
Set up the app for development

1. Install dependencies and try to run the app by first time
```
npm install
npm run dev
```
2. Set up database
```
docker compose up -d
```
3. Rename .env.template
4. Replace environment variables
5. Run app and execute seed to [create local database](http://localhost:3000/api/seed)

### Note: Default development user
__user:__ test1@gmail.com
__pssd:__ 123456

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```