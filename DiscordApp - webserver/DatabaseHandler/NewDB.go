package DatabaseHandler

import (
	"bufio"
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

func CreateNewConnection() *sql.DB {
	file, err := os.Open("./dbconn.txt")
	if err != nil {
		panic(err)
	}

	scanner := bufio.NewScanner(file)
	var textFile string
	for scanner.Scan() {
		textFile = scanner.Text()
	}
	fmt.Println(textFile)
	db, err := sql.Open("postgres", textFile)
	if err != nil {
		panic(err)
	}
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	return db
}
