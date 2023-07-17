SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=1;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema serenity
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema serenity
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `serenity` DEFAULT CHARACTER SET utf8 ;
USE `serenity` ;
-- -----------------------------------------------------
-- Table `serenity`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`user` (
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
ALTER TABLE `serenity`.`user`
CHANGE COLUMN `access_tables` `roles` VARCHAR(45) NOT NULL DEFAULT 'Patient' ;
-- -----------------------------------------------------
-- Table `serenity`.`Batiment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`batiment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom_batiment` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`staff` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `roles` VARCHAR(200) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_staff_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `serenity`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`service` (
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
    REFERENCES `serenity`.`batiment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_service_staff_id`
    FOREIGN KEY (`staff_id`)
    REFERENCES `serenity`.`staff` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Practitioner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`practitioner` (
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
    REFERENCES `serenity`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pract_service_id`
    FOREIGN KEY (`service_id`)
    REFERENCES `serenity`.`service` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`patient` (
  `social_secu_number` VARCHAR(50) NOT NULL,
  `blood_group` VARCHAR(100) NOT NULL,
  `allergy` VARCHAR(100) NOT NULL,
  `remark` VARCHAR(9400) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`social_secu_number`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_patient_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `serenity`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Identification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`identification` (
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
    REFERENCES `serenity`.`practitioner` (`identifier_rpps`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ident_patient_social_secu_number`
    FOREIGN KEY (`social_secu_number`)
    REFERENCES `serenity`.`patient` (`social_secu_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ident_staff_staff_id`
    FOREIGN KEY (`staff_id`)
    REFERENCES `serenity`.`staff` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Intervention`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`intervention` (
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
    REFERENCES `serenity`.`practitioner` (`identifier_rpps`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_inter_staff_staff_id`
    FOREIGN KEY (`staff_id`)
    REFERENCES `serenity`.`staff` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_inter_patient_social_secu_number`
    FOREIGN KEY (`social_secu_number`)
    REFERENCES `serenity`.`patient` (`social_secu_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`DocumentAdministratif`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`documentadministratif` (
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
    REFERENCES `serenity`.`staff` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_doc_inter_intervention_id`
    FOREIGN KEY (`intervention_id`)
    REFERENCES `serenity`.`intervention` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Resources`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`resources` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title_resource` VARCHAR(255) NOT NULL,
  `type_resource` VARCHAR(45) NOT NULL,
  `link` VARCHAR(1000) NOT NULL,
  `staff_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_staff_id_idx` (`staff_id` ASC) VISIBLE,
  CONSTRAINT `fk_id_staff_resource`
    FOREIGN KEY (`staff_id`)
    REFERENCES `serenity`.`staff` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Step`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`step` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom_step` VARCHAR(100) NOT NULL,
  `pct_progress` VARCHAR(45) NOT NULL,
  `intervention_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `intervention_id_idx` (`intervention_id` ASC) VISIBLE,
  CONSTRAINT `fk_step_intervention_id`
    FOREIGN KEY (`intervention_id`)
    REFERENCES `serenity`.`intervention` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`UnderStep`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serenity`.`understep` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `statut` TINYINT NOT NULL,
  `step_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `step_id_idx` (`step_id` ASC) VISIBLE,
  CONSTRAINT `fk_understep_step_id`
    FOREIGN KEY (`step_id`)
    REFERENCES `serenity`.`step` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `serenity`.`Resource_UnderStep_Intervention`
-- -----------------------------------------------------
CREATE TABLE serenity.resource_understep_intervention (
  `id` INT NOT NULL AUTO_INCREMENT,
  resource_id INT NOT NULL,
  understep_id INT NOT NULL,
  intervention_id INT NOT NULL,
  PRIMARY KEY (id, resource_id, understep_id, intervention_id),
  INDEX idx_resource_id (resource_id),
  INDEX idx_understep_id (understep_id),
  INDEX idx_intervention_id (intervention_id),
  FOREIGN KEY (resource_id) REFERENCES serenity.resources (id),
  FOREIGN KEY (understep_id) REFERENCES serenity.understep (id),
  FOREIGN KEY (intervention_id) REFERENCES serenity.intervention (id)
)
ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Modifier le type de la colonne "type_intervention" dans la table Intervention
ALTER TABLE serenity.intervention
MODIFY COLUMN type_intervention VARCHAR(100) NOT NULL,
ADD INDEX idx_type_intervention (type_intervention);
-- Modifier le type de la colonne "type_intervention" dans la table Resource
ALTER TABLE serenity.resources
ADD COLUMN type_intervention VARCHAR(100) NOT NULL,
ADD FOREIGN KEY (type_intervention) REFERENCES serenity.intervention (type_intervention),
ADD INDEX idx_type_intervention_resources (type_intervention);
-- Modifier le type de la colonne "type_intervention" dans la table UnderStep
ALTER TABLE serenity.understep
ADD COLUMN type_intervention VARCHAR(100) NOT NULL,
ADD FOREIGN KEY (type_intervention) REFERENCES serenity.intervention (type_intervention),
ADD INDEX idx_type_intervention_understep (type_intervention);
-- Ajouter la colonne "type_intervention" dans la table Resource_UnderStep_Intervention
ALTER TABLE serenity.resource_understep_intervention
ADD COLUMN type_intervention VARCHAR(100) NOT NULL,
ADD FOREIGN KEY (type_intervention) REFERENCES serenity.intervention (type_intervention),
ADD FOREIGN KEY (type_intervention) REFERENCES serenity.resources (type_intervention),
ADD FOREIGN KEY (type_intervention) REFERENCES serenity.understep (type_intervention);
-- Ajouter les index
CREATE INDEX idx_type_intervention_resource_understep_intervention ON serenity.resource_understep_intervention (type_intervention);
-- Update serenity.Intervention table
ALTER TABLE serenity.intervention
ALTER COLUMN type_intervention SET DEFAULT 'Default Intervention';
-- Update serenity.Resources table
ALTER TABLE serenity.resources
ALTER COLUMN type_intervention SET DEFAULT 'Default Intervention';
-- Update serenity.UnderStep table
ALTER TABLE serenity.understep
ALTER COLUMN type_intervention SET DEFAULT 'Default Intervention';
-- Update serenity.Resource_UnderStep_Intervention table
ALTER TABLE serenity.resource_understep_intervention
ALTER COLUMN type_intervention SET DEFAULT 'Default Intervention';

-- Insertion des bâtiments
INSERT INTO serenity.batiment (id, nom_batiment)
VALUES
    (1, 'Batiment A'),
    (2, 'Batiment B'),
    (3, 'Batiment C');
    
-- Insertion des utilisateurs
INSERT INTO serenity.user (id, last_name, first_name, age, gender, phone, nationality, address, city, zip_code, roles, email)
VALUES
    (1, 'Clin', 'Jean', 35, 'Male', '0612345678', 'French', '50 boulevard de la liberté', 'Lille', 59000, 'Admin', 'jean.clin@hopital.com'),
    (2, 'Martin', 'Sophie', 40, 'Female', '0676543210', 'French', '2 rue des entrepreneurs', 'Marcq-en-Baroeul', 59700, 'Secretaire', 'sophie.martin@hopital.com'),
    (3, 'Dubois', 'Pierre', 42, 'Male', '0611223344', 'French', '32 rue des hautes voies', 'Marcq-en-Baroeul', 59700, 'Secretaire', 'pierre.dubois@hopital.com'),
    (4, 'Lefebvre', 'Marie', 38, 'Female', '0698765432', 'French', '32 rue de lille', 'Lambersart', 59130, 'Manager', 'marie.lefebvre@hopital.com'),
    (5, 'Moreau', 'Thomas', 45, 'Male', '0678901234', 'French', '27 rue jean jaures', 'Lille', 59000, 'Agent', 'thomas.moreau@hopital.com'),
    (6, 'Briez', 'Nicolas', 28, 'Male', '0320537870', 'French', '117 Avenue de Dunkerque', 'Lille', 59000, 'Practicien', 'f.manno@ramsaygds.fr'),
    (7, 'Jaillard', 'Sophie', 32, 'female', '0320932093', 'French', '91 Avenue Marx Dormoy', 'Lille', 59000, 'Practicien', 'sophie.jaillard@chirurgie.com'),
    (8, 'Hourtoulle', 'Maud', 41, 'Female', '0320548767', 'French', '36 bis rue nicolas leblanc', 'Lille', 59000, 'Practicien', 'maud.hourtoulle@chirurgiedentaire.com'),
    (9, 'Wolber', 'Alexis', 39, 'Male', '0320515750', 'French', '56 boulevard Carnot', 'Lille', 59000, 'Practicien', 'alexis.wolber@chirurgieesthetique.com'),
    (10, 'Bourguet', 'Arnaud', 36, 'Male', '0320924950', 'French', '117 Avenue de Dunkerque', 'Lille', 59000, 'Practicien', 'arnaud.bourguet@gastro-enterologue.com'),
    (11, 'Dupont', 'John', 50, 'Male', '0689421577', 'French', '34 rue Jean Lebas', 'Lille', 59000, 'Patient', 'john.dupont@gmail.com'),
    (12, 'Gaudemer', 'Emma', 27, 'Female', '0645679567', 'French', '123 rue de la Bassée', 'Lille', 59000, 'Patient', 'emma.gaudemer@gmail.com'),
    (13, 'Foubert', 'Edouard', 33, 'Male', '0667987809', 'French', '45 rue nationale', 'Lille', 59000, 'Patient', 'edouard.foubert@gmail.com'),
    (14, 'Rondo', 'Olivia', 29, 'Female', '0698678984', 'French', '34 rue des bouchers', 'Lille', 59000, 'Patient', 'olivia.rondo@gmail.com'),
    (15, 'Miller', 'Sophia', 31, 'Female', '0645678909', 'French', '1 rue des penitentes', 'Lille', 59000, 'Patient', 'sophia.miller@gmail.com');

-- Insertion des membres du personnel
INSERT INTO serenity.staff (id, roles, user_id)
VALUES
    (1, 'Admin', 1),
    (2, 'Secretaire', 2),
    (3, 'Secretaire', 3),
    (4, 'Manager', 4),
    (5, 'Agent', 5);
-- Insertion des services
INSERT INTO serenity.service (id, nom_service, etage, staff_id, batiment_id)
VALUES
    (1, 'Cardiologie', 'Etage 1', 2, 1),
    (2, 'Chirurgie orthopédique', 'Etage 2', 2, 1),
    (3, 'Chirurgie dentaire', 'Etage 1', 2, 2),
    (4, 'Neurologie', 'Etage 2', 2, 2),
    (5, 'Pédiatrie', 'Etage 1', 3, 3);
-- Insertion des praticiens
INSERT INTO serenity.practitioner (identifier_rpps, speciality, longitude, latitude, type_intervention, user_id, service_id)
VALUES
    (1001, 'Cardiologie', '2.974381923675537', '50.6445198059082','Chirurgie', 6, 1),
    (1002, 'Orthopédie', '3.031752109527588', '50.63371658325195','Chirurgie', 7, 2),
    (1003, 'Chirurgie dentaire', '3.0612124', '50.6288448','Pose implant', 8, 3),
    (1004, 'Chirurgie esthétique', '3.0685616', '50.6395922','Pose implant', 9, 4),
    (1005, 'Gastro-Pediatre', '3.030643', '50.6338748','Chirurgie', 10, 5);
-- Insertion des patients
INSERT INTO serenity.patient (social_secu_number, blood_group, allergy, remark, user_id)
VALUES
    (100001, 'A+', 'Pollen', 'Hyper-tension', 11),
    (100002, 'B-', 'Lactose', 'Tachycardie', 12),
    (100003, 'O+', 'Pénicilline', 'Diabétique', 13),
    (100004, 'AB+', 'Arachides', 'narcoleptique', 14),
    (100005, 'A-', 'Amoxicilline', 'insomniaque', 15);

######################################### CREATION INTERVENTION 1 ################################################
-- Insérer une nouvelle intervention
INSERT INTO intervention (social_secu_number, identifier_rpps, procedure_date, pct_progress_total, type_intervention, nom_intervention, staff_id)
VALUES (100004, 1002, '2023-07-28', 0, 'chirurgie',
 'Amputation genou droit', 2);
-- Récupérer l'ID de l'intervention nouvellement créée
SET @intervention_id = LAST_INSERT_ID();
-- Insérer les étapes de l'intervention
INSERT INTO step (nom_step, pct_progress, intervention_id)
VALUES ('comprendre mon opération', 0, @intervention_id),
       ('se débarrasser des formalités administratives', 0, @intervention_id),
       ('préparer mon arrivée en toute sérénité', 0, @intervention_id),
       ('préparer ma sortie', 0, @intervention_id),
       ('ma check list', 0, @intervention_id);
-- Récupérer l'ID de l'intervention nouvellement créée
SET @step_id = LAST_INSERT_ID();
-- Insérer les sous-étapes de l'intervention 
INSERT INTO understep (statut, step_id, type_intervention)
VALUES (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+3, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id));
       
######################################### CREATION INTERVENTION 2 ################################################
-- Insérer une nouvelle intervention
INSERT INTO intervention (social_secu_number, identifier_rpps, procedure_date, pct_progress_total, type_intervention, nom_intervention, staff_id)
VALUES (100001, 1004, '2023-07-29', 0, 'Pose implant',
 'Pose implant mammaire', 3);
-- Récupérer l'ID de l'intervention nouvellement créée
SET @intervention_id = LAST_INSERT_ID();
-- Insérer les étapes de l'intervention
INSERT INTO step (nom_step, pct_progress, intervention_id)
VALUES ('comprendre mon opération', 0, @intervention_id),
       ('se débarrasser des formalités administratives', 0, @intervention_id),
       ('préparer mon arrivée en toute sérénité', 0, @intervention_id),
       ('préparer ma sortie', 0, @intervention_id),
       ('ma check list', 0, @intervention_id);
-- Récupérer l'ID de l'intervention nouvellement créée
SET @step_id = LAST_INSERT_ID();
-- Insérer les sous-étapes de l'intervention 
INSERT INTO understep (statut, step_id, type_intervention)
VALUES (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+3, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id));

######################################### CREATION INTERVENTION 3 ################################################
-- Insérer une nouvelle intervention
INSERT INTO intervention (social_secu_number, identifier_rpps, procedure_date, pct_progress_total, type_intervention, nom_intervention, staff_id)
VALUES (100002, 1005, '2023-08-02', 0, 'chirurgie',
 'Appendicectomie', 2);
-- Récupérer l'ID de l'intervention nouvellement créée
SET @intervention_id = LAST_INSERT_ID();
-- Insérer les étapes de l'intervention
INSERT INTO step (nom_step, pct_progress, intervention_id)
VALUES ('comprendre mon opération', 0, @intervention_id),
       ('se débarrasser des formalités administratives', 0, @intervention_id),
       ('préparer mon arrivée en toute sérénité', 0, @intervention_id),
       ('préparer ma sortie', 0, @intervention_id),
       ('ma check list', 0, @intervention_id);
-- Récupérer l'ID de l'intervention nouvellement créée
SET @step_id = LAST_INSERT_ID();
-- Insérer les sous-étapes de l'intervention 
INSERT INTO understep (statut, step_id, type_intervention)
VALUES (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+3, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id));

######################################### CREATION INTERVENTION 4 ################################################
-- Insérer une nouvelle intervention
INSERT INTO intervention (social_secu_number, identifier_rpps, procedure_date, pct_progress_total, type_intervention, nom_intervention, staff_id)
VALUES (100002, 1003, '2023-08-10', 0, 'Pose implant',
 'Pose implant molaire', 3);
-- Récupérer l'ID de l'intervention nouvellement créée
SET @intervention_id = LAST_INSERT_ID();
-- Insérer les étapes de l'intervention
INSERT INTO step (nom_step, pct_progress, intervention_id)
VALUES ('comprendre mon opération', 0, @intervention_id),
       ('se débarrasser des formalités administratives', 0, @intervention_id),
       ('préparer mon arrivée en toute sérénité', 0, @intervention_id),
       ('préparer ma sortie', 0, @intervention_id),
       ('ma check list', 0, @intervention_id);
-- Récupérer l'ID de l'intervention nouvellement créée
SET @step_id = LAST_INSERT_ID();
-- Insérer les sous-étapes de l'intervention 
INSERT INTO understep (statut, step_id, type_intervention)
VALUES (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+3, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id));

######################################### CREATION INTERVENTION 5 ################################################
-- Insérer une nouvelle intervention
INSERT INTO intervention (social_secu_number, identifier_rpps, procedure_date, pct_progress_total, type_intervention, nom_intervention, staff_id)
VALUES (100003, 1005, '2023-10-11', 0, 'chirurgie',
 'Transplantation rénale', 2);
-- Récupérer l'ID de l'intervention nouvellement créée
SET @intervention_id = LAST_INSERT_ID();
-- Insérer les étapes de l'intervention
INSERT INTO step (nom_step, pct_progress, intervention_id)
VALUES ('comprendre mon opération', 0, @intervention_id),
       ('se débarrasser des formalités administratives', 0, @intervention_id),
       ('préparer mon arrivée en toute sérénité', 0, @intervention_id),
       ('préparer ma sortie', 0, @intervention_id),
       ('ma check list', 0, @intervention_id);
-- Récupérer l'ID de l'intervention nouvellement créée
SET @step_id = LAST_INSERT_ID();
-- Insérer les sous-étapes de l'intervention 
INSERT INTO understep (statut, step_id, type_intervention)
VALUES (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+1, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+2, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+3, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id)),
       (0, @step_id+4, (SELECT type_intervention FROM intervention WHERE intervention.id= @intervention_id));

-- Insertion des ressources
INSERT INTO serenity.resources (id, title_resource, type_resource, link, staff_id, type_intervention)
VALUES
    (1, "Chirurgie cardiologique", 'Video', 'http://example.com/resource1', 2, 'Chirurgie'),
    (2, "Implant molaire", 'Image', 'http://example.com/resource2', 3, 'Pose implant'),
    (3, "Chirurgie cardiologique", 'Image', 'http://example.com/resource3', 2, 'Chirurgie'),
    (4, "Implant molaire", 'Video', 'http://example.com/resource4', 3, 'Pose implant'),
    (5, "Chirurgie cardiologique", 'Video', 'http://example.com/resource5', 2, 'Chirurgie');
-- Insertion des liens entre ressources, sous-étapes et interventions
/*
INSERT INTO serenity.resource_understep_intervention (id, resource_id, understep_id, intervention_id, type_intervention)
VALUES
    (1, 1, 1, 1, 'Chirurgie'),
    (2, 2, 2, 1, 'Chirurgie'),
    (3, 3, 3, 1, 'Chirurgie'),
    (4, 4, 4, 1, 'Chirurgie'),
    (5, 5, 5, 1, 'Chirurgie'),
    (6, 1, 6, 2, 'Chirurgie'),
    (7, 2, 7, 2, 'Chirurgie'),
    (8, 3, 8, 2, 'Chirurgie'),
    (9, 4, 9, 2, 'Chirurgie'),
    (10, 5, 10, 2, 'Chirurgie'),
    (11, 1, 11, 3, 'Chirurgie'),
    (12, 2, 12, 3, 'Chirurgie'),
    (13, 3, 13, 3, 'Chirurgie'),
    (14, 4, 14, 3, 'Chirurgie'),
    (15, 5, 15, 3, 'Chirurgie'),
    (16, 1, 16, 4, 'Chirurgie'),
    (17, 2, 17, 4, 'Chirurgie'),
    (18, 3, 18, 4, 'Chirurgie'),
    (19, 4, 19, 4, 'Chirurgie'),
    (20, 5, 20, 4, 'Chirurgie'),
    (21, 1, 21, 5, 'Chirurgie'),
    (22, 2, 22, 5, 'Chirurgie'),
    (23, 3, 23, 5, 'Chirurgie'),
    (24, 4, 24, 5, 'Chirurgie'),
    (25, 5, 25, 5, 'Chirurgie');
*/
INSERT INTO serenity.documentadministratif (id_card_link, statu_id_card, mutual_card_link, statut_card_link, informed_consent, statut_informed_consent, anesthetic_consultation, statut_anestheic_consultation, covid_test, staut_covid_test, credit_card, statut_credit_card, staff_id, intervention_id)
VALUES
    ('http://example.com/id_card_link1', 0, 'http://example.com/mutual_card_link1', 0, 'http://example.com/informed_consent1', 0, 'http://example.com/anesthetic_consultation1', 0, 'http://example.com/covid_test1', 0, 'http://example.com/credit_card1', 0, 2, 1),
    ('http://example.com/id_card_link2', 0, 'http://example.com/mutual_card_link2', 0, 'http://example.com/informed_consent2', 0, 'http://example.com/anesthetic_consultation2', 0, 'http://example.com/covid_test2', 0, 'http://example.com/credit_card2', 0, 3, 2),
    ('http://example.com/id_card_link3', 0, 'http://example.com/mutual_card_link3', 0, 'http://example.com/informed_consent3', 0, 'http://example.com/anesthetic_consultation3', 0, 'http://example.com/covid_test3', 0, 'http://example.com/credit_card3', 0, 2, 3),
    ('http://example.com/id_card_link4', 0, 'http://example.com/mutual_card_link4', 0, 'http://example.com/informed_consent4', 0, 'http://example.com/anesthetic_consultation4', 0, 'http://example.com/covid_test4', 0, 'http://example.com/credit_card4', 0, 3, 4),
    ('http://example.com/id_card_link5', 0, 'http://example.com/mutual_card_link5', 0, 'http://example.com/informed_consent5', 0, 'http://example.com/anesthetic_consultation5', 0, 'http://example.com/covid_test5', 0, 'http://example.com/credit_card5', 0, 2, 5);
-- Insert user accounts for patients
INSERT INTO serenity.identification (pwd, roles, email, user_id, social_secu_number)
SELECT 'patient123', 'Patient', CONCAT('patient', P.user_id, '@example.com'), U.id, P.social_secu_number
FROM serenity.user U
JOIN serenity.patient P ON U.id = P.user_id;
-- Insert user accounts for staff
INSERT INTO serenity.identification (pwd, roles, email, user_id, staff_id)
SELECT 'staff123', 'Staff', CONCAT('staff', S.id, '@example.com'), U.id, S.id
FROM serenity.user U
JOIN serenity.staff S ON U.id = S.user_id;
-- Insert user accounts for practitioners
INSERT INTO serenity.identification (pwd, roles, email, user_id, identifier_rpps)
SELECT 'practitioner123', 'Practitioner', CONCAT('practitioner', P.user_id, '@example.com'), U.id, P.identifier_rpps
FROM serenity.user U
JOIN serenity.practitioner P ON U.id = P.user_id;

######################################### ADMIN CREATION (Batiment + Service )  ################################################
-- Creation d'un Batiment
INSERT INTO batiment (nom_batiment)
VALUES ('Batiment D');
SET @batiment_id = LAST_INSERT_ID();
-- Creation d'un Service
INSERT INTO service (nom_service,etage,staff_id,batiment_id)
VALUES ('Reanimation','Etage 1', 2, @batiment_id); # ? : nom_service,etage / ! : staff_id = 2 / @ : batiment_id (JS)
-- Créer une nouvelle identification pour l'utilisateur du praticien
########################## Secretaire CREATION (Ressources + User ==> Patient + Practicien ==> Identification ==> Intervention ==> DocumentAdministratif)  ################################################
######################################### CREATION Patient ################################################
-- Creation d'un User
INSERT INTO user (last_name, first_name, age, gender, phone, nationality, address, city, zip_code, roles, email)
VALUES ('Beatrice', 'Simon', 30, 'Female', '0670898075', 'French', '75 Rue esquermoise', 'Lille', '59000', 'Patient', 'beatrice.simon@example.com');
SET @user_id = LAST_INSERT_ID(); 
-- Créer un nouveau patient
INSERT INTO patient (social_secu_number, blood_group, allergy, remark, user_id)
VALUES ('100006', 'O+', 'Amoxicilline', 'No remarks', @user_id); 
-- Créer une nouvelle identification pour l'utilisateur du patient
INSERT INTO identification (pwd, roles, 
 email, 
 user_id, 
 social_secu_number,
 staff_id) 
VALUES ('password123', 'Patient', 
 (SELECT email FROM serenity.user AS U WHERE U.id = @user_id), 
 @user_id, 
 (SELECT social_secu_number FROM serenity.patient P WHERE P.user_id = @user_id),
 2
 );
######################################### CREATION Practitionner ################################################
-- Creation d'un User
INSERT INTO user (last_name, first_name, age, gender, phone, nationality, address, city, zip_code, roles, email)
VALUES ('Coquet', 'Bruno', 30, 'Masculin', '0123456789', 'French', '71 avenue marx dormoy', 'Lille', '59000', 'Practitioner', 'coquet.bruno@example.com');
SET @user_id = LAST_INSERT_ID(); 
-- Créer un nouveau praticien
INSERT INTO practitioner (identifier_rpps, speciality, longitude, latitude, type_intervention, user_id, service_id)
VALUES ('1006', 'Cardiologie', '3.0351529' , '50.6348635', 'Chirurgie', @user_id,
 (SELECT id FROM serenity.service S WHERE S.nom_service = 'Reanimation')); # ATTENTION : Remplace nom_intervention dans le back par ? (JS) (SELECT service_id FROM serenity.service S WHERE S.nom_intervention = "Reanimation")); # ATTENTION : Remplace nom_intervention dans le back par ? (JS)
-- Créer une nouvelle identification pour l'utilisateur du praticien
INSERT INTO identification (pwd, roles, 
email, 
user_id, 
identifier_rpps,
staff_id)
SELECT 'Smith123', 'Practitioner',
(SELECT email FROM serenity.user AS U WHERE U.id = @user_id), #
@user_id , 
(SELECT identifier_rpps FROM serenity.practitioner P WHERE P.user_id = @user_id
),
2;
       -- Insérer les documents administratifs
INSERT INTO serenity.documentadministratif (id_card_link, statu_id_card, mutual_card_link, statut_card_link,
informed_consent, statut_informed_consent, anesthetic_consultation, statut_anestheic_consultation, covid_test,
 staut_covid_test, credit_card, statut_credit_card, staff_id, intervention_id)
VALUES ('valeur1', 0, 'valeur2', 0, 'valeur3', 0, 'valeur4', 0, 'valeur5', 0,'valeur6', 0, 2,  @intervention_id);

######################################### CREATION RESSOURCES ################################################
-- Insertion des ressources
INSERT INTO serenity.resources (title_resource, type_resource, link, staff_id, type_intervention)
VALUES
    ("Chirurgie du genou", 'Video', 'assets/prothese_totale_genou.mp4', 2, 'chirurgie'),
    ("Prothèse du genou", 'Pdf', 'assets/prothese_genou.pdf', 2, 'chirurgie'),
    ("Prothèse totale du genou", 'Pdf', 'assets/prothese-totale-du-genou.pdf', 2, 'chirurgie'),
    ("Prothèse totale du genou", 'Pdf', 'assets/prothese-totale-genou.pdf', 2, 'chirurgie');
