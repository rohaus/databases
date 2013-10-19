DROP DATABASE IF EXISTS `chat_rr1012`;
CREATE DATABASE chat_rr1012;

USE chat_rr1012

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Messages'
--
-- ---

DROP TABLE IF EXISTS `Messages`;

CREATE TABLE `Messages` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `Roomname` VARCHAR(30) NULL DEFAULT 'Lobby',
  `Text` MEDIUMTEXT NULL DEFAULT NULL,
  `Created_At` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Username` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Messages` (`id`,`Room_id`,`Text`,`Created_At`,`Username`) VALUES
-- ('','','','','');

