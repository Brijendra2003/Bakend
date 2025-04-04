drop database railway;
create database railway;
use railway;

CREATE TABLE admin (
    username VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    unique (username)
);

create table teachers (
    teacher_id bigint  primary key,
    name varchar(50),
    department varchar(10)
);

create table subjects (
    subject_id bigint primary key,
    subject_name varchar(50),
    teacher_id bigint,
    branch varchar(10),
    foreign key (teacher_id) references teachers(teacher_id)
    ON UPDATE CASCADE 
    ON DELETE CASCADE
);

create table timetable (
    id int AUTO_INCREMENT,
    branch varchar(10),
    semester int,
    division varchar(10),
    batch varchar(10),
    day varchar(10),
    lecture_time varchar(30),
    subject_id bigint,
    teacher_id bigint,
    primary key (id),
    foreign key (subject_id) references subjects(subject_id)
    ON UPDATE CASCADE 
    ON DELETE CASCADE,
    foreign key (teacher_id) references teachers(teacher_id)
    ON UPDATE CASCADE 
    ON DELETE CASCADE
);

-- SELECT 
--     (SELECT COUNT(*) FROM teachers) AS teacher, 
--     (SELECT COUNT(*) FROM subjects) AS subject, 
--     (SELECT COUNT(*) FROM timetable) AS timetable;
