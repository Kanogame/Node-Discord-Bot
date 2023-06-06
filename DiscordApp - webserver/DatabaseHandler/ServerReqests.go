package DatabaseHandler

import (
	"database/sql"
	utils "main/Utils"

	_ "github.com/lib/pq"
)

func NewToken(db *sql.DB, data utils.NewTokenJSON) error {
	_, err := db.Exec("INSERT INTO SessionTable (token, tokenPasswrd, guildid) VALUES($1, $2, $3)", data.Token, data.Password, data.GuildId)
	if err != nil {
		return err
	}
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
	queryRes.Close()
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
	queryRes.Close()
	return token
}

func RemoveToken(db *sql.DB, token string) bool {
	queryRes, err := db.Query("SELECT id FROM SessionTable WHERE token = $1", token)
	if err != nil {
		utils.ClientErrorHandler(err)
	}

	var id string

	for queryRes.Next() {
		err := queryRes.Scan(&id)
		utils.ClientErrorHandler(err)
	}
	queryRes.Close()

	_, err = db.Exec("DELETE FROM SessionTable WHERE id = $1", id)
	if err != nil {
		utils.ClientErrorHandler(err)
	}
	return true
}

func RemoveTokenGuild(db *sql.DB, Guild string) bool {
	queryRes, err := db.Query("SELECT id FROM SessionTable WHERE guildid = $1", Guild)
	if err != nil {
		utils.ClientErrorHandler(err)
	}

	var id string

	for queryRes.Next() {
		err := queryRes.Scan(&id)
		utils.ClientErrorHandler(err)
	}
	queryRes.Close()

	_, err = db.Exec("DELETE FROM SessionTable WHERE id = $1", id)
	if err != nil {
		utils.ClientErrorHandler(err)
	}
	return true
}
