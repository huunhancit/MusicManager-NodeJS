CREATE TABLE IF NOT EXISTS MUSIC_TYPE (
	ID INT NOT NULL AUTO_INCREMENT,
	NAME_TYPE varchar(255) NOT NULL,
	DESCRIPTION varchar(255) NULL,
	CONSTRAINT pk_MUSIC_TYPE_ID PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS MUSIC (
	ID INT NOT NULL AUTO_INCREMENT,
	NAME varchar(255) NOT NULL,
	AUTHOR varchar(255) NOT NULL,
	ID_MUSIC_TYPE int NOT NULL,
	CONSTRAINT pk_MUSICID PRIMARY KEY (ID),
	FOREIGN KEY (ID_MUSIC_TYPE) REFERENCES MUSIC_TYPE(ID)
);
