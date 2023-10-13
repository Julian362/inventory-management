﻿#!/bin/bash

IFS=',' read -ra DB_NAMES <<< "$DB_NAMES"

for DB_NAME in "${DB_NAMES[@]}"; do
    echo "Creando base de datos: $DB_NAME"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        CREATE DATABASE "$DB_NAME";
EOSQL
done

for DB_NAME in "${DB_NAMES[@]}"; do
    echo "Configurando base de datos: $DB_NAME"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" <<-EOSQL
        CREATE TABLE public.user (
        "userId" uuid PRIMARY KEY,
        name varchar(30),
        email varchar(50) UNIQUE,
        password varchar(20),
        role varchar(30),
        branchId uuid
    );

    INSERT INTO public.user (
        "userId",
        name,
        email,
        password,
        role,
        branchId
    )
    SELECT
        '35a64a10-8288-4d8c-bc20-1aad606eff15',
        'SuperAdmin',
        'superadmin@superadmin.com',
        'superadmin',
        'superAdmin',
        null
    WHERE NOT EXISTS (
        SELECT 1
        FROM public.user
    );
EOSQL
done
