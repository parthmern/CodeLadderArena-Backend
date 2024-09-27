# CodeLadderArena-Problem-Service

## How routing is working in the project
- /api/v1/problems/ping
    - because the route starts with /api 
    - /api      -> /v1      -> /problems     -> /ping 
    - apiRouter -> v1Router -> problemRouter -> problemController -> service layer


## why no sql db here(mongo db) ?

- actually for each problem there are many test cases. and these test cases are not going to be similar for other problems. so no two problem have similar test cases.
- also we are going to store them in array where multiple test cases are there for each problem
- in sql, u have to manage multiple tables for making this more normalized. 
- there is not many relationship between many entities here
- there is not transactional data (like payment, booking)
- this is unstructured data

## db drivers

- https://chatgpt.com/share/66ecf222-2910-8010-a8e5-6efa0540936f

- your backend app are able to make stable connection with DB

## ORM and ODM

- https://chatgpt.com/share/66ecf2f8-4714-8010-b560-5bd7d491b118

- mongoosse is ODM for mongodb
- prisma, sequalize, drizzle are ORM for sql

## azure COSMOS db

- no sql db
- want to do logging beacuse of efficient searching/querying
- 
