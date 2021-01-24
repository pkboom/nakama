docker-compose up

docker-compose down


https://heroiclabs.com/docs/runtime-code-basics/

dev
docker-compose -f docker-compose.yml up
docker-compose down --rmi all

database "y" does not exist (SQLSTATE 3D000)
https://forum.heroiclabs.com/t/problem-with-migrate-up-and-postgresql/313/6
In postgres, a user connects to a ‘database’ named the same as their username.
Create an empty database named the same as a user, it won’t be used beyond the migration process.

psql commands
https://www.postgresqltutorial.com/psql-commands/