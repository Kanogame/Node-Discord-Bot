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
