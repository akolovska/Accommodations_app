create table countries
(
    id         bigserial primary key,
    created_at timestamp    not null,
    updated_at timestamp    not null,
    name       varchar(255) not null,
    continent  varchar(255) not null
);

create table hosts
(
    id         bigserial primary key,
    created_at timestamp    not null,
    updated_at timestamp    not null,
    name       varchar(255) not null,
    surname    varchar(255) not null,
    country_id bigint       not null references countries (id) on delete cascade
);

create table rentals
(
    id         bigserial primary key,
    created_at timestamp    not null,
    updated_at timestamp    not null,
    name       varchar(255) not null,
    category   varchar(255) not null,
    host_id    bigint       not null references hosts (id) on delete cascade,
    numRooms   integer      not null
)