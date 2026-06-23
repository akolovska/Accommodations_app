create table users
(
    id         bigserial primary key,
    created_at timestamp    not null,
    updated_at timestamp    not null,
    name       varchar(255) not null,
    surname    varchar(255) not null,
    email      varchar(255) not null unique,
    username   varchar(255) not null,
    password   varchar(255) not null,
    role       varchar(255)
);
insert into users (created_at, updated_at, name, surname, email, username, password, role)
values (now(), now(), 'admin', 'admin', 'admin@example.com', 'admin', '$2a$10$sn04JPkUn8Wj9ppzCAw1y.kR81yX/FXbmf.YQtH5Fc5wiKF8WjMnC', 'ROLE_USER'),
       (now(), now(), 'user', 'user', 'user@example.com', 'user', '$2a$10$sn04JPkUn8Wj9ppzCAw1y.kR81yX/FXbmf.YQtH5Fc5wiKF8WjMnC', 'ROLE_ADMIN');
