#!/usr/bin/env bash

## NOTE: To avoid having to key in the password everytime, create a .pgpass file in your home directory
## touch ~/.pgpass
## chmod 0600 ~/.pgpass
## nano ~/.pgpass

## Each line of the file should follow this format:
## host:port:database:username:password

## Dump schema and data
pg_dump --no-owner -C -c -v -h ec2-174-129-227-116.compute-1.amazonaws.com -p 5432 -U gpdupncyuihhgq -d deumhc9cj04td6 -f storewalk_dev.sql

## Restore the database
# psql -h localhost -U postgres -p 50003 -f ltg_blue.sql

# postgres://gpdupncyuihhgq:71620b13db76193da62b18e3280632f2b2548733adb4ab3685da372854207b1a@ec2-174-129-227-116.compute-1.amazonaws.com:5432/deumhc9cj04td6