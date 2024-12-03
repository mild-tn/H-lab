Start Project
1. run docker-compose to start databbase:
   ```docker-compose up```
2. start
   - api
     ```cd master-data-service && yarn migration:up && yarn start:dev```
   - front-end
     ```cd front-end && yarn dev```
   
