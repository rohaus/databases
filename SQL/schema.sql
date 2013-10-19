DROP DATABASE IF EXISTS `chat_rr1012`;
CREATE DATABASE chat_rr1012;

USE chat_rr1012

-- CREATE TABLE messages (
--   Describe your table here.
-- );

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
--
-- ---

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `Username` VARCHAR(30) NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Rooms'
--
-- ---

DROP TABLE IF EXISTS `Rooms`;

CREATE TABLE `Rooms` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `Room_name` VARCHAR(30) NOT NULL DEFAULT 'Lobby',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Messages'
--
-- ---

DROP TABLE IF EXISTS `Messages`;

CREATE TABLE `Messages` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `Room_id` TINYINT(3) NULL DEFAULT NULL,
  `Text` TEXT NULL DEFAULT NULL,
  `Created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `User_id` TINYINT(3) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'BFF'
--
-- ---

DROP TABLE IF EXISTS `BFF`;

CREATE TABLE `BFF` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `User_id` TINYINT(3) NULL DEFAULT NULL,
  `Best_Friend_id` TINYINT(3) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Best Friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`id`,`Username`) VALUES
-- ('','');
-- INSERT INTO `Rooms` (`id`,`Room_name`) VALUES
-- ('','');
-- INSERT INTO `Messages` (`id`,`Room_id`,`Text`,`Created_at`,`User_id`) VALUES
-- ('','','','','');
-- INSERT INTO `Best Friends` (`id`,`User_id`,`Best_Friend_id`) VALUES
-- ('','','');

