USR="postgres"
DB="game"

#Removing DB and recreating
psql -U $USR -v dbname=$DB -f db/dropdb.sql
printf "creating database... \n DB: $DB \n owner: $USR\n"
createdb -p 5432 -U $USR $DB

#Running script to recreate schema
#psql -U $USR -d $DB -f db/site.sql
