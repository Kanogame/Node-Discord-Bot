package dbutils

import (
	"database/sql"
	utils "main/utils"
	"strconv"

	_ "github.com/lib/pq"
)

func GetQueueByToken(db *sql.DB, user utils.User) int {
	queryRes, err := db.Query("SELECT queueid, tokenpasswrd FROM SessionTable \nWHERE token = ?", user.token)
	if err != nil {
		panic(err)
	}

	var res []string

	for queryRes.Next() {
		err := queryRes.Scan(res[0], res[1])
		if err != nil {
			panic(err)
		}
	}

	if res[1] == user.passhash {
		return 0
	}
	queueId, err := strconv.Atoi(res[0])
	if err != nil {
		panic(err)
	}
	return queueId
}
