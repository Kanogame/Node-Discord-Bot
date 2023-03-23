package Utils

type User struct {
	Token    string
	Passhash string
}

type NewTokenJSON struct {
	Token    string
	Password string
	GuildId  string
}

type GetGuildJSON struct {
	Token    string
	Password string
}

type RemoveTokenJSON struct {
	Token string
	GuildId string
}
