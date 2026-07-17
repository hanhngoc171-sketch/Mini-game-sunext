-- Allow players to update their own nickname/avatar while waiting in lobby
drop policy if exists "Participants can update themselves" on public.participants;

create policy "Participants can update themselves"
  on public.participants for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
