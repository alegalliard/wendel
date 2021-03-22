
run_postgres()
{
    echo "==> Subindo PostgreSQL"
    docker run \
        --name postgres \
        -e POSTGRES_USER=admin \
        -e POSTGRES_PASSWORD=adminLocal \
        -e POSTGRES_DB=troubleshoot \
        -p 5432:5432 \
        -d \
        postgres

#entrar no container
# docker exec -it postgres /bin/bash
}

run_adminer()
{
    echo "==> Subindo o Adminer"
    docker run \
        --name adminer \
        -p 8088:8080 \
        --link postgres:postgres \
        -d \
        adminer
}

run_mongo()
{
    echo "==> Subindo o Mongodb"
    docker run \
        --name mongodb \
        -p 27017:27017 \
        -e MONGO_INITDB_ROOT_USERNAME=admin \
        -e MONGO_INITDB_ROOT_PASSWORD=adminLocal \
        -d \
        mongo:4
}

run_mongo_client()
{
    echo "==> Subindo o Mongoclient"
    docker run \
        --name mongoclient \
        -p 3030:3000 \
        --link mongodb:mongodb \
        -d \
        mongoclient/mongoclient
}

config_mongo()
{
  echo "==> Configurando tabela no Mongo"
  docker exec -it mongodb \
    mongo --host localhost -u admin -p adminLocal --authenticationDatabase admin \
    --eval "db.getSiblingDB('troubleshoot').createUser({user: 'aless', pwd: 'adminLocal', roles: [{role: 'readWrite', db: 'troubleshoot'}]})"

}



echo "Instalar PostgreSQL? (y/n)"
read INSTALL_POSTGRE

if [ $INSTALL_POSTGRE = "y" ]
then
  run_postgres
  run_adminer
fi


echo "Instalar Mongodb? (y/n)"
read INSTALL_MONGO

if [ $INSTALL_MONGO = "y" ]
then
  run_mongo
  run_mongo_client
  config_mongo
fi
