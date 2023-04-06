create or replace procedure sp_CreateIndexes()
language plpgsql
as $$
declare
-- variable declaration
begin
    raise notice 'Creating unique constraints:';
    if not exists (select constraint_name from information_schema.table_constraints where table_name = 'rwuser' and constraint_name = 'oktaclient_unique') then
        raise notice 'Creating rwuser unique index oktaclient_unique...';
        alter table rwuser add constraint OktaClient_unique UNIQUE (oktaclientid);
    end if;
    if not exists (select constraint_name from information_schema.table_constraints where table_name = 'rwuser' and constraint_name = 'rwusername_unique') then
        raise notice 'Creating rwuser unique index rwusername_unique...';
        alter table rwuser add constraint rwusername_unique UNIQUE (rwusername);
    end if;
    if not exists (select constraint_name from information_schema.table_constraints where table_name = 'rwuser' and constraint_name = 'email_unique') then
        raise notice 'Creating rwuser unique index email_unique...';
        alter table rwuser add constraint email_unique UNIQUE (email);
    end if;
    raise notice 'Creating indexes:';
    if not exists (select 1 from pg_catalog.pg_indexes where tablename = 'assessment' and indexname = 'assessment_provider_client_idx') then
        raise notice 'Creating assessment index on (providerid, clientid)...';
        create index assessment_provider_client_idx ON assessment (providerid, patientid);
    end if;
    if not exists (select 1 from pg_catalog.pg_indexes where tablename = 'rwuser' and indexname = 'rwuser_email_idx') then
        raise notice 'Creating rwuser index on (email)...';
        create index rwuser_email_idx ON rwuser (email);
    end if;
end; $$;

call public.sp_CreateIndexes();
drop procedure public.sp_CreateIndexes;