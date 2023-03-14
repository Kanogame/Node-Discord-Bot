CREATE TABLE SessionTable (
    id SERIAL PRIMARY KEY,
    token        CHAR(24)    NOT NULL UNIQUE,
    tokenPasswrd CHAR(24)    NOT NULL UNIQUE,
    queueId      INT            NOT NULL UNIQUE);

--@block
SELECT * FROM SessionTable

--@block
INSERT INTO SessionTable (token,  tokenPasswrd, queueId)
VALUES ('aurguhsfuibdifo', 'auojsdifo', 1);
