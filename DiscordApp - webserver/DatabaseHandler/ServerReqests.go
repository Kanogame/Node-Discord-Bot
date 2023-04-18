package DatabaseHandler

import (
	"database/sql"
	"fmt"
	utils "main/Utils"

	_ "github.com/lib/pq"
)

func NewToken(db *sql.DB, data utils.NewTokenJSON) error {
	res, err := db.Exec("INSERT INTO SessionTable (token, tokenPasswrd, guildid) VALUES($1, $2, $3)", data.Token, data.Password, data.GuildId)
	if err != nil {
		return err
	}
	fmt.Println(res)
	return nil
}

func GetGuildId(db *sql.DB, data utils.GetGuildJSON) string {
	queryRes, err := db.Query("SELECT guildid, tokenpasswrd FROM SessionTable WHERE token = $1", data.Token)
	if err != nil {
		panic(err)
	}

	var pass string
	var guildid string

	for queryRes.Next() {
		err := queryRes.Scan(&guildid, &pass)
		if err != nil {
			panic(err)
		}
	}
	if pass != data.Password {
		fmt.Println("$" + pass + "$")
		fmt.Println("$" + data.Password + "$")
	}
	fmt.Println(guildid)
	return guildid
}

func GetTokenByGuild(db *sql.DB, guild string) string {
	queryRes, err := db.Query("SELECT token FROM SessionTable WHERE guildid = $1", guild)
	if err != nil {
		panic(err)
	}

	var token string

	for queryRes.Next() {
		err := queryRes.Scan(&token)
		if err != nil {
			panic(err)
		}
	}

	return token
}

func RemoveToken(db *sql.DB, guildId string) bool {
	fmt.Println(guildId)
	res, err := db.Query("SELECT id FROM SessionTable WHERE guildid = $1", guildId)
	if err != nil {
		panic(err)
	}

	var id string

	for res.Next() {
		err := res.Scan(&id)
		utils.ClientErrorHandler(err)
	}

	fmt.Println(id)

	ress, err := db.Exec("DELETE FROM SessionTable WHERE id = $1", id)
	if err != nil {
		panic(err)
	}

	fmt.Println(ress)
	return true
}