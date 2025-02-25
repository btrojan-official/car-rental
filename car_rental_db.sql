-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2025 at 11:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_rental_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` varchar(36) NOT NULL,
  `model_id` int(11) NOT NULL,
  `number_of_seats` smallint(6) NOT NULL,
  `gearbox` varchar(20) NOT NULL,
  `luggage_capacity` varchar(100) NOT NULL,
  `milage_limit` varchar(50) NOT NULL,
  `class` varchar(20) NOT NULL,
  `status` varchar(50) NOT NULL,
  `price_per_day` float NOT NULL,
  `number_plate` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `model_id`, `number_of_seats`, `gearbox`, `luggage_capacity`, `milage_limit`, `class`, `status`, `price_per_day`, `number_plate`) VALUES
('1a2b3c4d-001', 1, 5, 'Automatic', '450L', '200 km/day', 'SUV', 'Available', 75, 'ABC123'),
('1a2b3c4d-002', 2, 4, 'Manual', '300L', '150 km/day', 'Sedan', 'Available', 50, 'XYZ987'),
('1a2b3c4d-003', 3, 7, 'Automatic', '500L', '250 km/day', 'Minivan', 'Rented', 90, 'DEF456'),
('1a2b3c4d-004', 4, 2, 'Automatic', '200L', 'Unlimited', 'Convertible', 'Available', 120, 'JKL789'),
('1a2b3c4d-005', 5, 5, 'Manual', '400L', '180 km/day', 'Crossover', 'Under Maintenance', 65, 'GHI321'),
('1a2b3c4d-006', 6, 5, 'Automatic', '420L', '220 km/day', 'Sedan', 'Available', 55, 'MNO654'),
('1a2b3c4d-007', 3, 4, 'Automatic', '350L', '160 km/day', 'Hatchback', 'Rented', 45, 'PQR111'),
('1a2b3c4d-008', 1, 7, 'Manual', '550L', '200 km/day', 'SUV', 'Available', 80, 'STU222');

-- --------------------------------------------------------

--
-- Table structure for table `cars_makes`
--

CREATE TABLE `cars_makes` (
  `id` int(11) NOT NULL,
  `make_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars_makes`
--

INSERT INTO `cars_makes` (`id`, `make_name`) VALUES
(1, 'Audi'),
(2, 'BMW'),
(3, 'Volkswagen'),
(4, 'Skoda'),
(5, 'Opel'),
(6, 'Ferrari');

-- --------------------------------------------------------

--
-- Table structure for table `car_model`
--

CREATE TABLE `car_model` (
  `id` int(11) NOT NULL,
  `model_name` varchar(50) NOT NULL,
  `car_make_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `car_model`
--

INSERT INTO `car_model` (`id`, `model_name`, `car_make_id`) VALUES
(1, 'A6', 1),
(2, 'A3', 1),
(3, 'Q8', 1),
(4, 'X5', 2),
(5, '330i', 2),
(6, 'Passat', 3);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `country_name` varchar(56) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `country_name`) VALUES
(1, 'Poland'),
(2, 'Germany'),
(3, 'Slovakia'),
(4, 'UK'),
(5, 'France'),
(6, 'Italy'),
(7, 'Spain'),
(8, 'Denmark'),
(9, 'Austria');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` varchar(36) NOT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `return_date` timestamp NULL DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `reservation_price` float NOT NULL,
  `paid_price` float NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `car_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `password` varchar(36) NOT NULL,
  `country_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone_number` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2` (`model_id`);

--
-- Indexes for table `cars_makes`
--
ALTER TABLE `cars_makes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car_model`
--
ALTER TABLE `car_model`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1` (`car_make_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_4` (`user_id`),
  ADD KEY `FK_5` (`car_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_3` (`country_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars_makes`
--
ALTER TABLE `cars_makes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `car_model`
--
ALTER TABLE `car_model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `FK_2` FOREIGN KEY (`model_id`) REFERENCES `car_model` (`id`);

--
-- Constraints for table `car_model`
--
ALTER TABLE `car_model`
  ADD CONSTRAINT `FK_1` FOREIGN KEY (`car_make_id`) REFERENCES `cars_makes` (`id`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `FK_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FK_5` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_3` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
