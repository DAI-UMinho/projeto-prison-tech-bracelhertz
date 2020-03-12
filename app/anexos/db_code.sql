-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bracelhertz
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bracelhertz
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bracelhertz` DEFAULT CHARACTER SET utf8 ;
USE `bracelhertz` ;

-- -----------------------------------------------------
-- Table `bracelhertz`.`tipo_utilizador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bracelhertz`.`tipo_utilizador` (
  `id_tipo` INT UNSIGNED NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_tipo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bracelhertz`.`instituicao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bracelhertz`.`instituicao` (
  `id_instituicao` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `descricao` VARCHAR(255) NULL,
  `morada` VARCHAR(255) NOT NULL,
  `localidade` VARCHAR(255) NOT NULL,
  `foto` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `contacto` INT(9) NOT NULL,
  PRIMARY KEY (`id_instituicao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bracelhertz`.`utilizador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bracelhertz`.`utilizador` (
  `id_user` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `id_tipo` INT UNSIGNED NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `nacionalidade` VARCHAR(255) NOT NULL,
  `morada` VARCHAR(255) NOT NULL,
  `localidade` VARCHAR(255) NOT NULL,
  `primeiro_nome` VARCHAR(255) NOT NULL,
  `ultimo_nome` VARCHAR(255) NOT NULL,
  `foto` VARCHAR(255) NOT NULL,
  `contacto` INT(9) NULL,
  `email` VARCHAR(255) NULL,
  `id_instituicao` INT UNSIGNED NULL,
  `created_by` INT UNSIGNED NULL,
  `created_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`),
  INDEX `id_tipo_idx` (`id_tipo` ASC) VISIBLE,
  INDEX `utilizador_id_instituicao_idx` (`id_instituicao` ASC) VISIBLE,
  INDEX `u_created_by_idx` (`created_by` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  CONSTRAINT `id_tipo`
    FOREIGN KEY (`id_tipo`)
    REFERENCES `bracelhertz`.`tipo_utilizador` (`id_tipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `utilizador_id_instituicao`
    FOREIGN KEY (`id_instituicao`)
    REFERENCES `bracelhertz`.`instituicao` (`id_instituicao`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `u_created_by`
    FOREIGN KEY (`created_by`)
    REFERENCES `bracelhertz`.`utilizador` (`id_user`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bracelhertz`.`recluso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bracelhertz`.`recluso` (
  `id_recluso` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `nacionalidade` VARCHAR(255) NOT NULL,
  `primeiro_nome` VARCHAR(255) NOT NULL,
  `ultimo_nome` VARCHAR(255) NOT NULL,
  `foto` VARCHAR(255) NOT NULL,
  `contacto` INT(9) NOT NULL,
  `contacto_alternativo` INT(9) NULL,
  `cela` VARCHAR(255) NOT NULL,
  `nivel_ameaca` INT(1) NOT NULL,
  `id_instituicao` INT UNSIGNED NULL,
  `id_pulseira` VARCHAR(255) NULL,
  `pulsasao_max` INT NULL,
  `pulsasao_min` INT NULL,
  `desligar_alerta` BIT NOT NULL,
  `created_by` INT UNSIGNED NULL,
  `created_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` BIT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_recluso`),
  INDEX `recluso_id_instituicao_idx` (`id_instituicao` ASC) VISIBLE,
  INDEX `r_created_by_idx` (`created_by` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  CONSTRAINT `recluso_id_instituicao`
    FOREIGN KEY (`id_instituicao`)
    REFERENCES `bracelhertz`.`instituicao` (`id_instituicao`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `r_created_by`
    FOREIGN KEY (`created_by`)
    REFERENCES `bracelhertz`.`utilizador` (`id_user`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bracelhertz`.`receita_medica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bracelhertz`.`receita_medica` (
  `id_receita` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_recluso` INT UNSIGNED NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `descricao` VARCHAR(255) NULL,
  `created_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_timestamp` TIMESTAMP NULL,
  PRIMARY KEY (`id_receita`),
  INDEX `receita_id_recluso_idx` (`id_recluso` ASC) VISIBLE,
  CONSTRAINT `receita_id_recluso`
    FOREIGN KEY (`id_recluso`)
    REFERENCES `bracelhertz`.`recluso` (`id_recluso`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bracelhertz`.`registo_alerta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bracelhertz`.`registo_alerta` (
  `id_registo_alerta` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_recluso` INT UNSIGNED NULL,
  `nome` VARCHAR(255) NULL,
  `descricao` VARCHAR(255) NULL,
  `created_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_timestamp` TIMESTAMP NULL,
  PRIMARY KEY (`id_registo_alerta`),
  CONSTRAINT `alerta_id_recluso`
    FOREIGN KEY (`id_recluso`)
    REFERENCES `bracelhertz`.`recluso` (`id_recluso`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bracelhertz`.`anotacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bracelhertz`.`anotacao` (
  `id_anotacao` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_by` INT UNSIGNED NOT NULL,
  `id_user_destino` INT UNSIGNED NULL,
  `id_instituicao_destino` INT UNSIGNED NULL,
  `id_recluso_destino` INT UNSIGNED NULL,
  `id_anotacao_destino` INT UNSIGNED NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `created_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated_timestamp` TIMESTAMP NULL,
  PRIMARY KEY (`id_anotacao`),
  INDEX `ua_id_user_idx` (`created_by` ASC) VISIBLE,
  INDEX `ua_instituicao_destino_idx` (`id_instituicao_destino` ASC) VISIBLE,
  INDEX `ua_recluso_destino_idx` (`id_recluso_destino` ASC) VISIBLE,
  INDEX `ua_user_destino_idx` (`id_user_destino` ASC) VISIBLE,
  INDEX `a_id_anotacao_destino_idx` (`id_anotacao_destino` ASC) VISIBLE,
  CONSTRAINT `a_created_by`
    FOREIGN KEY (`created_by`)
    REFERENCES `bracelhertz`.`utilizador` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `a_user_destino`
    FOREIGN KEY (`id_user_destino`)
    REFERENCES `bracelhertz`.`utilizador` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `a_instituicao_destino`
    FOREIGN KEY (`id_instituicao_destino`)
    REFERENCES `bracelhertz`.`instituicao` (`id_instituicao`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `a_recluso_destino`
    FOREIGN KEY (`id_recluso_destino`)
    REFERENCES `bracelhertz`.`recluso` (`id_recluso`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `a_id_anotacao_destino`
    FOREIGN KEY (`id_anotacao_destino`)
    REFERENCES `bracelhertz`.`anotacao` (`id_anotacao`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bracelhertz`.`agenda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bracelhertz`.`agenda` (
  `id_agenda` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_user` INT UNSIGNED NULL,
  `id_recluso` INT UNSIGNED NULL,
  `nome` VARCHAR(255) NOT NULL,
  `descricao` VARCHAR(255) NULL,
  `data_inicio` TIMESTAMP NOT NULL,
  `data_fim` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id_agenda`),
  INDEX `agenda_id_user_idx` (`id_user` ASC) VISIBLE,
  INDEX `agenda_id_recluso_idx` (`id_recluso` ASC) VISIBLE,
  CONSTRAINT `agenda_id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `bracelhertz`.`utilizador` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `agenda_id_recluso`
    FOREIGN KEY (`id_recluso`)
    REFERENCES `bracelhertz`.`recluso` (`id_recluso`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bracelhertz`.`utilizador_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bracelhertz`.`utilizador_log` (
  `id_utilizador_log` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `updated_by` INT UNSIGNED NOT NULL,
  `user_updated` INT UNSIGNED NOT NULL,
  `descricao` VARCHAR(255) NULL,
  `updated_timestamp` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id_utilizador_log`),
  INDEX `ul_updated_by_idx` (`updated_by` ASC) VISIBLE,
  INDEX `ul_user_updated_idx` (`user_updated` ASC) VISIBLE,
  CONSTRAINT `ul_updated_by`
    FOREIGN KEY (`updated_by`)
    REFERENCES `bracelhertz`.`utilizador` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `ul_user_updated`
    FOREIGN KEY (`user_updated`)
    REFERENCES `bracelhertz`.`utilizador` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bracelhertz`.`recluso_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bracelhertz`.`recluso_log` (
  `id_recluso_log` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `updated_by` INT UNSIGNED NOT NULL,
  `recluso_updated` INT UNSIGNED NOT NULL,
  `descricao` VARCHAR(255) NULL,
  `updated_timestamp` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id_recluso_log`),
  INDEX `rl_recluso_updated_idx` (`recluso_updated` ASC) VISIBLE,
  INDEX `rl_updated_by_idx` (`updated_by` ASC) VISIBLE,
  CONSTRAINT `rl_updated_by`
    FOREIGN KEY (`updated_by`)
    REFERENCES `bracelhertz`.`utilizador` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `rl_recluso_updated`
    FOREIGN KEY (`recluso_updated`)
    REFERENCES `bracelhertz`.`recluso` (`id_recluso`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bracelhertz`.`timestamps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bracelhertz`.`timestamps` (
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL);


-- -----------------------------------------------------
-- Table `bracelhertz`.`registo_criminal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bracelhertz`.`registo_criminal` (
  `id_registo_criminal` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_recluso` INT UNSIGNED NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `data_imitido` DATE NOT NULL,
  PRIMARY KEY (`id_registo_criminal`),
  INDEX `rc_id_recluso_idx` (`id_recluso` ASC) VISIBLE,
  CONSTRAINT `rc_id_recluso`
    FOREIGN KEY (`id_recluso`)
    REFERENCES `bracelhertz`.`recluso` (`id_recluso`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
