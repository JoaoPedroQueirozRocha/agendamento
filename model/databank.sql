CREATE DATABASE Agenda;
USE Agenda;

CREATE TABLE Professores(
Id int unsigned auto_increment not null,
Nome varchar(80) not null,
Email varchar(254) not null,
primary key(Id)
)ENGINE = INNODB;

CREATE TABLE Materias(
Id int unsigned auto_increment not null,
Nome_Materia varchar(80) not null,
primary key(Id)
)ENGINE = INNODB;

CREATE TABLE Turmas(
Id int unsigned auto_increment not null,
Nome_Turma varchar(80) not null,
Turno varchar(80) not null,
primary key(Id)
)ENGINE = INNODB;

CREATE TABLE Horarios(
Id int unsigned auto_increment not null,
Inicio date not null,
Fim date not null,
Professor int unsigned not null,
Materia int unsigned not null,
Turma int unsigned not null,
primary key(Id),
foreign key(Professor) references Professores(Id),
foreign key(Materia) references Materias(Id),
foreign key(Turma) references Turmas(Id)
)ENGINE = INNODB;

select *from Professores;
select * from Materias;
select * from Turmas;
select * from Horarios;
drop table Turmas;
delete  from Horarios WHERE Id=3;

select Horarios.Id,Inicio,Fim, Professores.Nome, Materias.Materia, Turmas.Turma from Horarios 
inner join Professores on Horarios.Professor = Professores.Id 
inner join Materias on Horarios.Materia = Materias.Id
inner join Turmas on Horarios.Turma = Turmas.Id; 