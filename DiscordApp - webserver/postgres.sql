CREATE TABLE SessionTable (
    id SERIAL PRIMARY KEY,
    token        CHAR(24)    NOT NULL UNIQUE,
    tokenPasswrd CHAR(24)    NOT NULL UNIQUE,
    guildid      INT         NOT NULL UNIQUE);

--@block
SELECT * FROM SessionTable;
--@block

INSERT INTO SessionTable (token,  tokenPasswrd, queueId)
    VALUES ('aurguhsfuibdifo1', 'auojsdifo1', 2);

SELECT queueid, tokenpasswrd FROM SessionTable 
WHERE token = 'aurguhsfuibdifo1';