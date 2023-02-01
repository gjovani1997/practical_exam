/* Replace with your SQL commands */
CREATE TABLE `node_backend_db`.`node_backend_users` ( `id` INT(10) NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(45) NOT NULL , `last_name` VARCHAR(45) NOT NULL , `address` VARCHAR(320) NOT NULL , `postcode` VARCHAR(15) NOT NULL , `contact_number` VARCHAR(15) NOT NULL , `email` VARCHAR(45) NOT NULL , `username` VARCHAR(45) NOT NULL , `password` VARCHAR(120) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `node_backend_db`.`node_backend_users` ADD `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `password`;

CREATE TABLE `node_backend_db`.`node_backend_sessions` ( `token` TEXT NOT NULL , `expiration` TEXT NOT NULL , `user_id` INT NOT NULL , `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ) ENGINE = InnoDB;

INSERT INTO `node_backend_users` (`id`, `first_name`, `last_name`, `address`, `postcode`, `contact_number`, `email`, `username`, `password`, `created_at`) VALUES (NULL, 'Jov', 'Garcia', '9976, Ore Vill, Test Address, Califonia, USA', '2222', '09636010911', 'myemail@gmail.com', 'testusername99', '$2b$10$OCrpQW3Hdqz/KKY3bHRSFes//R9db2Dz2g6qs9N/nGlKgj/LldP6K', '2023-02-01 17:23:08')