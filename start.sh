#!/usr/bin/env bash

# Bring up Containers, enable RabbitMQ Plugins
docker-compose up -d && docker-compose exec rabbitmq rabbitmq-plugins enable rabbitmq_management