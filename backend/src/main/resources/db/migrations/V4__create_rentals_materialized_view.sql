create view rentals_materialized_view as
select ROW_NUMBER() OVER (ORDER BY category) AS id,
       r.category                            as category,
       count(*)                              as num_rentals,
       sum(r.num_rooms)                      as num_rooms,
       CAST(AVG(r.num_rooms) AS INTEGER) AS avg_num_rooms
from rentals r
group by category;