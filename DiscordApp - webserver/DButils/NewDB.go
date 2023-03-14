package dbutils

import (
	"bufio"
	"database/sql"
	"os"

	_ "github.com/lib/pq"
)

func CreateNewConnection() *sql.DB {
	file, err := os.Open("./Configs/ServerList.txt")
	if err != nil {
		panic(err)
	}

	scanner := bufio.NewScanner(file)
	textFile := scanner.Text()

	db, err := sql.Open("postgres", textFile)
	if err != nil {
		panic(err)
	}

	return db
}
