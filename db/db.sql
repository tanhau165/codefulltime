
create  table  teachers(

    code_teacher varchar (100),
    password varchar (100),
    information varchar (100),
    time_expired varchar (100),
    last_login varchar (100),
    primary key (code_teacher)

);

create table  teams(

    code_team varchar (100),
    name varchar (100),
    information varchar(1000),
    teacher varchar (100),
    location varchar (100),
    primary key (code_team),
    foreign key (teacher) references teachers(teacher)
);

create  table  account(
    username varchar (100),
    password varchar (100),
    email varchar (100),
    team varchar (100),
    ip varchar (100),
    role varchar (100),
    primary key (username),
    foreign key (team) references teams(team);
);


create table collections(

    code_collection varchar (100),
    name varchar (100),
    code_team varchar (100),

    primary key (code_collection),
    foreign key (code_team) references teams(code_team)

);


create table examinations(
     code_examination varchar (100),
     question varchar (1000),
     code_collection varchar (100),
     answer_a varchar (100),
     answer_b varchar (100),
     answer_c varchar (100),
     answer_d varchar (100),
     answer_correct varchar (100),
     type_of_language varchar (100),
     primary key (code_examination),
     foreign key (code_collection) references collections(code_collection)

);

create table exercises(

    exercise_code varchar (100),
    question varchar (100),
    name varchar (100),
    time_limit varchar(100),
    memory_limit varchar (100),
    best_score int,
    input1 varchar (100),
    input2 varchar (100),
    input3 varchar (100),
    input4 varchar (100),
    input5 varchar (100),
    input6 varchar (100),
    input7 varchar (100),
    input8 varchar (100),
    input9 varchar (100),
    input10 varchar (100),
    output1 varchar (100),
    output2 varchar (100),
    output3 varchar (100),
    output4 varchar (100),
    output5 varchar (100),
    output6 varchar (100),
    output7 varchar (100),
    output8 varchar (100),
    output9 varchar (100),
    output10 varchar (100),
    team varchar (100),
    primary key (exercise_code),
    foreign key (team) references teams(code_team)

);

create table report_examinations(

    code varchar (100),
    score int ,
    team varchar (100),
    list_examination varchar (100),
    time_submit varchar (100),
    username varchar (100),
    primary key (code)
);

create table submissions(

    code varchar (100),
    score int,
    exercise_code varchar (100),
    time_submit varchar (100),
    time_limit varchar (100),
    username varchar (100),
    primary key (code),
    foreign key (exercise_code) references exercises(exercise_code)
)