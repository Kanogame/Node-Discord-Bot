package httplistener

import (
	"encoding/json"
	"fmt"
	"io"
	databaseHandler "main/DatabaseHandler"
	utils "main/Utils"
	"net/http"
)

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
	err = databaseHandler.NewToken(db, post)
	if err != nil {
		utils.ClientErrorHandler(err)
		databaseHandler.RemoveTokenGuild(db, post.GuildId)
		err := databaseHandler.NewToken(db, post)
		if err != nil {
			fmt.Println(err)
			return
		}
	}
	db.Close()
	fmt.Println("success")
	fmt.Fprintf(w, "success")
}

func postGetPlayer(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var guildId = string(body)
	db := databaseHandler.CreateNewConnection()
	token := databaseHandler.GetTokenByGuild(db, guildId)
	db.Close()
	fmt.Println("success")
	fmt.Fprintf(w, token)
}

func postRemovePlayer(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var token = string(body)
	db := databaseHandler.CreateNewConnection()
	res := databaseHandler.RemoveToken(db, token)
	db.Close()
	if res {
		fmt.Fprintf(w, "success")
		fmt.Println("success")
	} else {
		fmt.Fprintf(w, "error")
	}

}

func postGetGuild(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var post utils.GetGuildJSON
	err = json.Unmarshal(body, &post)
	if err != nil {
		panic(err)
	}
	db := databaseHandler.CreateNewConnection()
	res := databaseHandler.GetGuildId(db, post)
	db.Close()
	var data = map[string]string{
		"guild": res,
	}
	jsonres, err := json.Marshal(data)
	w.Write([]byte(jsonres))
	fmt.Println("success")
}
