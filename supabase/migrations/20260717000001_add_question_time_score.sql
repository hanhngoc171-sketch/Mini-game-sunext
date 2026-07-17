alter table public.questions 
add column time_limit smallint default 20 not null,
add column base_score smallint default 1000 not null;
