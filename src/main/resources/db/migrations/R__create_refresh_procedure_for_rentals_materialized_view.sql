create or replace procedure refresh_rentals_materialized_view()
language sql
AS $$
    refresh materialized view concurrently rentals_materialized_view;
$$
