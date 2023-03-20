package Utils

type User struct {
	Token    string
	Passhash string
}
type NewTokenJSON struct {
	token    string
	password string
	guildId  int
}
