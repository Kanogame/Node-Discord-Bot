package httplistenerclient

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	databaseHandler "main/DatabaseHandler"
	utils "main/Utils"
	"net/http"
)

func postPlayerPause(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var post utils.PauseJSON
	fmt.Println(string(body))
	err = json.Unmarshal(body, &post)
	if err != nil {
		panic(err)
	}
	var getGuild utils.GetGuildJSON
	getGuild.Token = post.Token
	getGuild.Password = post.Password
	db := databaseHandler.CreateNewConnection()
	guildid := databaseHandler.GetGuildId(db, getGuild)

	postBody, err := json.Marshal(map[string]string{
		"guildid": guildid,
	})
	utils.ClientErrorHandler(err)
	responseBody := bytes.NewBuffer(postBody)

	resp, err := http.Post("http://localhost:13532/player/pause", "application/json", responseBody)
	var success map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&success)
	fmt.Println(success)
	db.Close()
}
