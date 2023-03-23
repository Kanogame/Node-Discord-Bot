package DatabaseHandler

import (
	"database/sql"
	"fmt"
	utils "main/Utils"
	"strconv"

	_ "github.com/lib/pq"
)

func GetQueueByToken(db *sql.DB, user utils.User) int {
	queryRes, err := db.Query("SELECT queueid, tokenpasswrd FROM SessionTable WHERE token = $1", user.Token)
	if err != nil {
		panic(err)
	}

	var res = make([]string, 2)

	for queryRes.Next() {
		err := queryRes.Scan(&res[0], &res[1])
		if err != nil {
			panic(err)
		}
	}

	if res[1] == user.Passhash {
		return 0
	}
	queueId, err := strconv.Atoi(res[0])
	if err != nil {
		panic(err)
	}
	return queueId
}

func NewToken(db *sql.DB, data utils.NewTokenJSON) {
	res, err := db.Exec("INSERT INTO SessionTable (token, tokenPasswrd, guildid) VALUES($1, $2, $3)", data.Token, data.Password, data.GuildId)
	if err != nil {
		panic(err)
	}
	fmt.Println(res)
}

func GetGuildId(db *sql.DB, data utils.GetTokenJSON) string {
	queryRes, err := db.Query("SELECT guildid, tokenpasswrd FROM SessionTable WHERE token = $1", data.Token)
	if err != nil {
		panic(err)
	}

	var pass string
	var guildid string

	for queryRes.Next() {
		err := queryRes.Scan(guildid, &pass)
		if err != nil {
			panic(err)
		}
	}
	if pass != data.Password {
		return ""
	}
	return guildid
}
