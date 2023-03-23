package httplistener

import (
	"encoding/json"
	"fmt"
	"io"
	databaseHandler "main/DatabaseHandler"
	utils "main/Utils"
	"net/http"
)

func postGetType(r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	res := string(body)
	fmt.Println(res)
	postType = res
}

func postNewPlayer(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var post utils.NewTokenJSON
	err = json.Unmarshal(body, &post)
	if err != nil {
		panic(err)
	}
	db := databaseHandler.CreateNewConnection()
	databaseHandler.NewToken(db, post)
	fmt.Fprintf(w, "success")
	postType = ""
}

func postGetPlayer(w http.ResponseWriter, r *http.Response) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var guildId string
	err = json.Unmarshal(body, &guildId)
	if err != nil {
		panic(err)
	}
	db := databaseHandler.CreateNewConnection()
	token := databaseHandler.GetTokenByGuild(db, guildId)
	fmt.Fprintf(w, token)
}

func postRemovePlayer(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var token string
	err = json.Unmarshal(body, &token)
	if err != nil {
		panic(err)
	}
	db := databaseHandler.CreateNewConnection()
	res := databaseHandler.RemoveToken(db, token)
	if res {
		fmt.Fprintf(w, "success")
	} else {
		fmt.Fprintf(w, "error")
	}
}
