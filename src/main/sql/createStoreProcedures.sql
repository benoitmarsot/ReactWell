-- Functions
-- provider sign in
-- arg {email:un,password:pw}
-- sample: select providersignin('{"email":"provemail@hotmail.com","password":"password"}');
create or replace FUNCTION providersignin(json) 
RETURNS json AS 
$$
    select json_build_object(
        'providerId', p.providerid,
        'rwuserId', p.rwuserid,
        'firstName', p.firstname,
        'lastName', p.lastname,
        'company', p.company,
        'address', p.address,
        'city' , p.city
        'usState', p.usstate
        'zip', p.zip
    )
    from public.provider p
        inner join public.rwuser u on p.rwuserid = u.rwuserid
    where u.email=$1->>email and u.rwpassword=$1->>password
    ;
$$
language sql;
-- Get an assessment from a providerId and a patientId
-- sample of use: select public.getassessment(1,1)
create or replace FUNCTION getassessment(int,int) 
RETURNS json AS 
$$
    select json_build_object(
        'assessmentId',ao.assessmentid,
        'providerId',ao.providerid,
        'patientId',ao.patientId,
        'assessmentVersions', (
            select
                json_agg(json_build_object(
                    'assessmentVersionId', av1.assessmentversionid, 
                    'note', av1.note, 
                    'serviceDate', av1.servicedate
                ))
            from public.assessmentversion av1 
            where av1.assessmentid = ao.assessmentid
            group by av1.assessmentid
        ), 'bodyQuestions', (
            select 
                json_agg(json_build_object(
                    'bodyQuestionId', bq.bodyquestionid, 
                    'x', bq.x, 
                    'y', bq.y
                    ,'versionTexts', q.versiontexts
                ) order by bq.bodyquestionid) bodyQuestions
            from public.bodyquestion bq 
            left join (
                select av.assessmentid,qt.bodyquestionid, 
                    json_agg(json_build_object(
                        'assessmentVersionId', qt.assessmentversionid, 
                        'content',qt.questiontext 
                    ) order by qt.assessmentversionid desc) as versiontexts
                from public.assessmentversion av 
                    left join public.bodyquestiontext qt on qt.assessmentversionid=av.assessmentversionid
                where av.assessmentid = ao.assessmentid
                    and qt.assessmentversionid is not null
                group by av.assessmentid, qt.bodyquestionid 
            ) as q on bq.assessmentid=q.assessmentid and bq.bodyquestionid =q.bodyquestionid
            where bq.assessmentid = ao.assessmentid
        )
    )
    from public.assessment ao
    where ao.providerid =$1 and ao.patientid =$2;
$$
language sql;
-- Save an assessment for a given proverId and clientId
-- call public.saveassessment(3,1, 
--      '{"assessmentId":0,"providerId":1,"patientId":1,"assessmentVersions":[{"assessmentVersionId":0,"note":"firstNote"}],"bodyQuestions":[{"bodyQuestionId":0,"x":140.609375,"y":123.90625,"versionTexts":[{"assessmentVersionId":0,"content":"This is it"}]},{"bodyQuestionId":1,"x":99.609375,"y":137.90625,"versionTexts":[{"assessmentVersionId":0,"content":"IS"}]},{"bodyQuestionId":2,"x":366.609375,"y":154.90625,"versionTexts":[{"assessmentVersionId":0,"content":"THIS"}]},{"bodyQuestionId":3,"x":380.609375,"y":234.90625,"versionTexts":[{"assessmentVersionId":0,"content":"IS IT"}]}]}'
-- 	::JSON
-- );
create or replace procedure saveassessment(int,int,json) 
as $$
declare
    provId alias FOR $1;
    pId ALIAS FOR $2;
    jsonAssess ALIAS FOR $3;
    assessId int;
    assessVersionId int;
begin
    -- make sure the provider and patient are right
    if not exists (select 1 from public.provider p where p.providerid=provId) then 
        raise exception 'Cannot save the assessment: invalid provider: %', provId ;
    end if;
    if not exists (select 1 from public.patient p where p.patientid=pId) then 
        raise exception 'Cannot save the assessment: invalid patient: %', pId ;
    end if;
    -- find the right assessment
    assessId=0;
    select assessmentid 
        from public.assessment a
        into assessId
        where a.providerid=provId and a.patientid = pId;
    raise notice 'assessId: %',assessId;
    -- Create the assessment first time for that client and that provider
    if assessId is null or assessId<1 then
        insert into public.assessment (
            providerid, patientid  
        ) values (
            provId,pId
        ) returning assessmentid into assessId;
        raise notice 'Inserting new assessment for provider: %, patient: %', provId, pId;
    end if;

    -- Insert the missing body question
    insert into bodyquestion (
        assessmentid,bodyquestionid, x, y
    ) select 
        assessId, 
        (value->>'bodyQuestionId')::int+1 as bodyquestionid, 
        (value->>'x')::float as x,
        (value->>'y')::float as y 
    from json_array_elements((jsonAssess)::json #>'{"bodyQuestions"}' )
        left join public.bodyquestion b on 
            b.bodyquestionid = (value->>'bodyQuestionId')::int+1
            and b.assessmentid = assessId
    where
        b.bodyquestionid is null;

    -- Insert the new assessment version
    insert into public.assessmentversion (
        assessmentid,note
    ) select 
        assessId,  
        value->>'note' as content
    from json_array_elements((jsonAssess)::json #>'{"assessmentVersions"}') j
    where (value->>'assessmentVersionId')::int=0
    returning assessmentversionid into assessVersionId;

    -- Insert the missing body question texts
    insert into public.bodyquestiontext (
        assessmentversionid, bodyquestionid, questiontext
    ) select 
        assessVersionId as assessmentversionid, 
        (value->>'bodyQuestionId')::int+1 as bodyquestionid, 
        (value->'versionTexts')::json->0->>'content' as content
    from json_array_elements((jsonAssess)::json #>'{"bodyQuestions"}') j
    where (value->'versionTexts')::json->0->'content' is not null;

    raise notice 'Updated assessmentId: % for provider: %, patient: %', assessId,provId, pId;
end
$$
language plpgsql;

-- regiter a provider
-- Example:
-- call public.registerprovider(
--     '{"providerId":0,"userId":0,"patients":null,"firstName":"Benoit","lastName":"Marsot","company":"unBumpkin","address":"4135 21ST ST","city":"SAN FRANCISCO","usState":"CA","zip":"94114","email":"benoitmarsot@hotmail.com","password":"test"}'::json
-- )
create or replace procedure registerprovider(json) 
as $$
declare
    jsonProv alias FOR $1;
    rwId int;
   	provId int;
    email varchar(100);
begin
    --check if the user is already registered
    if exists(select 1 from public.rwuser u where u.email=jsonProv->>'email') then 
        raise exception 'User with email % already exist.', jsonProv->>'email'
            using hint = 'Please login in instead.';
    end if;
    -- create the rwuser
    insert into public.rwuser (
    	rwusername,oktaclientid,email,rwpassword
    ) values (
        jsonProv->>'email',jsonProv->>'email',jsonProv->>'email',jsonProv->>'password'
    ) returning rwuserid into rwId;
    -- create the provider
    insert into public.provider (
        rwuserid, firstname, lastname, company, address, city, usstate, zip
    ) values (
    	rwId, jsonProv->>'firstName',jsonProv->>'lastName',jsonProv->>'company',jsonProv->>'address',jsonProv->>'city', jsonProv->>'usState',jsonProv->>'zip'
    ) returning providerid into provId;
    raise notice 'Created user: % provider: % with email: %', rwId,provId, jsonProv->>'email';
end
$$
language plpgsql;

-- regiter a patient
-- Example:
-- call public.registerpatient(1,
--     '{"patientId":0,"userId":0,"firstname":null,"lastname":null,"address":"33 Martha Ave","city":"San Francisco","usstate":null,"zip":"94131","referral":"Doc X","email":"benitmarsot@hotmail.com","password":"password"}'::json
-- )
-- regiter a patient
-- Example:
create or replace procedure registerpatient(int,json) 
as $$
declare
    provId alias FOR $1;
    jsonPatient alias FOR $2;
    rwId int;
    pId int;
    email varchar(100);
begin
    --check if the user is already registered
    if exists(select 1 from public.rwuser u where u.email=jsonPatient->>'email') then 
        raise exception 'User with email % already exist.', jsonPatient->>'email'
            using hint = 'Please link in instead.';
    end if;
    -- create the rwuser
    insert into public.rwuser (
    	rwusername,oktaclientid,email,rwpassword
    ) values (
        jsonPatient->>'email',jsonPatient->>'email',jsonPatient->>'email',jsonPatient->>'password'
    ) returning rwuserid into rwId;
    -- create the provider
    insert into public.patient (
        rwuserid, firstname, lastname, address, city, usstate, zip, referral
    ) values (
    	rwId, jsonPatient->>'firstName',jsonPatient->>'lastName',jsonPatient->>'address',jsonPatient->>'city', 
        jsonPatient->>'usState',jsonPatient->>'zip',jsonPatient->>'referral'
    ) returning patientid into pId;
    -- associate the provider to his client
    insert into public.providerpatient (
        providerid,patientid
    ) values (
        provId,pId
    );
    raise notice 'Provider % registerred user: % patient: % with email: %',provId, rwId, pId, jsonPatient->>'email';
end
$$
language plpgsql;

