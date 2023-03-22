CREATE TABLE SessionTable (
    id SERIAL PRIMARY KEY,
    token        CHAR(24)    NOT NULL UNIQUE,
    tokenPasswrd CHAR(24)    NOT NULL UNIQUE,
    guildid      CHAR(20)    NOT NULL UNIQUE);

--@block
CREATE DATABASE postgres;

--@block
SELECT * FROM SessionTable;
--@block

INSERT INTO SessionTable (token,  tokenPasswrd, guildid)
    VALUES ('aurguhsfuibdifo1', 'auojsdifo1', 2);

--@block
SELECT queueid, tokenpasswrd FROM SessionTable 
WHERE token = 'aurguhsfuibdifo1';

--@block
DROP TABLE SessionTable;