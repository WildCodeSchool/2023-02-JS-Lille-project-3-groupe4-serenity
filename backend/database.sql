-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: serenity
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `batiment`
--

DROP TABLE IF EXISTS `batiment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batiment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_batiment` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batiment`
--

LOCK TABLES `batiment` WRITE;
/*!40000 ALTER TABLE `Batiment` DISABLE KEYS */;
INSERT INTO `batiment` VALUES (1,'Batiment A'),(2,'Batiment B'),(3,'Batiment C'),(4,'Batiment D');
/*!40000 ALTER TABLE `Batiment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentadministratif`
--

DROP TABLE IF EXISTS `documentadministratif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentadministratif` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_card_link` varchar(900) NOT NULL,
  `statu_id_card` tinyint NOT NULL,
  `mutual_card_link` varchar(90) NOT NULL,
  `statut_card_link` tinyint NOT NULL,
  `informed_consent` varchar(900) NOT NULL,
  `statut_informed_consent` tinyint NOT NULL,
  `anesthetic_consultation` varchar(90) NOT NULL,
  `statut_anestheic_consultation` tinyint NOT NULL,
  `covid_test` varchar(90) NOT NULL,
  `staut_covid_test` tinyint NOT NULL,
  `credit_card` varchar(90) NOT NULL,
  `statut_credit_card` tinyint NOT NULL,
  `staff_id` int NOT NULL,
  `intervention_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `staff_id_idx` (`staff_id`),
  KEY `intervention_id_idx` (`intervention_id`),
  CONSTRAINT `fk_doc_inter_intervention_id` FOREIGN KEY (`intervention_id`) REFERENCES `intervention` (`id`),
  CONSTRAINT `fk_doc_staff_staff_id` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentAdministratif`
--

LOCK TABLES `documentadministratif` WRITE;
/*!40000 ALTER TABLE `DocumentAdministratif` DISABLE KEYS */;
INSERT INTO `documentadministratif` VALUES (1,'http://example.com/id_card_link1',0,'http://example.com/mutual_card_link1',0,'http://example.com/informed_consent1',0,'http://example.com/anesthetic_consultation1',0,'http://example.com/covid_test1',0,'http://example.com/credit_card1',0,2,1),(2,'http://example.com/id_card_link2',0,'http://example.com/mutual_card_link2',0,'http://example.com/informed_consent2',0,'http://example.com/anesthetic_consultation2',0,'http://example.com/covid_test2',0,'http://example.com/credit_card2',0,3,2),(3,'http://example.com/id_card_link3',0,'http://example.com/mutual_card_link3',0,'http://example.com/informed_consent3',0,'http://example.com/anesthetic_consultation3',0,'http://example.com/covid_test3',0,'http://example.com/credit_card3',0,2,3),(4,'http://example.com/id_card_link4',0,'http://example.com/mutual_card_link4',0,'http://example.com/informed_consent4',0,'http://example.com/anesthetic_consultation4',0,'http://example.com/covid_test4',0,'http://example.com/credit_card4',0,3,4),(5,'http://example.com/id_card_link5',0,'http://example.com/mutual_card_link5',0,'http://example.com/informed_consent5',0,'http://example.com/anesthetic_consultation5',0,'http://example.com/covid_test5',0,'http://example.com/credit_card5',0,2,5),(6,'valeur1',0,'valeur2',0,'valeur3',0,'valeur4',0,'valeur5',0,'valeur6',0,2,6);
/*!40000 ALTER TABLE `DocumentAdministratif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Identification`
--

DROP TABLE IF EXISTS `identification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `identification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pwd` varchar(145) NOT NULL,
  `roles` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `user_id` int NOT NULL,
  `identifier_rpps` varchar(50) DEFAULT NULL,
  `social_secu_number` varchar(50) DEFAULT NULL,
  `staff_id` int DEFAULT NULL,
  PRIMARY KEY (`id`,`email`,`pwd`),
  KEY `indentifier_rpps_idx` (`identifier_rpps`),
  KEY `social_secu_number_idx` (`social_secu_number`),
  KEY `staff_id_idx` (`staff_id`),
  CONSTRAINT `fk_ident_patient_social_secu_number` FOREIGN KEY (`social_secu_number`) REFERENCES `patient` (`social_secu_number`),
  CONSTRAINT `fk_ident_prac_indentifier_rpps` FOREIGN KEY (`identifier_rpps`) REFERENCES `practitioner` (`identifier_rpps`),
  CONSTRAINT `fk_ident_staff_staff_id` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Identification`
--

LOCK TABLES `identification` WRITE;
/*!40000 ALTER TABLE `Identification` DISABLE KEYS */;
INSERT INTO `identification` VALUES (1,'patient123','Patient','patient11@example.com',11,NULL,'100001',NULL),(2,'patient123','Patient','patient12@example.com',12,NULL,'100002',NULL),(3,'patient123','Patient','patient13@example.com',13,NULL,'100003',NULL),(4,'patient123','Patient','patient14@example.com',14,NULL,'100004',NULL),(5,'patient123','Patient','patient15@example.com',15,NULL,'100005',NULL),(8,'staff123','Staff','staff1@example.com',1,NULL,NULL,1),(9,'staff123','Staff','staff2@example.com',2,NULL,NULL,2),(10,'staff123','Staff','staff3@example.com',3,NULL,NULL,3),(11,'staff123','Staff','staff4@example.com',4,NULL,NULL,4),(12,'staff123','Staff','staff5@example.com',5,NULL,NULL,5),(15,'practitioner123','Practitioner','practitioner6@example.com',6,'1001',NULL,NULL),(16,'practitioner123','Practitioner','practitioner7@example.com',7,'1002',NULL,NULL),(17,'practitioner123','Practitioner','practitioner8@example.com',8,'1003',NULL,NULL),(18,'practitioner123','Practitioner','practitioner9@example.com',9,'1004',NULL,NULL),(19,'practitioner123','Practitioner','practitioner10@example.com',10,'1005',NULL,NULL),(22,'password123','Patient','johndoe@example.com',16,NULL,'123456789',2),(23,'Smith123','Practitioner','ALex.Smith@example.com',17,'1006',NULL,2);
/*!40000 ALTER TABLE `Identification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Intervention`
--

DROP TABLE IF EXISTS `intervention`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intervention` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_Intervention` varchar(255) DEFAULT NULL,
  `type_intervention` varchar(100) NOT NULL DEFAULT 'Default Intervention',
  `procedure_date` date NOT NULL,
  `pct_progress_total` int NOT NULL,
  `identifier_rpps` varchar(50) NOT NULL,
  `staff_id` int NOT NULL,
  `social_secu_number` varchar(50) NOT NULL,
  PRIMARY KEY (`id`,`type_intervention`),
  KEY `identifier_rpps_idx` (`identifier_rpps`),
  KEY `staff_id_idx` (`staff_id`),
  KEY `social_secu_number_idx` (`social_secu_number`),
  KEY `idx_type_intervention` (`type_intervention`),
  CONSTRAINT `fk_inter_patient_social_secu_number` FOREIGN KEY (`social_secu_number`) REFERENCES `patient` (`social_secu_number`),
  CONSTRAINT `fk_inter_prac_identifier_rpps` FOREIGN KEY (`identifier_rpps`) REFERENCES `practitioner` (`identifier_rpps`),
  CONSTRAINT `fk_inter_staff_staff_id` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Intervention`
--

LOCK TABLES `intervention` WRITE;
/*!40000 ALTER TABLE `Intervention` DISABLE KEYS */;
INSERT INTO `intervention` VALUES (1,'Amputation genou droit','Chirurgie','2023-07-28',50,'1002',2,'100004'),(2,'Pose implant mammaire','Pose implant','2023-07-29',75,'1004',3,'100001'),(3,'Appendicectomie','Chirurgie','2023-08-02',25,'1005',2,'100002'),(4,'Pose implant molaire','Pose implant','2023-08-10',90,'1003',3,'100002'),(5,'Transplantation rénale','Chirurgie','2023-10-11',60,'1005',2,'100003'),(6,'ablation','chirurgie','2023-11-11',0,'1006',2,'123456789');
/*!40000 ALTER TABLE `Intervention` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `social_secu_number` varchar(50) NOT NULL,
  `blood_group` varchar(100) NOT NULL,
  `allergy` varchar(100) NOT NULL,
  `remark` varchar(9400) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`social_secu_number`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `fk_patient_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `Patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES ('100001','A+','Pollen','Hyper-tension',11),('100002','B-','Fruits de mer','Tachycardie',12),('100003','O+','Médicaments à base de pénicilline','Diabétique',13),('100004','AB+','Arachides','Il n\"aime pas Rachid',14),('100005','A-','Animaux domestiques','Il a un crocodile',15),('123456789','A+','None','No remarks',16);
/*!40000 ALTER TABLE `Patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Practitioner`
--

DROP TABLE IF EXISTS `practitioner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `practitioner` (
  `identifier_rpps` varchar(50) NOT NULL,
  `speciality` varchar(100) DEFAULT NULL,
  `longitude` varchar(100) DEFAULT NULL,
  `latitude` varchar(100) DEFAULT NULL,
  `type_intervention` varchar(100) NOT NULL,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  PRIMARY KEY (`identifier_rpps`),
  KEY `user_id_idx` (`user_id`),
  KEY `service_id_idx` (`service_id`),
  CONSTRAINT `fk_pract_service_id` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  CONSTRAINT `fk_pract_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Practitioner`
--

LOCK TABLES `practitioner` WRITE;
/*!40000 ALTER TABLE `Practitioner` DISABLE KEYS */;
INSERT INTO `practitioner` VALUES ('1001','Cardiologie','10.123456','20.123456','Chirurgie',6,1),('1002','Orthopédie','30.123456','40.123456','Chirurgie',7,2),('1003','Chirurgie dentaire','50.123456','60.123456','Pose implant',8,3),('1004','Chirurgie esthétique','70.123456','80.123456','Pose implant',9,4),('1005','Gastro-Pediatre','90.123456','100.123456','Chirurgie',10,5),('1006','Cardiologie','10.123456','20.123456','Chirurgie',17,6);
/*!40000 ALTER TABLE `Practitioner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Resource_UnderStep_Intervention`
--

DROP TABLE IF EXISTS `resource_understep_intervention`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resource_understep_intervention` (
  `id` int NOT NULL AUTO_INCREMENT,
  `resource_id` int NOT NULL,
  `understep_id` int NOT NULL,
  `intervention_id` int NOT NULL,
  `type_intervention` varchar(100) NOT NULL DEFAULT 'Default Intervention',
  PRIMARY KEY (`id`,`resource_id`,`understep_id`,`intervention_id`),
  KEY `idx_resource_id` (`resource_id`),
  KEY `idx_understep_id` (`understep_id`),
  KEY `idx_intervention_id` (`intervention_id`),
  KEY `idx_type_intervention_resource_understep_intervention` (`type_intervention`),
  CONSTRAINT `resource_understep_intervention_ibfk_1` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`id`),
  CONSTRAINT `resource_understep_intervention_ibfk_2` FOREIGN KEY (`understep_id`) REFERENCES `understep` (`id`),
  CONSTRAINT `resource_understep_intervention_ibfk_3` FOREIGN KEY (`intervention_id`) REFERENCES `intervention` (`id`),
  CONSTRAINT `resource_understep_intervention_ibfk_4` FOREIGN KEY (`type_intervention`) REFERENCES `intervention` (`type_intervention`),
  CONSTRAINT `resource_understep_intervention_ibfk_5` FOREIGN KEY (`type_intervention`) REFERENCES `resources` (`type_intervention`),
  CONSTRAINT `resource_understep_intervention_ibfk_6` FOREIGN KEY (`type_intervention`) REFERENCES `understep` (`type_intervention`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Resource_UnderStep_Intervention`
--

LOCK TABLES `resource_understep_intervention` WRITE;
/*!40000 ALTER TABLE `Resource_UnderStep_Intervention` DISABLE KEYS */;
/*!40000 ALTER TABLE `Resource_UnderStep_Intervention` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title_resource` varchar(255) NOT NULL,
  `type_resource` varchar(45) NOT NULL,
  `link` varchar(1000) NOT NULL,
  `staff_id` int NOT NULL,
  `type_intervention` varchar(100) NOT NULL DEFAULT 'Default Intervention',
  PRIMARY KEY (`id`),
  KEY `fk_staff_id_idx` (`staff_id`),
  KEY `idx_type_intervention_resources` (`type_intervention`),
  CONSTRAINT `fk_id_staff_resource` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
  CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`type_intervention`) REFERENCES `intervention` (`type_intervention`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `Resources` DISABLE KEYS */;
INSERT INTO `resources` VALUES (1,'Chirurgie cardiologique','Video','http://example.com/resource1',2,'Chirurgie'),(2,'Implant molaire','Image','http://example.com/resource2',3,'Pose implant'),(3,'Chirurgie cardiologique','Image','http://example.com/resource3',2,'Chirurgie'),(4,'Implant molaire','Video','http://example.com/resource4',3,'Pose implant'),(5,'Chirurgie cardiologique','Video','http://example.com/resource5',2,'Chirurgie'),(6,'Chirurgie cardiologique','Video','http://example.com/resource1',2,'chirurgie');
/*!40000 ALTER TABLE `Resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_service` varchar(45) NOT NULL,
  `etage` varchar(45) NOT NULL,
  `staff_id` int NOT NULL,
  `batiment_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `batiment_id_idx` (`batiment_id`),
  KEY `staff_id_idx` (`staff_id`),
  CONSTRAINT `fk_service_batiment_id` FOREIGN KEY (`batiment_id`) REFERENCES `batiment` (`id`),
  CONSTRAINT `fk_service_staff_id` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `Service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'Cardiologie','Etage 1',2,1),(2,'Chirurgie orthopédique','Etage 2',2,1),(3,'Chirurgie dentaire','Etage 1',2,2),(4,'Neurologie','Etage 2',2,2),(5,'Pédiatrie','Etage 1',3,3),(6,'Reanimation','Etage 1',2,4);
/*!40000 ALTER TABLE `Service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roles` varchar(200) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `fk_staff_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `Staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'Admin',1),(2,'Secretaire',2),(3,'Secretaire',3),(4,'Manager',4),(5,'Agent',5);
/*!40000 ALTER TABLE `Staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Step`
--

DROP TABLE IF EXISTS `step`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `step` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_step` varchar(100) NOT NULL,
  `pct_progress` varchar(45) NOT NULL,
  `intervention_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `intervention_id_idx` (`intervention_id`),
  CONSTRAINT `fk_step_intervention_id` FOREIGN KEY (`intervention_id`) REFERENCES `intervention` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Step`
--

LOCK TABLES `step` WRITE;
/*!40000 ALTER TABLE `Step` DISABLE KEYS */;
INSERT INTO `step` VALUES (1,'Comprendre mon opération','100%',1),(2,'Se débarrasser des formations administratives','100%',1),(3,'Préparer mon arrivée en toute sérénité','100%',1),(4,'Anticiper ma sortie','100%',1),(5,'Ma check-list','100%',1),(6,'Comprendre mon opération','100%',2),(7,'Se débarrasser des formations administratives','100%',2),(8,'Préparer mon arrivée en toute sérénité','100%',2),(9,'Anticiper ma sortie','80%',2),(10,'Ma check-list','80%',2),(11,'Comprendre mon opération','100%',3),(12,'Se débarrasser des formations administratives','100%',3),(13,'Préparer mon arrivée en toute sérénité','60%',3),(14,'Anticiper ma sortie','0%',3),(15,'Ma check-list','40%',3),(16,'Comprendre mon opération','80%',4),(17,'Se débarrasser des formations administratives','60%',4),(18,'Préparer mon arrivée en toute sérénité','40%',4),(19,'Anticiper ma sortie','20%',4),(20,'Ma check-list','20%',4),(21,'Comprendre mon opération','20%',5),(22,'Se débarrasser des formations administratives','20%',5),(23,'Préparer mon arrivée en toute sérénité','0%',5),(24,'Anticiper ma sortie','0%',5),(25,'Ma check-list','0%',5),(26,'comprendre mon opération','0',6),(27,'se débarrasser des formalités administratives','0',6),(28,'préparer mon arrivée en toute sérénité','0',6),(29,'préparer ma sortie','0',6),(30,'ma check list','0',6);
/*!40000 ALTER TABLE `Step` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UnderStep`
--

DROP TABLE IF EXISTS `understep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `understep` (
  `id` int NOT NULL AUTO_INCREMENT,
  `statut` tinyint NOT NULL,
  `step_id` int NOT NULL,
  `type_intervention` varchar(100) NOT NULL DEFAULT 'Default Intervention',
  PRIMARY KEY (`id`),
  KEY `step_id_idx` (`step_id`),
  KEY `idx_type_intervention_understep` (`type_intervention`),
  CONSTRAINT `fk_understep_step_id` FOREIGN KEY (`step_id`) REFERENCES `step` (`id`),
  CONSTRAINT `understep_ibfk_1` FOREIGN KEY (`type_intervention`) REFERENCES `intervention` (`type_intervention`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UnderStep`
--

LOCK TABLES `understep` WRITE;
/*!40000 ALTER TABLE `UnderStep` DISABLE KEYS */;
INSERT INTO `understep` VALUES (1,1,26,'chirurgie'),(2,1,26,'chirurgie'),(3,0,26,'chirurgie'),(4,0,26,'chirurgie'),(5,0,27,'chirurgie'),(6,0,27,'chirurgie'),(7,0,27,'chirurgie'),(8,0,27,'chirurgie'),(9,0,27,'chirurgie'),(10,1,28,'chirurgie'),(11,1,28,'chirurgie'),(12,0,28,'chirurgie'),(13,0,29,'chirurgie'),(14,0,30,'chirurgie'),(15,0,30,'chirurgie'),(16,1,30,'chirurgie'),(17,1,30,'chirurgie'),(18,0,30,'chirurgie');
/*!40000 ALTER TABLE `UnderStep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `last_name` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `nationality` varchar(100) NOT NULL,
  `address` varchar(300) NOT NULL,
  `city` varchar(50) NOT NULL,
  `zip_code` varchar(50) NOT NULL,
  `roles` varchar(45) NOT NULL DEFAULT 'Patient',
  `email` varchar(145) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Dupont','Jean',35,'Male','0612345678','French','12 Rue des Lilas','Paris','75001','Admin','jean.dupont@example.com'),(2,'Martin','Sophie',40,'Female','0676543210','French','24 Avenue des Roses','Lyon','69002','Secretaire','sophie.martin@example.com'),(3,'Dubois','Pierre',42,'Male','0611223344','French','8 Rue de la Paix','Marseille','13003','Secretaire','pierre.dubois@example.com'),(4,'Lefebvre','Marie',38,'Female','0698765432','French','15 Boulevard du Château','Toulouse','31000','Manager','marie.lefebvre@example.com'),(5,'Moreau','Thomas',45,'Male','0678901234','French','5 Place de la Liberté','Bordeaux','33000','Agent','thomas.moreau@example.com'),(6,'Gagnon','Sophie',28,'Female','0611111111','French','123 Rue Principale','Montréal','H1A1A1','Practicien','sophie.gagnon@example.com'),(7,'Tremblay','Pierre',32,'Male','0622222222','French','456 Rue Saint-Jacques','Québec','G1B1B1','Practicien','pierre.tremblay@example.com'),(8,'Roy','Catherine',41,'Female','0633333333','French','789 Avenue des Ormes','Sherbrooke','J1C1C1','Practicien','catherine.roy@example.com'),(9,'Lavoie','David',39,'Male','0644444444','French','111 Rue des Érables','Gatineau','K1D1D1','Practicien','david.lavoie@example.com'),(10,'Gagné','Isabelle',36,'Female','0655555555','French','2222 Chemin du Lac','Trois-Rivières','P1E1E1','Practicien','isabelle.gagne@example.com'),(11,'Smith','John',50,'Male','0666666666','English','123 Main Street','Toronto','M1F1F1','Patient','john.smith@example.com'),(12,'Johnson','Emma',27,'Female','0677777777','English','456 Elm Avenue','Vancouver','V1G1G1','Patient','emma.johnson@example.com'),(13,'Brown','Michael',33,'Male','0688888888','English','789 Oak Drive','Calgary','C1H1H1','Patient','michael.brown@example.com'),(14,'Davis','Olivia',29,'Female','0699999999','English','111 Pine Court','Edmonton','E1I1I1','Patient','olivia.davis@example.com'),(15,'Miller','Sophia',31,'Female','0610101010','English','222 Cedar Road','Winnipeg','W1J1J1','Patient','sophia.miller@example.com'),(16,'Doe','John',30,'Male','123456789','French','123 Street','City','12345','Patient','johndoe@example.com'),(17,'Smith','Alexandre',30,'Masculin','0123456789','Italien','113 rue turgot','Lille','12345','Practitioner','ALex.Smith@example.com');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-05 11:59:34
