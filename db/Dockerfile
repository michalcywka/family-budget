FROM postgres:latest
ENV POSTGRES_PASSWORD=admin1234
ENV POSTGRES_USER=admin
ENV POSTGRES_DB=budget
COPY dbinit.sql /docker-entrypoint-initdb.d/dbinit.sql
