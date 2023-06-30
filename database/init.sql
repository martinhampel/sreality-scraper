SELECT 'CREATE DATABASE propertydb' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'propertydb')\gexec

\c propertydb;

CREATE TABLE public."properties" (
    "propertyId" SERIAL PRIMARY KEY,
    "title" TEXT,
    "imageUrl" TEXT
);
