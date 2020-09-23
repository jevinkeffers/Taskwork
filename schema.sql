/*This is how to create a table inside a Database*/
CREATE TABLE todolist (
id serial primary key,
name text,
todo_task varchar,
comp_task varchar,
users_id integer,
FOREIGN KEY (users_id) REFERENCES users (id)
);


/*varchar accepts charecters and numbers*/
CREATE TABLE users (
id serial primary key,
name text,
email varchar,
password varchar
);
