CREATE OR REPLACE procedure sp_CreateIndexes()
language plpgsql
as $$
declare
-- variable declaration
begin
	raise notice 'Create Indexes:';
	-- stored procedure body
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'rwuser' and constraint_name = 'oktaclient_unique') then
		raise notice 'Creating rwuser unique index oktaclient_unique...';
		alter table rwuser add constraint OktaClient_unique UNIQUE (oktaclientid);
	end if;
	if not exists (select constraint_name from information_schema.table_constraints where table_name = 'rwuser' and constraint_name = 'rwusername_unique') then
		raise notice 'Creating rwuser unique index rwusername_unique...';
		alter table rwuser add constraint rwusername_unique UNIQUE (rwusername);
	end if;
end; $$;

call sp_CreateIndexes();
drop procedure sp_CreateIndexes;

