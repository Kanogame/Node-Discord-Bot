package httplistenerclient

import (
	"encoding/json"
	"fmt"
	"io"
	databaseHandler "main/DatabaseHandler"
	utils "main/Utils"
	"net/http"
	"net/url"
)

func postPlayerPause(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var post utils.PauseJSON
	err = json.Unmarshal(body, &post)
	if err != nil {
		panic(err)
	}
	var getGuild utils.GetGuildJSON
	getGuild.Token = post.Token
	getGuild.Password = post.Password
	db := databaseHandler.CreateNewConnection()
	guildid := databaseHandler.GetGuildId(db, getGuild)

	data := url.Values{
		"guildid": {guildid},
	}

	resp, err := http.PostForm("http://localhost:13532/player/pause", data)
	var success map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&success)
	fmt.Println(success)
}
