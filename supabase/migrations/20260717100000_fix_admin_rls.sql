-- Ensure authenticated admins can manage quiz content (idempotent)

drop policy if exists "Admins can insert quiz_sets" on public.quiz_sets;
drop policy if exists "Admins can update quiz_sets" on public.quiz_sets;
drop policy if exists "Admins can delete quiz_sets" on public.quiz_sets;
drop policy if exists "Admins can insert questions" on public.questions;
drop policy if exists "Admins can update questions" on public.questions;
drop policy if exists "Admins can delete questions" on public.questions;
drop policy if exists "Admins can insert choices" on public.choices;
drop policy if exists "Admins can update choices" on public.choices;
drop policy if exists "Admins can delete choices" on public.choices;

create policy "Admins can insert quiz_sets"
  on public.quiz_sets for insert
  to authenticated
  with check (true);

create policy "Admins can update quiz_sets"
  on public.quiz_sets for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins can delete quiz_sets"
  on public.quiz_sets for delete
  to authenticated
  using (true);

create policy "Admins can insert questions"
  on public.questions for insert
  to authenticated
  with check (true);

create policy "Admins can update questions"
  on public.questions for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins can delete questions"
  on public.questions for delete
  to authenticated
  using (true);

create policy "Admins can insert choices"
  on public.choices for insert
  to authenticated
  with check (true);

create policy "Admins can update choices"
  on public.choices for update
  to authenticated
  using (true)
  with check (true);

create policy "Admins can delete choices"
  on public.choices for delete
  to authenticated
  using (true);
