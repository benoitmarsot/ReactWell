CREATE OR REPLACE procedure sp_createforeignkeys()
language plpgsql
as $$
declare
-- variable declaration
begin
	raise notice 'Create Foreign keys:';
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'provider' and constraint_name = 'provider_fk_rwuser') then
		raise notice 'Creating provider_fk_rwuser...';
		alter table provider add constraint provider_fk_rwuser foreign key (rwuserid) references rwuser(rwuserid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'patient' and constraint_name = 'patient_fk_rwuser') then
		raise notice 'Creating patient_fk_rwuser...';
		alter table patient add constraint patient_fk_rwuser foreign key (rwuserid) references rwuser(rwuserid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'providerpatient' and constraint_name = 'providerpatient_fk_patient') then
		raise notice 'Creating providerpatient_fk_patient...';
		alter table providerpatient add constraint providerpatient_fk_patient foreign key (patientid) references patient(patientid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'providerpatient' and constraint_name = 'providerpatient_fk_provider') then
		raise notice 'Creating providerpatient_fk_provider...';
		alter table providerpatient add constraint providerpatient_fk_provider foreign key (providerid) references provider(providerid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'assessment' and constraint_name = 'assessment_fk_provider') then
		raise notice 'Creating assessment_fk_provider...';
		alter table assessment add constraint assessment_fk_provider foreign key (providerid) references provider(providerid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'assessment' and constraint_name = 'assessment_fk_patient') then
		raise notice 'Creating assessment_fk_patient...';
		alter table assessment add constraint assessment_fk_patient foreign key (patientid) references patient(patientid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'assessmentversion' and constraint_name = 'assessmentversion_fk_assessment') then
		raise notice 'Creating assessmentversion_fk_assessment...';
		alter table assessmentversion add constraint assessmentversion_fk_assessment foreign key (assessmentid) references assessment(assessmentid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'bodyquestion' and constraint_name = 'bodyquestion_fk_assessment') then
		raise notice 'Creating bodyquestion_fk_assessment...';
		alter table bodyquestion add constraint bodyquestion_fk_assessment foreign key (assessmentid) references assessment(assessmentid);
	end if;
--      Actually no foreign key the key path is bodyQuestionText->AssessmentVersion->BodyQuestion
-- 	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'bodyquestiontext' and constraint_name = 'bodyquestiontext_fk_bodyquestion') then
-- 		raise notice 'Creating bodyquestiontext_fk_bodyquestion...';
-- 		alter table bodyquestiontext add constraint bodyquestiontext_fk_bodyquestion foreign key (bodyquestionid,assessmentid) references bodyquestion(bodyquestionid,assessmentid);
-- 	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'bodyquestiontext' and constraint_name = 'bodyquestiontext_fk_assessmentversion') then
		raise notice 'Creating bodyquestiontext_fk_assessmentversion...';
		alter table bodyquestiontext add constraint bodyquestiontext_fk_assessmentversion foreign key (assessmentversionid) references assessmentversion(assessmentversionid);
	end if;
end; $$;

call public.sp_CreateForeignKeys();
drop procedure public.sp_CreateForeignKeys;

