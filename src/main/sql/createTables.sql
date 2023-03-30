CREATE TABLE IF NOT exists public.rwuser (
	rwuserid serial,
	rwusername varchar(50) not null,
	oktaclientid varchar(100) not null
);

CREATE TABLE IF NOT exists public.provider (
	providerid serial,
	rwuserid int not null
);

CREATE TABLE IF NOT exists public.patient (
	patientid serial,
	rwuserid int not null
);

CREATE TABLE IF NOT exists public.providerpatient (
	providerid int not null,
	patientid int not null
);

CREATE TABLE IF NOT exists public.assessment (
	assessmentid serial,
	providerid int not null,
	patientid int not null
);

CREATE TABLE IF NOT exists public.assessmentversion (
	assessmentversionid serial,
	assessmentid int not null,
	note varchar(250) null,
	servicedate date DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT exists public.bodyquestion (
	bodyquestionid serial,
	assessmentid int not null,
	X float not null,
	y float not null
	
);

CREATE TABLE IF NOT exists public.bodyquestiontext (
	bodyquestionid int not null,
	assessmentversionid int not null,
	questiontext varchar(100)
);