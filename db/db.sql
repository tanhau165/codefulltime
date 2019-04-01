
create  table  teachers(

    code_teacher varchar (100),
    password varchar (100),
    information varchar (100),
    primary key (code_teacher)

);

create table  teams(

    code_team varchar (100),
    name varchar (100),
    information varchar(1000),
    teacher varchar (100),
    primary key (code_team),
    foreign key (teacher) references teachers(teacher)
);
create  table  account(
    username varchar (100),
    password varchar (100),
    name varchar (100),
    email varchar (100),
    team varchar (100),
    primary key (username),
    foreign key (team) references teams(team);
);

