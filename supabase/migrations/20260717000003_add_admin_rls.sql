-- Add missing RLS policies for Admin operations

-- Policies for quiz_sets
create policy "Admins can insert quiz_sets" on public.quiz_sets for insert with check (auth.role() = 'authenticated');
create policy "Admins can update quiz_sets" on public.quiz_sets for update using (auth.role() = 'authenticated');
create policy "Admins can delete quiz_sets" on public.quiz_sets for delete using (auth.role() = 'authenticated');

-- Policies for questions
create policy "Admins can insert questions" on public.questions for insert with check (auth.role() = 'authenticated');
create policy "Admins can update questions" on public.questions for update using (auth.role() = 'authenticated');
create policy "Admins can delete questions" on public.questions for delete using (auth.role() = 'authenticated');

-- Policies for choices
create policy "Admins can insert choices" on public.choices for insert with check (auth.role() = 'authenticated');
create policy "Admins can update choices" on public.choices for update using (auth.role() = 'authenticated');
create policy "Admins can delete choices" on public.choices for delete using (auth.role() = 'authenticated');
