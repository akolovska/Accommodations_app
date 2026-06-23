create table logs
(
    id         bigserial primary key,
    created_at timestamp    not null,
    updated_at timestamp    not null,
    rental_name varchar(255) not null,
    event_type  varchar(255) not null
);