create view rentals_view as
       select r.id as id,
              r.name as name,
              r.category as category,
              r.num_rooms as num_rooms,
              h.name || ' ' || h.surname as host_name,
              c.name as country_name
       from rentals r
       join hosts h on r.host_id = h.id
       join countries c on c.id = h.country_id;
