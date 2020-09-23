/*This is how to create a table inside a Database*/
CREATE TABLE todolist (
id serial primary key,
name text,
todo_task varchar,
users_id integer,
FOREIGN KEY (users_id) REFERENCES users (id)
);

CREATE TABLE inproglist (
id serial primary key,
name text,
inprog_task varchar,
users_id integer,
FOREIGN KEY (users_id) REFERENCES users (id)
);

CREATE TABLE testinglist (
id serial primary key,
name text,
testing_task varchar,
users_id integer,
FOREIGN KEY (users_id) REFERENCES users (id)
);


CREATE TABLE completedlist (
id serial primary key,
name text,
completed_task varchar,
users_id integer,
FOREIGN KEY (users_id) REFERENCES users (id)
);