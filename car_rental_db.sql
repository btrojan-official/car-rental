CREATE TABLE countries (
    id INT NOT NULL AUTO_INCREMENT,
    country_name VARCHAR(56) NOT NULL,
    CONSTRAINT PK_1 PRIMARY KEY (id)
);

CREATE TABLE cars_makes (
    id INT NOT NULL AUTO_INCREMENT,
    make_name VARCHAR(50) NOT NULL,
    CONSTRAINT PK_2 PRIMARY KEY (id)
);

CREATE TABLE car_model (
    id INT NOT NULL AUTO_INCREMENT,
    model_name VARCHAR(50) NOT NULL,
    car_make_id INT NOT NULL,
    CONSTRAINT PK_3 PRIMARY KEY (id),
    CONSTRAINT FK_1 FOREIGN KEY (car_make_id) REFERENCES cars_makes(id)
);

CREATE TABLE cars (
    id VARCHAR(36) NOT NULL,
    model_id INT NOT NULL,
    number_of_seats SMALLINT NOT NULL,
    gearbox VARCHAR(20) NOT NULL,
    luggage_capacity VARCHAR(100) NOT NULL,
    milage_limit VARCHAR(50) NOT NULL,
    class VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL,
    price_per_day FLOAT NOT NULL,
    number_plate VARCHAR(7) NOT NULL,
    CONSTRAINT PK_4 PRIMARY KEY (id),
    CONSTRAINT FK_2 FOREIGN KEY (model_id) REFERENCES car_model(id)
);

CREATE TABLE users (
    id VARCHAR(36) NOT NULL,
    name VARCHAR(30) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    password VARCHAR(36) NOT NULL,
    country_id INT NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    CONSTRAINT PK_5 PRIMARY KEY (id),
    CONSTRAINT FK_3 FOREIGN KEY (country_id) REFERENCES countries(id)
);

CREATE TABLE reservations (
    id VARCHAR(36) NOT NULL,
    start_date TIMESTAMP NULL,
    end_date TIMESTAMP NULL,
    return_date TIMESTAMP NULL,
    status VARCHAR(50) NOT NULL,
    reservation_price FLOAT NOT NULL,
    paid_price FLOAT NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    car_id VARCHAR(36) NOT NULL,
    CONSTRAINT PK_6 PRIMARY KEY (id),
    CONSTRAINT FK_4 FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT FK_5 FOREIGN KEY (car_id) REFERENCES cars(id)
);

INSERT INTO `cars_makes`( `make_name`) VALUES ('Audi'), ('BMW'), ('Volkswagen'), ('Skoda'), ('Opel'), ('Ferrari');
INSERT INTO `car_model`(`model_name`, `car_make_id`) VALUES ('A6',1), ('A3',1), ('Q8',1), ('X5',2), ('330i',2), ('Passat',3); 
INSERT INTO `cars` (`id`, `model_id`, `number_of_seats`, `gearbox`, `luggage_capacity`, `milage_limit`, `class`, `status`, `price_per_day`, `number_plate`) VALUES ('1a2b3c4d-001', 1, 5, 'Automatic', '450L', '200 km/day', 'SUV', 'Available', 75.00, 'ABC123'), ('1a2b3c4d-002', 2, 4, 'Manual', '300L', '150 km/day', 'Sedan', 'Available', 50.00, 'XYZ987'), ('1a2b3c4d-003', 3, 7, 'Automatic', '500L', '250 km/day', 'Minivan', 'Rented', 90.00, 'DEF456'), ('1a2b3c4d-004', 4, 2, 'Automatic', '200L', 'Unlimited', 'Convertible', 'Available', 120.00, 'JKL789'), ('1a2b3c4d-005', 5, 5, 'Manual', '400L', '180 km/day', 'Crossover', 'Under Maintenance', 65.00, 'GHI321'), ('1a2b3c4d-006', 6, 5, 'Automatic', '420L', '220 km/day', 'Sedan', 'Available', 55.00, 'MNO654'), ('1a2b3c4d-007', 3, 4, 'Automatic', '350L', '160 km/day', 'Hatchback', 'Rented', 45.00, 'PQR111'), ('1a2b3c4d-008', 1, 7, 'Manual', '550L', '200 km/day', 'SUV', 'Available', 80.00, 'STU222'); 
INSERT INTO `countries`(`country_name`) VALUES ('Poland'), ('Germany'), ('Slovakia'), ('UK'), ('France'), ('Italy'), ('Spain'), ('Denmark'), ('Austria'); 