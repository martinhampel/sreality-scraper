CREATE DATABASE propertydb;

\c propertydb;

CREATE TABLE public."properties" (
    "propertyId" SERIAL PRIMARY KEY,
    "title" TEXT,
    "imageUrl" TEXT
);
