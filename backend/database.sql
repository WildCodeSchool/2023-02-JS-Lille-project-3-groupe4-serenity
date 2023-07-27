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
    (1, 'Clin', 'Jean', 35, 'Homme', '0612345678', 'Française', '50 boulevard de la liberté', 'Lille', 59000, 'Admin', 'jean.clin@hopital.com'),
    (2, 'Martin', 'Sophie', 40, 'Femme', '0676543210', 'Française', '2 rue des entrepreneurs', 'Marcq-en-Baroeul', 59700, 'Secrétaire', 'sophie.martin@hopital.com'),
    (3, 'Dubois', 'Pierre', 42, 'Homme', '0611223344', 'Française', '32 rue des hautes voies', 'Marcq-en-Baroeul', 59700, 'Secrétaire', 'pierre.dubois@hopital.com'),
    (4, 'Lefebvre', 'Marie', 38, 'Femme', '0698765432', 'Française', '32 rue de lille', 'Lambersart', 59130, 'Manager', 'marie.lefebvre@hopital.com'),
    (5, 'Moreau', 'Thomas', 45, 'Homme', '0678901234', 'Française', '27 rue jean jaures', 'Lille', 59000, 'Agent', 'thomas.moreau@hopital.com'),
    (6, 'Briez', 'Nicolas', 28, 'Homme', '0320537870', 'Française', '117 Avenue de Dunkerque', 'Lille', 59000, 'Praticien', 'f.manno@ramsaygds.fr'),
    (7, 'Jaillard', 'Sophie', 32, 'Femme', '0320932093', 'Française', '91 Avenue Marx Dormoy', 'Lille', 59000, 'Praticien', 'sophie.jaillard@chirurgie.com'),
    (8, 'Hourtoulle', 'Maud', 41, 'Femme', '0320548767', 'Française', '36 bis rue nicolas leblanc', 'Lille', 59000, 'Praticien', 'maud.hourtoulle@chirurgiedentaire.com'),
    (9, 'Wolber', 'Alexis', 39, 'Homme', '0320515750', 'Française', '56 boulevard Carnot', 'Lille', 59000, 'Praticien', 'alexis.wolber@chirurgieesthetique.com'),
    (10, 'Bourguet', 'Arnaud', 36, 'Homme', '0320924950', 'Française', '117 Avenue de Dunkerque', 'Lille', 59000, 'Praticien', 'arnaud.bourguet@gastro-enterologue.com'),
    (11, 'Dupont', 'John', 50, 'Homme', '0689421577', 'Française', '34 rue Jean Lebas', 'Lille', 59000, 'Patient', 'john.dupont@gmail.com'),
    (12, 'Gaudemer', 'Emma', 27, 'Femme', '0645679567', 'Française', '123 rue de la Bassée', 'Lille', 59000, 'Patient', 'emma.gaudemer@gmail.com'),
    (13, 'Foubert', 'Edouard', 33, 'Homme', '0667987809', 'Française', '45 rue nationale', 'Lille', 59000, 'Patient', 'edouard.foubert@gmail.com'),
    (14, 'Rondo', 'Olivia', 29, 'Femme', '0698678984', 'Française', '34 rue des bouchers', 'Lille', 59000, 'Patient', 'olivia.rondo@gmail.com'),
    (15, 'Miller', 'Sophia', 31, 'Femme', '0645678909', 'Française', '1 rue des penitentes', 'Lille', 59000, 'Patient', 'sophia.miller@gmail.com'),
    (16, 'Roche', 'Sarah', 36, 'Femme', '0645678909', 'Française', '13 rue Bertrant Rocq', 'Lille', 59000, 'Praticien', 'sarah.roche@gmail.com'),
    (17, 'Bacq', 'Jacques', 56, 'Homme', '06456785869', 'Française', '18 rue Pierre Berlot', 'Lille', 59000, 'Praticien', 'jacques.bacq@gmail.com');

-- Insertion des membres du personnel
INSERT INTO serenity.staff (id, roles, user_id)
VALUES
    (1, 'Admin', 1),
    (2, 'Secrétaire', 2),
    (3, 'Secrétaire', 3),
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
    (1001, 'Cardiologie', '2.974381923675537', '50.6445198059082','Transplantation rénale', 6, 1),
    (1002, 'Orthopédie', '3.031752109527588', '50.63371658325195','Prothèse du genou', 7, 2),
    (1003, 'Chirurgie dentaire', '3.0612124', '50.6288448','Pose implant dentaire', 8, 3),
    (1004, 'Chirurgie esthétique', '3.0685616', '50.6395922','Pose implant mammaire', 9, 4),
    (1005, 'Gastro-Pediatre', '3.030643', '50.6338748','Appendicectomie', 10, 5),
    (1007, 'Orthopédie', '3.0685616', '50.6395922','Prothèse du genou', 16, 2),
    (1008, 'Orthopédie', '3.0612124', '50.6288448','Prothèse du genou', 17, 2);
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
VALUES (100004, 1002, '2023-07-28', 0, 'Prothèse du genou',
 'Prothèse totale du genou droit', 2);
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
VALUES (100001, 1004, '2023-07-29', 0, 'Pose implant mammaire',
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
VALUES (100002, 1005, '2023-08-02', 0, 'Appendicectomie',
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
VALUES (100002, 1003, '2023-08-10', 0, 'Pose implant dentaire',
 'Pose implant dentaire', 3);
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
VALUES (100003, 1005, '2023-10-11', 0, 'Transplantation rénale',
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
SELECT 'praticien123', 'Praticien', CONCAT('praticien', P.user_id, '@example.com'), U.id, P.identifier_rpps
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
VALUES ('Simon', 'Beatrice', 30, 'Femme', '0670898075', 'Française', '75 Rue esquermoise', 'Lille', '59000', 'Patient', 'beatrice.simon@example.com');
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
VALUES ('motdepasse123', 'Patient', 
 (SELECT email FROM serenity.user AS U WHERE U.id = @user_id), 
 @user_id, 
 (SELECT social_secu_number FROM serenity.patient P WHERE P.user_id = @user_id),
 2
 );
######################################### CREATION Practitionner ################################################
-- Creation d'un User
INSERT INTO user (last_name, first_name, age, gender, phone, nationality, address, city, zip_code, roles, email)
VALUES ('Coquet', 'Bruno', 30, 'Homme', '0123456789', 'Française', '71 avenue marx dormoy', 'Lille', '59000', 'Praticien', 'coquet.bruno@example.com');
SET @user_id = LAST_INSERT_ID(); 
-- Créer un nouveau praticien
INSERT INTO practitioner (identifier_rpps, speciality, longitude, latitude, type_intervention, user_id, service_id)
VALUES ('1006', 'Cardiologie', '3.0351529' , '50.6348635', 'Transplantation rénale', @user_id,
 (SELECT id FROM serenity.service S WHERE S.nom_service = 'Reanimation')); # ATTENTION : Remplace nom_intervention dans le back par ? (JS) (SELECT service_id FROM serenity.service S WHERE S.nom_intervention = "Reanimation")); # ATTENTION : Remplace nom_intervention dans le back par ? (JS)
-- Créer une nouvelle identification pour l'utilisateur du praticien
INSERT INTO identification (pwd, roles, 
email, 
user_id, 
identifier_rpps,
staff_id)
SELECT 'Smith123', 'Praticien',
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
    ("Prothèse totale du genou", 'Video', 'assets/prothese_totale_genou.mp4', 2, 'Prothèse du genou'),
    ("Prothèse totale du genou", 'Pdf', 'assets/prothese_genou.pdf', 2, 'Prothèse du genou'),
    ("Appendicectomie", 'Video', 'assets/signes_appendicite.mp4', 2, 'Appendicectomie'),
    ("Appendicectomie", 'Pdf', 'assets/appendicectomie_questions.pdf', 2, 'Appendicectomie'),
    ("Transplantation rénale", 'Video', 'assets/transplantation_renale.mp4', 2, 'Transplantation rénale'),
    ("Transplantation rénale", 'Pdf', 'assets/transplantation_renale_acces_liste_attente.pdf', 2, 'Transplantation rénale'),
    ("Pose implant mammaire", 'Video', 'assets/implant_mammaire.mp4', 2, 'Pose implant mammaire'),
    ("Pose implant mammaire", 'Pdf', 'assets/implant_mammaire_explications.pdf', 2, 'Pose implant mammaire'),
    ("Pose implant dentaire", 'Video', 'assets/implant_dentaire.mp4', 2, 'Pose implant dentaire'),
    ("Pose implant dentaire", 'Pdf', 'assets/implantologie_dentaire.pdf', 2, 'Pose implant dentaire');
