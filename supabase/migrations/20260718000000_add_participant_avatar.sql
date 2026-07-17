-- Player avatar (FIFA top-10 country flag id)
alter table public.participants
add column if not exists avatar text default 'vn';

comment on column public.participants.avatar is 'Avatar id: flag code (fr, ar, es, gb, br, ma, pt, be, nl, mx, vn)';
