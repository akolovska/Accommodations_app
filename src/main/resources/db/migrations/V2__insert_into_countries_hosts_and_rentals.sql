INSERT INTO countries (created_at, updated_at, name, continent)
VALUES
    (NOW(), NOW(), 'Germany', 'Europe'),
    (NOW(), NOW(), 'France', 'Europe'),
    (NOW(), NOW(), 'Italy', 'Europe'),
    (NOW(), NOW(), 'Spain', 'Europe'),
    (NOW(), NOW(), 'United States', 'North America'),
    (NOW(), NOW(), 'Canada', 'North America'),
    (NOW(), NOW(), 'Brazil', 'South America'),
    (NOW(), NOW(), 'Japan', 'Asia'),
    (NOW(), NOW(), 'Australia', 'Australia'),
    (NOW(), NOW(), 'South Africa', 'Africa');

INSERT INTO hosts (created_at, updated_at, name, surname, country_id)
VALUES
    (NOW(), NOW(), 'John', 'Muller', 1),
    (NOW(), NOW(), 'Marie', 'Dubois', 2),
    (NOW(), NOW(), 'Luca', 'Rossi', 3),
    (NOW(), NOW(), 'Carlos', 'Garcia', 4),
    (NOW(), NOW(), 'Emily', 'Smith', 5),
    (NOW(), NOW(), 'James', 'Wilson', 6),
    (NOW(), NOW(), 'Pedro', 'Silva', 7),
    (NOW(), NOW(), 'Yuki', 'Tanaka', 8),
    (NOW(), NOW(), 'Olivia', 'Brown', 9),
    (NOW(), NOW(), 'Thabo', 'Nkosi', 10);

INSERT INTO rentals
(created_at, updated_at, name, category, host_id, num_rooms)
VALUES
    (NOW(), NOW(), 'Berlin City Apartment', 'APARTMENT', 1, 2),
    (NOW(), NOW(), 'Paris Luxury Flat', 'FLAT', 2, 3),
    (NOW(), NOW(), 'Rome Historic House', 'HOUSE', 3, 4),
    (NOW(), NOW(), 'Barcelona Beach Villa', 'MOTEL', 4, 5),
    (NOW(), NOW(), 'New York Loft', 'APARTMENT', 5, 2),
    (NOW(), NOW(), 'Toronto Downtown Condo', 'ROOM', 6, 3),
    (NOW(), NOW(), 'Rio Ocean View', 'APARTMENT', 7, 2),
    (NOW(), NOW(), 'Tokyo Business Suite', 'FLAT', 8, 1),
    (NOW(), NOW(), 'Sydney Harbour House', 'HOUSE', 9, 4),
    (NOW(), NOW(), 'Cape Town Retreat', 'MOTEL', 10, 6);