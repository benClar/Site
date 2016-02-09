if [ ! -f db/site.sql ]; then
	sqlite3 db/site.sql < scripts/create.sql
	if [ $1 == "-f" ]; then
		echo "overwrite"
	fi
else
	echo "File already exists: please delete"
fi
