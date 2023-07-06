SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=1;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema serenity
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema serenity
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Table `serenity`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `last_name` VARCHAR(100) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `age` INT NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `nationality` VARCHAR(100) NOT NULL,
  `address` VARCHAR(300) NOT NULL,
  `city` VARCHAR(50) NOT NULL,
  `zip_code` VARCHAR(50) NOT NULL,
  `access_tables` VARCHAR(45) NULL,
  `email` VARCHAR(145) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
ALTER TABLE `serenity`.`User`
CHANGE COLUMN `access_tables` `roles` VARCHAR(45) NOT NULL DEFAULT 'Patient' ;
-- -----------------------------------------------------
-- Table `serenity`.`Batiment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`Batiment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom_batiment` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`Staff` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `roles` VARCHAR(200) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_staff_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `serenity`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`Service` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom_service` VARCHAR(45) NOT NULL,
  `etage` VARCHAR(45) NOT NULL,
  `staff_id` INT NOT NULL,
  `batiment_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `batiment_id_idx` (`batiment_id` ASC) VISIBLE,
  INDEX `staff_id_idx` (`staff_id` ASC) VISIBLE,
  CONSTRAINT `fk_service_batiment_id`
    FOREIGN KEY (`batiment_id`)
    REFERENCES `serenity`.`Batiment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_service_staff_id`
    FOREIGN KEY (`staff_id`)
    REFERENCES `serenity`.`Staff` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Practitioner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`Practitioner` (
  `identifier_rpps` VARCHAR(50) NOT NULL,
  `speciality` VARCHAR(100),
  `longitude` VARCHAR(100) NULL,
  `latitude` VARCHAR(100) NULL,
  `type_intervention` VARCHAR(100) NOT NULL,
  `user_id` INT NOT NULL,
  `service_id` INT NOT NULL,
  PRIMARY KEY (`identifier_rpps`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `service_id_idx` (`service_id` ASC) VISIBLE,
  CONSTRAINT `fk_pract_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `serenity`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pract_service_id`
    FOREIGN KEY (`service_id`)
    REFERENCES `serenity`.`Service` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`Patient` (
  `social_secu_number` VARCHAR(50) NOT NULL,
  `blood_group` VARCHAR(100) NOT NULL,
  `allergy` VARCHAR(100) NOT NULL,
  `remark` VARCHAR(9400) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`social_secu_number`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_patient_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `serenity`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Identification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`Identification` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pwd` VARCHAR(145) NOT NULL,
  `roles` VARCHAR(100) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  `identifier_rpps`  VARCHAR(50),
  `social_secu_number` VARCHAR(50),
  `staff_id` INT,
  PRIMARY KEY (`id`, `email`, `pwd`),
  INDEX `indentifier_rpps_idx` (`identifier_rpps` ASC) VISIBLE,
  INDEX `social_secu_number_idx` (`social_secu_number` ASC) VISIBLE,
  INDEX `staff_id_idx` (`staff_id` ASC) VISIBLE,
  CONSTRAINT `fk_ident_prac_indentifier_rpps`
    FOREIGN KEY (`identifier_rpps`)
    REFERENCES `serenity`.`Practitioner` (`identifier_rpps`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ident_patient_social_secu_number`
    FOREIGN KEY (`social_secu_number`)
    REFERENCES `serenity`.`Patient` (`social_secu_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ident_staff_staff_id`
    FOREIGN KEY (`staff_id`)
    REFERENCES `serenity`.`Staff` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Intervention`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`Intervention` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom_Intervention` VARCHAR(255),
  `type_intervention` VARCHAR(100) NOT NULL,
  `procedure_date` DATE NOT NULL,
  `pct_progress_total` INT NOT NULL,
  `identifier_rpps` VARCHAR(50) NOT NULL,
  `staff_id` INT NOT NULL,
  `social_secu_number` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`, `type_intervention`),
  INDEX `identifier_rpps_idx` (`identifier_rpps` ASC) VISIBLE,
  INDEX `staff_id_idx` (`staff_id` ASC) VISIBLE,
  INDEX `social_secu_number_idx` (`social_secu_number` ASC) VISIBLE,
  CONSTRAINT `fk_inter_prac_identifier_rpps`
    FOREIGN KEY (`identifier_rpps`)
    REFERENCES `serenity`.`Practitioner` (`identifier_rpps`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_inter_staff_staff_id`
    FOREIGN KEY (`staff_id`)
    REFERENCES `serenity`.`Staff` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_inter_patient_social_secu_number`
    FOREIGN KEY (`social_secu_number`)
    REFERENCES `serenity`.`Patient` (`social_secu_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`DocumentAdministratif`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`DocumentAdministratif` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_card_link` VARCHAR(900) NOT NULL,
  `statu_id_card` TINYINT NOT NULL,
  `mutual_card_link` VARCHAR(90) NOT NULL,
  `statut_card_link` TINYINT NOT NULL,
  `informed_consent` VARCHAR(900) NOT NULL,
  `statut_informed_consent` TINYINT NOT NULL,
  `anesthetic_consultation` VARCHAR(90) NOT NULL,
  `statut_anestheic_consultation` TINYINT NOT NULL,
  `covid_test` VARCHAR(90) NOT NULL,
  `staut_covid_test` TINYINT NOT NULL,
  `credit_card` VARCHAR(90) NOT NULL,
  `statut_credit_card` TINYINT NOT NULL,
  `staff_id` INT NOT NULL,
  `intervention_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `staff_id_idx` (`staff_id` ASC) VISIBLE,
  INDEX `intervention_id_idx` (`intervention_id` ASC) VISIBLE,
  CONSTRAINT `fk_doc_staff_staff_id`
    FOREIGN KEY (`staff_id`)
    REFERENCES `serenity`.`Staff` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_doc_inter_intervention_id`
    FOREIGN KEY (`intervention_id`)
    REFERENCES `serenity`.`Intervention` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Resources`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`Resources` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title_resource` VARCHAR(255) NOT NULL,
  `type_resource` VARCHAR(45) NOT NULL,
  `link` VARCHAR(1000) NOT NULL,
  `staff_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_staff_id_idx` (`staff_id` ASC) VISIBLE,
  CONSTRAINT `fk_id_staff_resource`
    FOREIGN KEY (`staff_id`)
    REFERENCES `serenity`.`Staff` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Step`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`Step` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom_step` VARCHAR(100) NOT NULL,
  `pct_progress` VARCHAR(45) NOT NULL,
  `intervention_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `intervention_id_idx` (`intervention_id` ASC) VISIBLE,
  CONSTRAINT `fk_step_intervention_id`
    FOREIGN KEY (`intervention_id`)
    REFERENCES `serenity`.`Intervention` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`UnderStep`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`UnderStep` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `statut` TINYINT NOT NULL,
  `step_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `step_id_idx` (`step_id` ASC) VISIBLE,
  CONSTRAINT `fk_understep_step_id`
    FOREIGN KEY (`step_id`)
    REFERENCES `serenity`.`Step` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
CREATE TABLE serenity.Resource_UnderStep_Intervention (
  `id` INT NOT NULL AUTO_INCREMENT,
  resource_id INT NOT NULL,
  understep_id INT NOT NULL,
  intervention_id INT NOT NULL,
  PRIMARY KEY (id, resource_id, understep_id, intervention_id),
  INDEX idx_resource_id (resource_id),
  INDEX idx_understep_id (understep_id),
  INDEX idx_intervention_id (intervention_id),
  FOREIGN KEY (resource_id) REFERENCES serenity.Resources (id),
  FOREIGN KEY (understep_id) REFERENCES serenity.UnderStep (id),
  FOREIGN KEY (intervention_id) REFERENCES serenity.Intervention (id)
)
ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Modifier le type de la colonne "type_intervention" dans la table Intervention
ALTER TABLE serenity.Intervention
MODIFY COLUMN type_intervention VARCHAR(100) NOT NULL,
ADD INDEX idx_type_intervention (type_intervention);
-- Modifier le type de la colonne "type_intervention" dans la table Resource
ALTER TABLE serenity.Resources
ADD COLUMN type_intervention VARCHAR(100) NOT NULL,
ADD FOREIGN KEY (type_intervention) REFERENCES serenity.Intervention (type_intervention),
ADD INDEX idx_type_intervention_resources (type_intervention);
-- Modifier le type de la colonne "type_intervention" dans la table UnderStep
ALTER TABLE serenity.UnderStep
ADD COLUMN type_intervention VARCHAR(100) NOT NULL,
ADD FOREIGN KEY (type_intervention) REFERENCES serenity.Intervention (type_intervention),
ADD INDEX idx_type_intervention_understep (type_intervention);
-- Ajouter la colonne "type_intervention" dans la table Resource_UnderStep_Intervention
ALTER TABLE serenity.Resource_UnderStep_Intervention
ADD COLUMN type_intervention VARCHAR(100) NOT NULL,
ADD FOREIGN KEY (type_intervention) REFERENCES serenity.Intervention (type_intervention),
ADD FOREIGN KEY (type_intervention) REFERENCES serenity.Resources (type_intervention),
ADD FOREIGN KEY (type_intervention) REFERENCES serenity.UnderStep (type_intervention);
-- Ajouter les index
CREATE INDEX idx_type_intervention_resource_understep_intervention ON serenity.Resource_UnderStep_Intervention (type_intervention);
-- Update serenity.Intervention table
ALTER TABLE serenity.Intervention
ALTER COLUMN type_intervention SET DEFAULT 'Default Intervention';
-- Update serenity.Resources table
ALTER TABLE serenity.Resources
ALTER COLUMN type_intervention SET DEFAULT 'Default Intervention';
-- Update serenity.UnderStep table
ALTER TABLE serenity.UnderStep
ALTER COLUMN type_intervention SET DEFAULT 'Default Intervention';
-- Update serenity.Resource_UnderStep_Intervention table
ALTER TABLE serenity.Resource_UnderStep_Intervention
ALTER COLUMN type_intervention SET DEFAULT 'Default Intervention';
