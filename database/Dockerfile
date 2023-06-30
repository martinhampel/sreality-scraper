FROM postgres:15

# Copy the modified init.sql script into the docker-entrypoint-initdb.d directory
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432