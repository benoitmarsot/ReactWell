CREATE OR REPLACE procedure sp_CreatePrimaryKeys()
language plpgsql
as $$
declare
-- variable declaration
begin
	raise notice 'Create primary keys:';
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'rwuser' and constraint_type = 'PRIMARY KEY') then
            raise notice 'Create primary key for rwuser (rwuserid).';
            ALTER TABLE rwuser ADD PRIMARY KEY (rwuserid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'provider' and constraint_type = 'PRIMARY KEY') then
            raise notice 'Create primary key for provider (providerid).';
            ALTER TABLE provider ADD PRIMARY KEY (providerid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'patient' and constraint_type = 'PRIMARY KEY') then
            raise notice 'Create primary key for patient (patientid).';
            ALTER TABLE patient ADD PRIMARY KEY (patientid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'providerpatient' and constraint_type = 'PRIMARY KEY') then
            raise notice 'Create primary key for providerpatient (providerid,patientid).';
            ALTER TABLE providerpatient ADD PRIMARY KEY (providerid,patientid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'assessment' and constraint_type = 'PRIMARY KEY') then
            raise notice 'Create primary key for assessment (assessmentid).';
            ALTER TABLE assessment ADD PRIMARY KEY (assessmentid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'assessmentversion' and constraint_type = 'PRIMARY KEY') then
            raise notice 'Create primary key for AssessmentVersion (assessmentversionid).';
            ALTER TABLE assessmentversion ADD PRIMARY KEY (assessmentversionid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'bodyquestion' and constraint_type = 'PRIMARY KEY') then
            raise notice 'Create primary key for bodyquestion  (bodyquestionid).';
            ALTER TABLE bodyquestion ADD PRIMARY KEY (bodyquestionid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'bodyquestiontext' and constraint_type = 'PRIMARY KEY') then
            raise notice 'Create primary key for bodyquestiontext  (bodyquestionid,assessmentversionid).';
            ALTER TABLE bodyquestiontext ADD PRIMARY KEY (bodyquestionid,assessmentversionid);
	end if;
end; $$;

call public.sp_CreatePrimaryKeys();

drop procedure public.sp_CreatePrimaryKeys;