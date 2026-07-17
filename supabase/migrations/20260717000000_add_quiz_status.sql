alter table public.quiz_sets 
add column status text default 'draft' not null check (status in ('draft', 'active', 'archived')),
add column updated_at timestamp with time zone default now() not null;
