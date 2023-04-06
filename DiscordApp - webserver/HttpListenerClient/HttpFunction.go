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

	data := []byte(fmt.Sprintf(`"guildid":"%v"`, guildid))

	resp, err := http.NewRequest("POST", "http://localhost:13532/player/pause", bytes.NewBuffer(data))
	var success map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&success)
	fmt.Println(success)
}
