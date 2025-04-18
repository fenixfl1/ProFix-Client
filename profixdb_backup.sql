-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: profixdb
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `state` char(1) DEFAULT 'A',
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`name`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Pantallas','2025-03-21 13:43:31',2,NULL,NULL,'A',''),(2,'Baterias','2025-03-21 13:45:12',2,NULL,NULL,'A',NULL),(3,'Flex de cargas','2025-03-21 13:46:23',2,NULL,NULL,'A',NULL),(4,'Botones','2025-03-21 13:46:32',2,NULL,NULL,'A',NULL),(5,'Accesorio','2025-03-21 13:46:41',2,NULL,NULL,'A',NULL),(6,'Conectores','2025-03-27 03:10:48',2,NULL,NULL,'A',''),(7,'Cristales','2025-03-27 03:29:13',2,NULL,NULL,'A',''),(8,'Memorias','2025-03-27 03:31:51',2,NULL,NULL,'A','');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `state` char(1) DEFAULT 'A',
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `identity_document` varchar(11) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` text,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `identity_document` (`identity_document`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `customer_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Mauricio Santana Martes','8496697875',NULL,NULL,'2025-03-04 05:41:40','2025-03-07 04:40:30','I',2,2,'24788978585','mauri','50bb98788cca8057'),(2,'Camilo Mendez ','8295589898',NULL,NULL,'2025-03-06 02:58:57','2025-03-07 04:40:36','A',2,2,'84789696632','camil','ded69eae2d8d9963'),(3,'Mendi Mendoza','8496678500',NULL,NULL,'2025-03-06 03:27:47','2025-03-07 04:40:04','A',2,2,'04789896969','mendi','54ac3e53933e10ca'),(4,'Carlos Pichardo','8496632578','carlos12@gmail.com',NULL,'2025-03-06 03:47:44',NULL,'A',2,NULL,'04788989696','carlo','e214828bbab383e6'),(5,'Eric Martias de la Cruz','8295597889',NULL,'Quinto patio, La Vega','2025-03-12 10:32:14',NULL,'A',2,NULL,'04788969663','ericm','84855c7a1e491fb2'),(6,'Mauricio Pichardo','8295597878','user@test.com','Quinto patio, La vega','2025-03-14 12:22:36',NULL,'A',2,NULL,'04788969696','mauri7657','d137d5f2fa0aa089'),(7,'Camila Pichardo','8295597878',NULL,NULL,'2025-03-14 12:44:16',NULL,'A',2,NULL,'04788985854','camil3541','f0391989facc8024'),(8,'Tony Matias',NULL,NULL,NULL,'2025-03-14 12:54:46',NULL,'A',2,NULL,'40235977789','tonym','a8d6319f8897c634'),(9,'Marlon Ventura S├ínchez ',NULL,NULL,NULL,'2025-03-14 13:16:53',NULL,'A',2,NULL,'04788996966','marlo','515461a354a9b524');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `device_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  `model` varchar(50) NOT NULL,
  `imei` varchar(50) NOT NULL,
  `color` varchar(25) DEFAULT NULL,
  `accessories` text,
  `physical_condition` text,
  `state` char(50) NOT NULL DEFAULT 'A',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int NOT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`device_id`),
  UNIQUE KEY `imei` (`imei`),
  KEY `customer_id` (`customer_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  KEY `brand_id` (`brand_id`),
  CONSTRAINT `device_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE,
  CONSTRAINT `device_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `device_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `device_ibfk_4` FOREIGN KEY (`brand_id`) REFERENCES `phone_brands` (`brand_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (1,NULL,1,'iPhone 13 Pro','356789123456789','Silver',NULL,'Good','A','2025-03-07 09:56:18',NULL,2,NULL),(4,1,2,'Galaxy S22','350089123456712','Black',NULL,'Like New','A','2025-03-07 10:18:59',NULL,2,NULL),(5,1,1,'iPhone 13 Pro','356789123456780','Silver',NULL,'Good','A','2025-03-07 10:18:59',NULL,2,NULL),(6,2,3,'Pixel 6','356789123456781','Stormy Black',NULL,'Good','A','2025-03-07 10:53:39',NULL,2,NULL),(7,9,17,'X20','615165165165161','Azul',NULL,'Creista de la pantalla rota','A','2025-03-14 13:25:08',NULL,2,NULL),(8,4,1,'iPhone 13 Pro Max','651651651651651','Dorado',NULL,'Como nuevo','A','2025-03-16 03:15:41',NULL,2,NULL),(9,2,16,'x12','251651651651654','Negro',NULL,'Tapa trasera rota y marcas en los bordes','A','2025-04-04 00:56:09',NULL,2,NULL),(10,3,13,'Rog Phone 3','346573736735674','Dark Blue',NULL,'New','A','2025-04-04 04:50:46',NULL,2,NULL),(11,3,3,'Pixel 9','611651295232626','White',NULL,'Like new','A','2025-04-04 04:50:47',NULL,2,NULL),(12,4,13,'Rog Phone 3','123456789969696','Dark Blue',NULL,'Con ara├▒azos en los laterales','A','2025-04-04 05:34:29',NULL,2,NULL),(13,3,2,'A36','123456789969600','Dark Blue',NULL,'Con ara├▒azos en los laterales','A','2025-04-04 05:35:29',NULL,2,NULL),(14,5,18,'Mega 12','123456789969607','Negro',NULL,'Con ara├▒azos en los laterales','A','2025-04-04 05:37:47',NULL,2,NULL),(15,8,1,'Iphone X','123456789960101','Negro',NULL,'Con ara├▒azos en los laterales','A','2025-04-04 05:38:54',NULL,2,NULL),(18,6,14,'Magic 5','123456789900000','Naranja ',NULL,'Con ara├▒azos en los laterales','A','2025-04-04 11:22:08',NULL,2,NULL),(19,3,12,'Rog Phone 3','515665165165161','Dark Blue',NULL,'Con ara├▒azos en los laterales','A','2025-04-04 11:26:13',NULL,2,NULL),(76,3,1,'Iphone 15 pro max','896969363636332','Balck',NULL,'Con ara├▒azos en los laterales','A','2025-04-04 21:34:28',NULL,2,NULL),(77,3,17,'Pop 3','101010101010101','Dark Blue',NULL,'Con ara├▒azos en los laterales','A','2025-04-04 21:42:44',NULL,2,NULL),(87,3,13,'Rog Phone 3','159159159991569','Dark Blue',NULL,'Con ara├▒azos en los laterales','A','2025-04-05 10:15:30',NULL,2,NULL),(89,3,13,'Rog Phone 3','753753753753753','Dark Blue',NULL,'Con ara├▒azos en los laterales','A','2025-04-05 10:22:45',NULL,2,NULL),(90,8,9,'P30','357357357357533','Dark Blue',NULL,'Con ara├▒azos en los laterales','A','2025-04-05 10:24:07',NULL,2,NULL),(91,5,20,'Z20','789789789789986','Negro',NULL,'Con ara├▒azos en los laterales','A','2025-04-05 10:29:04',NULL,2,NULL),(92,9,15,'F03','629818741951261','Dark Blue',NULL,'Con ara├▒azos en los laterales','A','2025-04-05 10:32:17',NULL,2,NULL),(93,3,11,'V22','487539875390457','Dark Blue',NULL,'Con ara├▒azos en los laterales','A','2025-04-05 10:34:34',NULL,2,NULL),(94,3,13,'Rog Phone 3','876516565661661','Dark Blue',NULL,'Con ara├▒azos en los laterales','A','2025-04-05 11:00:04',NULL,2,NULL),(95,4,13,'Rog Phone 3','363696969898989','Dark Blue',NULL,'Con ara├▒azos en los laterales','A','2025-04-05 11:04:29',NULL,2,NULL),(96,4,3,'Pixel 9','121202020202020','White',NULL,'Like new','A','2025-04-05 11:04:29',NULL,2,NULL),(97,3,13,'Rog Phone 3','309458398673409','Dark Blue',NULL,'Con ara├▒azos en los laterales','A','2025-04-05 11:10:01',NULL,2,NULL),(98,3,3,'Pixel 9','893457230945834','White',NULL,'Like new','A','2025-04-05 11:10:01',NULL,2,NULL);
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_option`
--

DROP TABLE IF EXISTS `menu_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_option` (
  `menu_option_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `path` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` enum('group','divider','link') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order` int NOT NULL,
  `icon` text COLLATE utf8mb4_general_ci,
  `parent_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `state` char(1) COLLATE utf8mb4_general_ci DEFAULT 'A',
  PRIMARY KEY (`menu_option_id`),
  KEY `parent_id` (`parent_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_option`
--

LOCK TABLES `menu_option` WRITE;
/*!40000 ALTER TABLE `menu_option` DISABLE KEYS */;
INSERT INTO `menu_option` VALUES ('0-1','Dashboard','Resulmen de actividades','/dashboard',NULL,0,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-speedometer2\" viewBox=\"0 0 16 16\">   <path d=\"M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z\"/>   <path fill-rule=\"evenodd\" d=\"M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3\"/> </svg>',NULL,NULL,'2025-02-18 22:01:27',2,NULL,NULL,'A'),('0-2','Inventario','Inventario','/inventory',NULL,1,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-bar-chart\" viewBox=\"0 0 16 16\">   <path d=\"M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z\"/> </svg>',NULL,NULL,'2025-02-18 22:13:47',2,'2025-02-28 13:06:58',NULL,'A'),('0-3','Personal','Lista de empleados','',NULL,2,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-people\" viewBox=\"0 0 16 16\">   <path d=\"M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4\"/> </svg>',NULL,NULL,'2025-02-18 22:14:42',2,'2025-02-28 13:06:58',NULL,'A'),('0-3-1','Registro personal','Listado de empleados','/staff',NULL,1,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-person-add\" viewBox=\"0 0 16 16\">   <path d=\"M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4\"/>   <path d=\"M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z\"/> </svg>','0-3',NULL,'2025-02-18 22:35:48',2,'2025-02-28 13:06:58',NULL,'A'),('0-3-2','Roles y Permisos','Lista de Roles','/roles',NULL,2,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-shield-check\" viewBox=\"0 0 16 16\">   <path d=\"M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56\"/>   <path d=\"M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0\"/> </svg>','0-3',NULL,'2025-02-18 22:36:35',2,'2025-02-28 13:06:58',NULL,'A'),('0-4','Reparaciones','Reparaciones','/repairs',NULL,4,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-tools\" viewBox=\"0 0 16 16\">   <path d=\"M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z\"/> </svg>',NULL,NULL,'2025-02-18 22:15:18',2,'2025-03-16 23:05:54',NULL,'A'),('0-4-1','Recepci├│n','Recepci├│n de reparaciones','/repairs/reception',NULL,1,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-reception-3\" viewBox=\"0 0 16 16\">   <path d=\"M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5\"/> </svg>','0-4',NULL,'2025-02-18 22:16:15',2,'2025-03-16 23:05:19',NULL,'I'),('0-4-2','Historial','Historial de reparaciones','/repairs/history',NULL,2,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-clock-history\" viewBox=\"0 0 16 16\">   <path d=\"M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z\"/>   <path d=\"M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z\"/>   <path d=\"M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5\"/> </svg>','0-4',NULL,'2025-02-18 22:16:43',2,'2025-03-16 23:05:19',NULL,'I'),('0-5','Configuraciones','Configuraciones del sistema','/settings',NULL,0,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-gear\" viewBox=\"0 0 16 16\">   <path d=\"M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0\"/>   <path d=\"M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z\"/> </svg>',NULL,NULL,'2025-02-19 14:29:14',2,NULL,NULL,'I'),('0-6','Clientes','Registro de clientes','/customers',NULL,3,'<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-person-vcard\" viewBox=\"0 0 16 16\">   <path d=\"M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5\"/>   <path d=\"M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z\"/> </svg>',NULL,NULL,'2025-02-28 13:00:43',2,NULL,NULL,'A');
/*!40000 ALTER TABLE `menu_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_options_x_roles`
--

DROP TABLE IF EXISTS `menu_options_x_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_options_x_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `menu_option_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `role_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `state` char(1) COLLATE utf8mb4_general_ci DEFAULT 'A',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `unique_role_menu_option` (`menu_option_id`,`role_id`) USING BTREE,
  KEY `role_id` (`role_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_options_x_roles`
--

LOCK TABLES `menu_options_x_roles` WRITE;
/*!40000 ALTER TABLE `menu_options_x_roles` DISABLE KEYS */;
INSERT INTO `menu_options_x_roles` VALUES (1,'0-4-1',1,'2025-02-19 17:34:52',2,NULL,NULL,'A'),(2,'0-1',1,'2025-02-19 17:28:27',2,'2025-02-23 04:52:03',NULL,'I'),(3,'0-2',1,'2025-02-19 17:32:53',2,NULL,NULL,'A'),(4,'0-3',1,'2025-02-19 17:33:25',2,NULL,NULL,'A'),(5,'0-3-1',1,'2025-02-19 17:33:57',2,NULL,NULL,'A'),(6,'0-3-2',1,'2025-02-19 17:34:08',2,NULL,NULL,'A'),(7,'0-4',1,'2025-02-19 17:34:35',2,NULL,NULL,'A'),(8,'0-4-2',1,'2025-02-19 14:44:20',NULL,NULL,NULL,'A'),(9,'0-1',3,'2025-02-24 06:31:36',2,'2025-02-28 03:14:14',2,'I'),(10,'0-3-1',3,'2025-02-24 06:31:36',2,'2025-02-28 03:14:14',2,'I'),(11,'0-4',3,'2025-02-24 06:31:36',2,'2025-02-28 03:14:14',2,'I'),(12,'0-4-1',3,'2025-02-24 06:31:36',2,'2025-02-28 03:14:14',2,'I'),(13,'0-4-2',3,'2025-02-24 06:31:36',2,'2025-02-28 03:14:14',2,'I'),(14,'0-1',4,'2025-02-24 07:17:02',2,NULL,NULL,'A'),(15,'0-2',4,'2025-02-24 07:17:02',2,NULL,NULL,'A'),(16,'0-4',4,'2025-02-24 07:17:02',2,NULL,NULL,'A'),(17,'0-4-1',4,'2025-02-24 07:17:02',2,NULL,NULL,'A'),(18,'0-4-2',4,'2025-02-24 07:17:02',2,NULL,NULL,'A'),(19,'0-2',5,'2025-02-24 07:19:39',2,NULL,NULL,'A'),(20,'0-3-2',5,'2025-02-24 07:19:39',2,NULL,NULL,'A'),(21,'0-1',6,'2025-02-24 07:21:04',2,NULL,NULL,'A'),(22,'0-2',6,'2025-02-24 07:21:04',2,NULL,NULL,'A'),(23,'0-1',7,'2025-02-24 07:22:38',2,NULL,NULL,'A'),(24,'0-2',7,'2025-02-24 07:22:38',2,NULL,NULL,'A'),(25,'0-2',8,'2025-02-24 07:28:55',2,NULL,NULL,'A'),(26,'0-1',8,'2025-02-24 07:28:55',2,NULL,NULL,'A'),(29,'0-2',9,'2025-02-27 23:40:31',NULL,'2025-02-28 02:10:45',2,'A'),(30,'0-3-2',9,'2025-02-27 23:40:31',NULL,'2025-02-28 02:10:45',2,'A'),(31,'0-4-1',9,'2025-02-27 23:40:31',NULL,'2025-02-28 02:10:45',2,'A'),(36,'0-6',1,'2025-03-02 23:56:58',2,NULL,NULL,'A');
/*!40000 ALTER TABLE `menu_options_x_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parameters`
--

DROP TABLE IF EXISTS `parameters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parameters` (
  `parameter_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `value` text COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `menu_option_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `state` char(1) COLLATE utf8mb4_general_ci DEFAULT 'A',
  PRIMARY KEY (`parameter_id`),
  UNIQUE KEY `name` (`name`),
  KEY `menu_option_id` (`menu_option_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parameters`
--

LOCK TABLES `parameters` WRITE;
/*!40000 ALTER TABLE `parameters` DISABLE KEYS */;
/*!40000 ALTER TABLE `parameters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone_brands`
--

DROP TABLE IF EXISTS `phone_brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone_brands` (
  `brand_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `state` char(1) NOT NULL DEFAULT 'A',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int NOT NULL DEFAULT '2',
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`brand_id`),
  UNIQUE KEY `name` (`name`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `phone_brands_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `phone_brands_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone_brands`
--

LOCK TABLES `phone_brands` WRITE;
/*!40000 ALTER TABLE `phone_brands` DISABLE KEYS */;
INSERT INTO `phone_brands` VALUES (1,'Apple','A','2025-03-07 10:32:06',NULL,2,NULL),(2,'Samsung','A','2025-03-07 10:32:06',NULL,2,NULL),(3,'Google','A','2025-03-07 10:32:06',NULL,2,NULL),(4,'Motorola','A','2025-03-07 10:32:06',NULL,2,NULL),(5,'Xiaomi','A','2025-03-07 10:32:06',NULL,2,NULL),(6,'OnePlus','A','2025-03-07 10:32:06',NULL,2,NULL),(7,'Nokia','A','2025-03-07 10:32:06',NULL,2,NULL),(8,'Sony','A','2025-03-07 10:32:06',NULL,2,NULL),(9,'Huawei','A','2025-03-07 10:32:06',NULL,2,NULL),(10,'Oppo','A','2025-03-07 10:32:06',NULL,2,NULL),(11,'Vivo','A','2025-03-07 10:32:06',NULL,2,NULL),(12,'Realme','A','2025-03-07 10:32:06',NULL,2,NULL),(13,'Asus','A','2025-03-07 10:32:06',NULL,2,NULL),(14,'Honor','A','2025-03-07 10:32:06',NULL,2,NULL),(15,'ZTE','A','2025-03-07 10:32:06',NULL,2,NULL),(16,'Alcatel','A','2025-03-07 10:32:06',NULL,2,NULL),(17,'BLU','A','2025-03-07 10:32:06',NULL,2,NULL),(18,'Lenovo','A','2025-03-07 10:32:06',NULL,2,NULL),(19,'TCL','A','2025-03-07 10:32:06',NULL,2,NULL),(20,'Infinix','A','2025-03-07 10:32:06',NULL,2,NULL),(21,'Tecno','A','2025-03-07 10:32:06',NULL,2,NULL),(22,'Meizu','A','2025-03-07 10:32:06',NULL,2,NULL);
/*!40000 ALTER TABLE `phone_brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_detail`
--

DROP TABLE IF EXISTS `product_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_detail` (
  `product_detail_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `model` varchar(100) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `supplier` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `state` char(1) NOT NULL DEFAULT 'A',
  `condition` enum('NO','UO','NR','UR') NOT NULL,
  PRIMARY KEY (`product_detail_id`),
  KEY `product_id` (`product_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `product_detail_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_header` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_detail_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_detail_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_detail_chk_1` CHECK ((`stock` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail`
--

LOCK TABLES `product_detail` WRITE;
/*!40000 ALTER TABLE `product_detail` DISABLE KEYS */;
INSERT INTO `product_detail` VALUES (1,1,'Galaxy S23 Ultra','Samsung',15199.99,4,NULL,'2025-03-21 13:58:50',2,'2025-04-04 01:00:46',NULL,'A','NR'),(2,1,'Galaxy A51','Samsung',899.50,14,NULL,'2025-03-21 13:58:50',2,'2025-04-01 02:00:38',NULL,'A','UR'),(3,1,'P30 Pro','Huawei ',3500.00,4,'Valdy Comunicaciones','2025-03-27 02:27:11',2,'2025-03-31 23:27:56',2,'I','UO'),(4,1,'iPhone 12','iPhone',8000.00,2,'Primo Cell','2025-03-27 02:27:11',2,'2025-03-28 11:27:32',2,'I','NR'),(5,6,'Iphone 13','Iphone',1000.00,8,'Valdy Comunicaciones','2025-04-04 00:44:41',2,NULL,NULL,'A','UO'),(6,6,'Iphone 14 Pro Max','Iphone',1500.00,2,NULL,'2025-04-04 00:44:41',2,'2025-04-07 21:46:04',NULL,'A','NR');
/*!40000 ALTER TABLE `product_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_header`
--

DROP TABLE IF EXISTS `product_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_header` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `category_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `state` char(1) DEFAULT 'A',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_header`
--

LOCK TABLES `product_header` WRITE;
/*!40000 ALTER TABLE `product_header` DISABLE KEYS */;
INSERT INTO `product_header` VALUES (1,'Pantalla','Pantallas para todo tipo de smart phones',1,'2025-03-21 13:50:04',2,'2025-03-28 11:08:30',2,'A'),(2,'Conector','Sin descripci├│n',1,'2025-03-21 13:51:47',2,'2025-03-28 11:08:49',2,'A'),(3,'Touch','Cristales tactiles',7,'2025-03-27 03:33:09',2,'2025-03-28 10:47:36',2,'A'),(4,'Flex de encendido','Conectores de encendido para smart phone',6,'2025-03-27 03:38:08',2,NULL,NULL,'A'),(5,'Boton de volumen','Botonoes de volumen para smart phone',4,'2025-03-27 10:40:47',2,'2025-03-31 23:59:30',2,'I'),(6,'Bater├¡as ','N/A',2,'2025-04-04 00:41:25',2,NULL,NULL,'A');
/*!40000 ALTER TABLE `product_header` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt` (
  `receipt_id` int NOT NULL AUTO_INCREMENT,
  `repair_order_id` int NOT NULL,
  `content` text,
  `reprint_count` int DEFAULT '0',
  `status` char(1) DEFAULT 'P',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`receipt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
INSERT INTO `receipt` VALUES (105,73,'\n      <div class=\"receipt-container\">\n        <h2>Orden de Reparaci├│n</h2>\n        <div class=\"info\">\n          <strong>Orden No.:</strong> 73\n        </div>\n        <div class=\"info\">\n          <strong>Fecha:</strong> 4/4/2025\n        </div>\n        <div class=\"info\">\n          <strong>Cliente:</strong> Mendi Mendoza (04789896969)\n        </div>\n        <div class=\"info\">\n          <strong>Tel├⌐fono:</strong> 8496678500\n        </div>\n        <div class=\"info\">\n          <strong>Correo:</strong> N/A\n        </div>\n        <hr>\n        <div class=\"info\">\n          <strong>Dispositivo:</strong> [object Object] - Iphone 15 pro max (Balck)\n        </div>\n        <div class=\"info\">\n          <strong>IMEI:</strong> 896969363636332\n        </div>\n        <div class=\"info\">\n          <strong>Condici├│n F├¡sica:</strong> Con ara├▒azos en los laterales\n        </div>\n        <div class=\"info\">\n          <strong>Problema Reportado:</strong> No enciende\n        </div>\n        <div class=\"info\">\n          <strong>Diagn├│stico:</strong> Pantalla da├▒ada\n        </div>\n        <div class=\"info\">\n          <strong>Costo Estimado:</strong> $800.00\n        </div>\n        <div class=\"info\">\n          <strong>Entrega Estimada:</strong> 5/4/2025\n        </div>\n        <hr>\n        <h3>Acceso para Seguimiento</h3>\n        <div class=\"info\">\n          <strong>Usuario:</strong> mendi\n        </div>\n        <div class=\"info\">\n          <strong>Contrase├▒a:</strong> 54ac3e53933e10ca\n        </div>\n        <p>Para dar seguimiento a su orden, ingrese a nuestro sistema con las credenciales proporcionadas.</p>\n        <hr>\n        <div class=\"footer\">\n          Gracias por confiar en nuestro servicio. Para cualquier duda, cont├íctenos.\n        </div>\n      </div>\n  ',0,'P','2025-04-04 21:34:28'),(107,74,'\n      <div class=\"receipt-container\">\n        <h2>Orden de Reparaci├│n</h2>\n        <div class=\"info\">\n          <strong>Orden No.:</strong> 74\n        </div>\n        <div class=\"info\">\n          <strong>Fecha:</strong> 4/4/2025\n        </div>\n        <div class=\"info\">\n          <strong>Cliente:</strong> Mendi Mendoza (04789896969)\n        </div>\n        <div class=\"info\">\n          <strong>Tel├⌐fono:</strong> 8496678500\n        </div>\n        <div class=\"info\">\n          <strong>Correo:</strong> N/A\n        </div>\n        <hr>\n        <div class=\"info\">\n          <strong>Dispositivo:</strong> [object Object] - Pop 3 (Dark Blue)\n        </div>\n        <div class=\"info\">\n          <strong>IMEI:</strong> 101010101010101\n        </div>\n        <div class=\"info\">\n          <strong>Condici├│n F├¡sica:</strong> Con ara├▒azos en los laterales\n        </div>\n        <div class=\"info\">\n          <strong>Problema Reportado:</strong> No enciende\n        </div>\n        <div class=\"info\">\n          <strong>Diagn├│stico:</strong> Pantalla da├▒ada\n        </div>\n        <div class=\"info\">\n          <strong>Costo Estimado:</strong> $800.00\n        </div>\n        <div class=\"info\">\n          <strong>Entrega Estimada:</strong> 5/4/2025\n        </div>\n        <hr>\n        <h3>Acceso para Seguimiento</h3>\n        <div class=\"info\">\n          <strong>Usuario:</strong> mendi\n        </div>\n        <div class=\"info\">\n          <strong>Contrase├▒a:</strong> 54ac3e53933e10ca\n        </div>\n        <p>Para dar seguimiento a su orden, ingrese a nuestro sistema con las credenciales proporcionadas.</p>\n        <hr>\n        <div class=\"footer\">\n          Gracias por confiar en nuestro servicio. Para cualquier duda, cont├íctenos.\n        </div>\n      </div>\n  ',0,'P','2025-04-04 21:42:44'),(115,84,NULL,0,'P','2025-04-05 10:15:29'),(117,86,NULL,0,'P','2025-04-05 10:22:44'),(118,87,NULL,0,'P','2025-04-05 10:24:06'),(119,88,NULL,0,'P','2025-04-05 10:29:04'),(120,89,NULL,0,'P','2025-04-05 10:32:17'),(121,90,'\n      <div class=\"receipt-container\">\n        <h2>Orden de Reparaci├│n</h2>\n        <div class=\"info\">\n          <strong>Orden No.:</strong> 90\n        </div>\n        <div class=\"info\">\n          <strong>Fecha:</strong> 5/4/2025\n        </div>\n        <div class=\"info\">\n          <strong>Cliente:</strong> Mendi Mendoza (04789896969)\n        </div>\n        <div class=\"info\">\n          <strong>Tel├⌐fono:</strong> 8496678500\n        </div>\n        <div class=\"info\">\n          <strong>Correo:</strong> N/A\n        </div>\n        <hr>\n        <div class=\"info\">\n          <strong>Dispositivo:</strong> [object Object] - V22 (Dark Blue)\n        </div>\n        <div class=\"info\">\n          <strong>IMEI:</strong> 487539875390457\n        </div>\n        <div class=\"info\">\n          <strong>Condici├│n F├¡sica:</strong> Con ara├▒azos en los laterales\n        </div>\n        <div class=\"info\">\n          <strong>Problema Reportado:</strong> No enciende\n        </div>\n        <div class=\"info\">\n          <strong>Diagn├│stico:</strong> Pantalla da├▒ada\n        </div>\n        <div class=\"info\">\n          <strong>Costo Estimado:</strong> $800.00\n        </div>\n        <div class=\"info\">\n          <strong>Entrega Estimada:</strong> 5/4/2025\n        </div>\n        <hr>\n        <h3>Acceso para Seguimiento</h3>\n        <div class=\"info\">\n          <strong>Usuario:</strong> mendi\n        </div>\n        <div class=\"info\">\n          <strong>Contrase├▒a:</strong> 54ac3e53933e10ca\n        </div>\n        <p>Para dar seguimiento a su orden, ingrese a nuestro sistema con las credenciales proporcionadas.</p>\n        <hr>\n        <div class=\"footer\">\n          Gracias por confiar en nuestro servicio. Para cualquier duda, cont├íctenos.\n        </div>\n      </div>\n  ',0,'P','2025-04-05 10:34:34'),(122,91,'\n      <div class=\"receipt-container\">\n        <h2>Orden de Reparaci├│n</h2>\n        <div class=\"info\">\n          <strong>Orden No.:</strong> 91\n        </div>\n        <div class=\"info\">\n          <strong>Fecha:</strong> 5/4/2025\n        </div>\n        <div class=\"info\">\n          <strong>Cliente:</strong> Mendi Mendoza (04789896969)\n        </div>\n        <div class=\"info\">\n          <strong>Tel├⌐fono:</strong> 8496678500\n        </div>\n        <div class=\"info\">\n          <strong>Correo:</strong> N/A\n        </div>\n        <hr>\n        <div class=\"info\">\n          <strong>Dispositivo:</strong> [object Object] - Rog Phone 3 (Dark Blue)\n        </div>\n        <div class=\"info\">\n          <strong>IMEI:</strong> 876516565661661\n        </div>\n        <div class=\"info\">\n          <strong>Condici├│n F├¡sica:</strong> Con ara├▒azos en los laterales\n        </div>\n        <div class=\"info\">\n          <strong>Problema Reportado:</strong> No enciende\n        </div>\n        <div class=\"info\">\n          <strong>Diagn├│stico:</strong> Pantalla da├▒ada\n        </div>\n        <div class=\"info\">\n          <strong>Costo Estimado:</strong> $800.00\n        </div>\n        <div class=\"info\">\n          <strong>Entrega Estimada:</strong> 5/4/2025\n        </div>\n        <hr>\n        <h3>Acceso para Seguimiento</h3>\n        <div class=\"info\">\n          <strong>Usuario:</strong> mendi\n        </div>\n        <div class=\"info\">\n          <strong>Contrase├▒a:</strong> 54ac3e53933e10ca\n        </div>\n        <p>Para dar seguimiento a su orden, ingrese a nuestro sistema con las credenciales proporcionadas.</p>\n        <hr>\n        <div class=\"footer\">\n          Gracias por confiar en nuestro servicio. Para cualquier duda, cont├íctenos.\n        </div>\n      </div>\n  ',0,'P','2025-04-05 11:00:04'),(123,92,'\n      <div class=\"receipt-container\">\n        <h2>Orden de Reparaci├│n</h2>\n        <div class=\"info\">\n          <strong>Orden No.:</strong> 92\n        </div>\n        <div class=\"info\">\n          <strong>Fecha:</strong> 5/4/2025\n        </div>\n        <div class=\"info\">\n          <strong>Cliente:</strong> Carlos Pichardo (04788989696)\n        </div>\n        <div class=\"info\">\n          <strong>Tel├⌐fono:</strong> 8496632578\n        </div>\n        <div class=\"info\">\n          <strong>Correo:</strong> carlos12@gmail.com\n        </div>\n        <hr>\n        <div class=\"info\">\n          <strong>Dispositivo:</strong> [object Object] - Rog Phone 3 (Dark Blue)\n        </div>\n        <div class=\"info\">\n          <strong>IMEI:</strong> 363696969898989\n        </div>\n        <div class=\"info\">\n          <strong>Condici├│n F├¡sica:</strong> Con ara├▒azos en los laterales\n        </div>\n        <div class=\"info\">\n          <strong>Problema Reportado:</strong> No enciende\n        </div>\n        <div class=\"info\">\n          <strong>Diagn├│stico:</strong> Pantalla da├▒ada\n        </div>\n        <div class=\"info\">\n          <strong>Costo Estimado:</strong> $800.00\n        </div>\n        <div class=\"info\">\n          <strong>Entrega Estimada:</strong> 5/4/2025\n        </div>\n        <hr>\n        <h3>Acceso para Seguimiento</h3>\n        <div class=\"info\">\n          <strong>Usuario:</strong> carlo\n        </div>\n        <div class=\"info\">\n          <strong>Contrase├▒a:</strong> e214828bbab383e6\n        </div>\n        <p>Para dar seguimiento a su orden, ingrese a nuestro sistema con las credenciales proporcionadas.</p>\n        <hr>\n        <div class=\"footer\">\n          Gracias por confiar en nuestro servicio. Para cualquier duda, cont├íctenos.\n        </div>\n      </div>\n  ',0,'P','2025-04-05 11:04:29'),(124,93,'\n      <div class=\"receipt-container\">\n        <h2>Orden de Reparaci├│n</h2>\n        <div class=\"info\">\n          <strong>Orden No.:</strong> 93\n        </div>\n        <div class=\"info\">\n          <strong>Fecha:</strong> 5/4/2025\n        </div>\n        <div class=\"info\">\n          <strong>Cliente:</strong> Carlos Pichardo (04788989696)\n        </div>\n        <div class=\"info\">\n          <strong>Tel├⌐fono:</strong> 8496632578\n        </div>\n        <div class=\"info\">\n          <strong>Correo:</strong> carlos12@gmail.com\n        </div>\n        <hr>\n        <div class=\"info\">\n          <strong>Dispositivo:</strong> [object Object] - Pixel 9 (White)\n        </div>\n        <div class=\"info\">\n          <strong>IMEI:</strong> 121202020202020\n        </div>\n        <div class=\"info\">\n          <strong>Condici├│n F├¡sica:</strong> Like new\n        </div>\n        <div class=\"info\">\n          <strong>Problema Reportado:</strong> Se descarga rrapido\n        </div>\n        <div class=\"info\">\n          <strong>Diagn├│stico:</strong> Circuido da├▒ado que proboca alto consumo\n        </div>\n        <div class=\"info\">\n          <strong>Costo Estimado:</strong> $1800.00\n        </div>\n        <div class=\"info\">\n          <strong>Entrega Estimada:</strong> 7/4/2025\n        </div>\n        <hr>\n        <h3>Acceso para Seguimiento</h3>\n        <div class=\"info\">\n          <strong>Usuario:</strong> carlo\n        </div>\n        <div class=\"info\">\n          <strong>Contrase├▒a:</strong> e214828bbab383e6\n        </div>\n        <p>Para dar seguimiento a su orden, ingrese a nuestro sistema con las credenciales proporcionadas.</p>\n        <hr>\n        <div class=\"footer\">\n          Gracias por confiar en nuestro servicio. Para cualquier duda, cont├íctenos.\n        </div>\n      </div>\n  ',0,'P','2025-04-05 11:04:29'),(125,94,'\n    <style>\n      /* Estilos generales */\n      .receipt-container {\n        font-family: Arial, sans-serif;\n        width: 100%;\n        max-width: 100mm;\n        margin: 0 auto;\n        padding: 10mm;\n        background-color: #fff;\n        border: 1px solid #ddd;\n        border-radius: 5px;\n      }\n\n      h2 {\n        text-align: center;\n        font-size: 16px;\n        margin-bottom: 5mm;\n      }\n\n      h3 {\n        font-size: 14px;\n        margin-top: 5mm;\n        margin-bottom: 5mm;\n      }\n\n      .info {\n        margin: 2mm 0;\n        font-size: 12px;\n      }\n\n      .info strong {\n        font-weight: bold;\n      }\n\n      hr {\n        margin: 5mm 0;\n        border: 0;\n        border-top: 1px solid #ddd;\n      }\n\n      .footer {\n        text-align: center;\n        font-size: 10px;\n        margin-top: 10mm;\n        color: #555;\n      }\n\n      /* A├▒adir espacio entre las secciones */\n      .info + .info {\n        margin-top: 2mm;\n      }\n\n      /* Estilo del contenedor de cliente y dispositivo */\n      .customer-info, .device-info {\n        margin-bottom: 5mm;\n        padding-bottom: 5mm;\n        border-bottom: 1px dashed #ddd;\n      }\n\n      .customer-info strong, .device-info strong {\n        display: inline-block;\n        width: 40%;\n      }\n    </style>\n\n    <div class=\"receipt-container\">\n      <h2>Orden de Reparaci├│n</h2>\n      \n      <div class=\"customer-info\">\n        <div class=\"info\">\n          <strong>Orden No.:</strong> 94\n        </div>\n        <div class=\"info\">\n          <strong>Fecha:</strong> 5/4/2025\n        </div>\n        <div class=\"info\">\n          <strong>Cliente:</strong> Mendi Mendoza (04789896969)\n        </div>\n        <div class=\"info\">\n          <strong>Tel├⌐fono:</strong> 8496678500\n        </div>\n        <div class=\"info\">\n          <strong>Correo:</strong> N/A\n        </div>\n      </div>\n\n      <div class=\"device-info\">\n        <div class=\"info\">\n          <strong>Dispositivo:</strong> Asus - Rog Phone 3 (Dark Blue)\n        </div>\n        <div class=\"info\">\n          <strong>IMEI:</strong> 309458398673409\n        </div>\n        <div class=\"info\">\n          <strong>Condici├│n F├¡sica:</strong> Con ara├▒azos en los laterales\n        </div>\n        <div class=\"info\">\n          <strong>Problema Reportado:</strong> No enciende\n        </div>\n        <div class=\"info\">\n          <strong>Diagn├│stico:</strong> Pantalla da├▒ada\n        </div>\n        <div class=\"info\">\n          <strong>Costo Estimado:</strong> $800.00\n        </div>\n        <div class=\"info\">\n          <strong>Entrega Estimada:</strong> 5/4/2025\n        </div>\n      </div>\n      \n      <hr>\n\n      <h3>Acceso para Seguimiento</h3>\n      <div class=\"info\">\n        <strong>Usuario:</strong> mendi\n      </div>\n      <div class=\"info\">\n        <strong>Contrase├▒a:</strong> 54ac3e53933e10ca\n      </div>\n      <p>Para dar seguimiento a su orden, ingrese a nuestro sistema con las credenciales proporcionadas.</p>\n\n      <hr>\n\n      <div class=\"footer\">\n        Gracias por confiar en nuestro servicio. Para cualquier duda, cont├íctenos.\n      </div>\n    </div>\n  ',0,'P','2025-04-05 11:10:01'),(126,95,'\n    <style>\n      /* Estilos generales */\n      .receipt-container {\n        font-family: Arial, sans-serif;\n        width: 100%;\n        max-width: 100mm;\n        margin: 0 auto;\n        padding: 10mm;\n        background-color: #fff;\n        border: 1px solid #ddd;\n        border-radius: 5px;\n      }\n\n      h2 {\n        text-align: center;\n        font-size: 16px;\n        margin-bottom: 5mm;\n      }\n\n      h3 {\n        font-size: 14px;\n        margin-top: 5mm;\n        margin-bottom: 5mm;\n      }\n\n      .info {\n        margin: 2mm 0;\n        font-size: 12px;\n      }\n\n      .info strong {\n        font-weight: bold;\n      }\n\n      hr {\n        margin: 5mm 0;\n        border: 0;\n        border-top: 1px solid #ddd;\n      }\n\n      .footer {\n        text-align: center;\n        font-size: 10px;\n        margin-top: 10mm;\n        color: #555;\n      }\n\n      /* A├▒adir espacio entre las secciones */\n      .info + .info {\n        margin-top: 2mm;\n      }\n\n      /* Estilo del contenedor de cliente y dispositivo */\n      .customer-info, .device-info {\n        margin-bottom: 5mm;\n        padding-bottom: 5mm;\n        border-bottom: 1px dashed #ddd;\n      }\n\n      .customer-info strong, .device-info strong {\n        display: inline-block;\n        width: 40%;\n      }\n    </style>\n\n    <div class=\"receipt-container\">\n      <h2>Orden de Reparaci├│n</h2>\n      \n      <div class=\"customer-info\">\n        <div class=\"info\">\n          <strong>Orden No.:</strong> 95\n        </div>\n        <div class=\"info\">\n          <strong>Fecha:</strong> 5/4/2025\n        </div>\n        <div class=\"info\">\n          <strong>Cliente:</strong> Mendi Mendoza (04789896969)\n        </div>\n        <div class=\"info\">\n          <strong>Tel├⌐fono:</strong> 8496678500\n        </div>\n        <div class=\"info\">\n          <strong>Correo:</strong> N/A\n        </div>\n      </div>\n\n      <div class=\"device-info\">\n        <div class=\"info\">\n          <strong>Dispositivo:</strong> Google - Pixel 9 (White)\n        </div>\n        <div class=\"info\">\n          <strong>IMEI:</strong> 893457230945834\n        </div>\n        <div class=\"info\">\n          <strong>Condici├│n F├¡sica:</strong> Like new\n        </div>\n        <div class=\"info\">\n          <strong>Problema Reportado:</strong> Se descarga rrapido\n        </div>\n        <div class=\"info\">\n          <strong>Diagn├│stico:</strong> Circuido da├▒ado que proboca alto consumo\n        </div>\n        <div class=\"info\">\n          <strong>Costo Estimado:</strong> $1800.00\n        </div>\n        <div class=\"info\">\n          <strong>Entrega Estimada:</strong> 7/4/2025\n        </div>\n      </div>\n      \n      <hr>\n\n      <h3>Acceso para Seguimiento</h3>\n      <div class=\"info\">\n        <strong>Usuario:</strong> mendi\n      </div>\n      <div class=\"info\">\n        <strong>Contrase├▒a:</strong> 54ac3e53933e10ca\n      </div>\n      <p>Para dar seguimiento a su orden, ingrese a nuestro sistema con las credenciales proporcionadas.</p>\n\n      <hr>\n\n      <div class=\"footer\">\n        Gracias por confiar en nuestro servicio. Para cualquier duda, cont├íctenos.\n      </div>\n    </div>\n  ',0,'P','2025-04-05 11:10:01'),(127,1,'\n    <style>\n      /* Estilos generales */\n      .receipt-container {\n        font-family: Arial, sans-serif;\n        width: 100%;\n        max-width: 100mm;\n        margin: 0 auto;\n        padding: 10mm;\n        background-color: #fff;\n        border: 1px solid #ddd;\n        border-radius: 5px;\n      }\n\n      h2 {\n        text-align: center;\n        font-size: 16px;\n        margin-bottom: 5mm;\n      }\n\n      h3 {\n        font-size: 14px;\n        margin-top: 5mm;\n        margin-bottom: 5mm;\n      }\n\n      .info {\n        margin: 2mm 0;\n        font-size: 12px;\n      }\n\n      .info strong {\n        font-weight: bold;\n      }\n\n      hr {\n        margin: 5mm 0;\n        border: 0;\n        border-top: 1px solid #ddd;\n      }\n\n      .footer {\n        text-align: center;\n        font-size: 10px;\n        margin-top: 10mm;\n        color: #555;\n      }\n\n      /* A├▒adir espacio entre las secciones */\n      .info + .info {\n        margin-top: 2mm;\n      }\n\n      /* Estilo del contenedor de cliente y dispositivo */\n      .customer-info, .device-info {\n        margin-bottom: 5mm;\n        padding-bottom: 5mm;\n        border-bottom: 1px dashed #ddd;\n      }\n\n      .customer-info strong, .device-info strong {\n        display: inline-block;\n        width: 40%;\n      }\n    </style>\n\n    <div class=\"receipt-container\">\n      <h2>Orden de Reparaci├│n</h2>\n      \n      <div class=\"customer-info\">\n        <div class=\"info\">\n          <strong>Orden No.:</strong> 1\n        </div>\n        <div class=\"info\">\n          <strong>Fecha:</strong> 7/3/2025\n        </div>\n        <div class=\"info\">\n          <strong>Cliente:</strong> Mauricio Santana Martes (24788978585)\n        </div>\n        <div class=\"info\">\n          <strong>Tel├⌐fono:</strong> 8496697875\n        </div>\n        <div class=\"info\">\n          <strong>Correo:</strong> N/A\n        </div>\n      </div>\n\n      <div class=\"device-info\">\n        <div class=\"info\">\n          <strong>Dispositivo:</strong> Samsung - Galaxy S22 (Black)\n        </div>\n        <div class=\"info\">\n          <strong>IMEI:</strong> 350089123456712\n        </div>\n        <div class=\"info\">\n          <strong>Condici├│n F├¡sica:</strong> Like New\n        </div>\n        <div class=\"info\">\n          <strong>Problema Reportado:</strong> Cracked screen\n        </div>\n        <div class=\"info\">\n          <strong>Diagn├│stico:</strong> Screen replacement needed\n        </div>\n        <div class=\"info\">\n          <strong>Costo Estimado:</strong> $0\n        </div>\n        <div class=\"info\">\n          <strong>Entrega Estimada:</strong> 12/3/2025\n        </div>\n      </div>\n      \n      <hr>\n\n      <h3>Acceso para Seguimiento</h3>\n      <div class=\"info\">\n        <strong>Usuario:</strong> mauri\n      </div>\n      <div class=\"info\">\n        <strong>Contrase├▒a:</strong> 50bb98788cca8057\n      </div>\n      <p>Para dar seguimiento a su orden, ingrese a nuestro sistema con las credenciales proporcionadas.</p>\n\n      <hr>\n\n      <div class=\"footer\">\n        Gracias por confiar en nuestro servicio. Para cualquier duda, cont├íctenos.\n      </div>\n    </div>\n  ',0,'P','2025-04-05 11:43:57');
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repair_history`
--

DROP TABLE IF EXISTS `repair_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repair_history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `previous_status` enum('P','I','R','N') NOT NULL,
  `new_status` enum('P','I','R','N') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `repair_order_id` int NOT NULL,
  `state` char(1) DEFAULT 'A',
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`history_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  KEY `repair_order_id` (`repair_order_id`),
  CONSTRAINT `repair_history_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `repair_history_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `repair_history_ibfk_4` FOREIGN KEY (`repair_order_id`) REFERENCES `repair_order` (`repair_order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repair_history`
--

LOCK TABLES `repair_history` WRITE;
/*!40000 ALTER TABLE `repair_history` DISABLE KEYS */;
INSERT INTO `repair_history` VALUES (1,'P','P','2025-03-16 03:15:41',2,NULL,NULL,5,'A',NULL),(2,'P','I','2025-04-01 02:00:38',2,NULL,NULL,1,'A','Vamos a confirmar que el diagnostico que dimos es el correcto'),(3,'P','N','2025-04-01 03:35:00',2,NULL,NULL,5,'A','El telefono tiene da├▒os que no se pueden resolver debido a que estubo sumergido mucho tiempo bajo el agua'),(4,'P','P','2025-04-04 00:56:10',2,NULL,NULL,6,'A',NULL),(5,'P','I','2025-04-04 00:58:29',2,NULL,NULL,6,'A','un comentario del estado actual del dispositivo'),(6,'I','N','2025-04-04 01:00:46',2,NULL,NULL,6,'A','No tiene soluci├│n'),(7,'P','P','2025-04-04 04:50:46',2,NULL,NULL,7,'A',NULL),(8,'P','P','2025-04-04 04:50:47',2,NULL,NULL,8,'A',NULL),(9,'P','P','2025-04-04 05:34:29',2,NULL,NULL,9,'A',NULL),(10,'P','P','2025-04-04 05:35:29',2,NULL,NULL,10,'A',NULL),(11,'P','P','2025-04-04 05:37:47',2,NULL,NULL,11,'A',NULL),(12,'P','P','2025-04-04 05:38:54',2,NULL,NULL,12,'A',NULL),(15,'P','P','2025-04-04 11:22:08',2,NULL,NULL,15,'A',NULL),(16,'P','P','2025-04-04 11:26:13',2,NULL,NULL,16,'A',NULL),(20,'P','P','2025-04-04 21:34:28',2,NULL,NULL,73,'A',NULL),(21,'P','P','2025-04-04 21:42:44',2,NULL,NULL,74,'A',NULL),(29,'P','P','2025-04-05 10:15:30',2,NULL,NULL,84,'A',NULL),(31,'P','P','2025-04-05 10:22:45',2,NULL,NULL,86,'A',NULL),(32,'P','P','2025-04-05 10:24:07',2,NULL,NULL,87,'A',NULL),(33,'P','P','2025-04-05 10:29:04',2,NULL,NULL,88,'A',NULL),(34,'P','P','2025-04-05 10:32:17',2,NULL,NULL,89,'A',NULL),(35,'P','P','2025-04-05 10:34:34',2,NULL,NULL,90,'A',NULL),(36,'P','P','2025-04-05 11:00:04',2,NULL,NULL,91,'A',NULL),(37,'P','P','2025-04-05 11:04:29',2,NULL,NULL,92,'A',NULL),(38,'P','P','2025-04-05 11:04:29',2,NULL,NULL,93,'A',NULL),(39,'P','P','2025-04-05 11:10:01',2,NULL,NULL,94,'A',NULL),(40,'P','P','2025-04-05 11:10:01',2,NULL,NULL,95,'A',NULL),(41,'I','I','2025-04-07 09:58:05',2,NULL,NULL,4,'A','Probando los subscribers'),(42,'P','I','2025-04-07 09:58:06',2,NULL,NULL,4,'A','N/A'),(43,'I','I','2025-04-07 10:03:50',2,NULL,NULL,2,'A','Probando los subscribers'),(44,'P','I','2025-04-07 10:03:51',2,NULL,NULL,2,'A','Inicamos la revisi├│n para confirmar el diagnostico'),(45,'P','N','2025-04-07 10:54:39',2,NULL,NULL,8,'A','No encontramos un reemplazo para la parte da├▒ada'),(46,'R','R','2025-04-07 21:46:04',2,NULL,NULL,4,'A','Ha utilizado \' Iphone Iphone 14 Pro Max\' en el reparo'),(47,'I','R','2025-04-07 21:46:04',2,NULL,NULL,4,'A','Reemplazo de bater├¡a');
/*!40000 ALTER TABLE `repair_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repair_order`
--

DROP TABLE IF EXISTS `repair_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repair_order` (
  `repair_order_id` int NOT NULL AUTO_INCREMENT,
  `device_id` int DEFAULT NULL,
  `reported_issue` text NOT NULL,
  `diagnosis` varchar(255) DEFAULT NULL,
  `status` enum('P','I','R','N') DEFAULT 'P',
  `estimated_cost` decimal(10,2) DEFAULT NULL,
  `delivery_date` timestamp NULL DEFAULT NULL,
  `assigned_staff_id` int DEFAULT NULL,
  `state` char(1) DEFAULT 'A',
  `created_by` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `advanced_payment` float DEFAULT NULL,
  PRIMARY KEY (`repair_order_id`),
  KEY `device_id` (`device_id`),
  KEY `assigned_staff_id` (`assigned_staff_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `repair_order_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `device` (`device_id`) ON DELETE CASCADE,
  CONSTRAINT `repair_order_ibfk_2` FOREIGN KEY (`assigned_staff_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `repair_order_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `repair_order_ibfk_4` FOREIGN KEY (`updated_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repair_order`
--

LOCK TABLES `repair_order` WRITE;
/*!40000 ALTER TABLE `repair_order` DISABLE KEYS */;
INSERT INTO `repair_order` VALUES (1,4,'Cracked screen','Screen replacement needed','I',200.00,'2025-03-12 15:30:00',NULL,'A',2,'2025-03-07 06:18:59',2,'2025-03-31 22:00:38',100),(2,5,'Battery drains quickly','Battery replacement needed','I',150.00,'2025-03-10 10:00:00',NULL,'A',2,'2025-03-07 06:18:59',2,'2025-04-07 06:03:51',50),(3,6,'Charging port issue','Charging port replacement needed','P',80.00,'2025-03-14 12:00:00',NULL,'A',2,'2025-03-07 06:53:39',NULL,NULL,30),(4,7,'La bateria de descarga rrapido','Cambio de bateria','R',1200.00,'2025-03-15 04:00:00',NULL,'A',2,'2025-03-14 09:25:08',2,'2025-04-07 17:46:04',500),(5,8,'No carga','Reemplazar IC de carga (micro soldadura)','N',4500.00,'2025-03-19 04:00:00',NULL,'A',2,'2025-03-15 23:15:41',2,'2025-03-31 23:35:00',2000),(6,9,'No carga','Pin o flex de carga no sirve','N',1500.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-03 20:56:09',2,'2025-04-03 21:00:46',500),(7,10,'No enciende','Nateria muerta','P',800.00,'2025-04-04 04:00:00',NULL,'A',2,'2025-04-04 00:50:46',NULL,NULL,NULL),(8,11,'Se descarga rrapido','Circuido da├▒ado que proboca alto consumo','N',1800.00,'2025-04-07 04:00:00',NULL,'A',2,'2025-04-04 00:50:47',2,'2025-04-07 06:54:39',NULL),(9,12,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-04 01:34:29',NULL,NULL,NULL),(10,13,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-04 01:35:29',NULL,NULL,NULL),(11,14,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-04 01:37:47',NULL,NULL,NULL),(12,15,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-04 01:38:54',NULL,NULL,NULL),(15,18,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-04 07:22:08',NULL,NULL,NULL),(16,19,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-04 07:26:13',NULL,NULL,NULL),(73,76,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-04 17:34:28',NULL,NULL,NULL),(74,77,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-04 17:42:44',NULL,NULL,NULL),(84,87,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-05 06:15:30',NULL,NULL,NULL),(86,89,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-05 06:22:45',NULL,NULL,NULL),(87,90,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-05 06:24:07',NULL,NULL,NULL),(88,91,'No enciende','Pantalla da├▒ada','P',1800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-05 06:29:04',NULL,NULL,NULL),(89,92,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-05 06:32:17',NULL,NULL,NULL),(90,93,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-05 06:34:34',NULL,NULL,NULL),(91,94,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-05 07:00:04',NULL,NULL,NULL),(92,95,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-05 07:04:29',NULL,NULL,NULL),(93,96,'Se descarga rrapido','Circuido da├▒ado que proboca alto consumo','P',1800.00,'2025-04-07 04:00:00',NULL,'A',2,'2025-04-05 07:04:29',NULL,NULL,NULL),(94,97,'No enciende','Pantalla da├▒ada','P',800.00,'2025-04-05 04:00:00',NULL,'A',2,'2025-04-05 07:10:01',NULL,NULL,NULL),(95,98,'Se descarga rrapido','Circuido da├▒ado que proboca alto consumo','P',1800.00,'2025-04-07 04:00:00',NULL,'A',2,'2025-04-05 07:10:01',NULL,NULL,NULL);
/*!40000 ALTER TABLE `repair_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repair_product`
--

DROP TABLE IF EXISTS `repair_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repair_product` (
  `repair_product_id` int NOT NULL AUTO_INCREMENT,
  `repair_order_id` int NOT NULL,
  `product_detail_id` int NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `state` char(1) DEFAULT 'A',
  PRIMARY KEY (`repair_product_id`),
  KEY `repair_order_id` (`repair_order_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  KEY `product_detail_id` (`product_detail_id`),
  CONSTRAINT `repair_product_ibfk_1` FOREIGN KEY (`repair_order_id`) REFERENCES `repair_order` (`repair_order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `repair_product_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `repair_product_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `repair_product_ibfk_4` FOREIGN KEY (`product_detail_id`) REFERENCES `product_detail` (`product_detail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `repair_product_chk_1` CHECK ((`quantity` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repair_product`
--

LOCK TABLES `repair_product` WRITE;
/*!40000 ALTER TABLE `repair_product` DISABLE KEYS */;
INSERT INTO `repair_product` VALUES (1,1,2,1,'2025-04-01 02:00:38',2,NULL,NULL,'A'),(2,6,1,1,'2025-04-04 01:00:46',2,NULL,NULL,'A'),(8,4,6,1,'2025-04-07 09:58:06',2,NULL,NULL,'A'),(9,2,6,1,'2025-04-07 10:03:51',2,NULL,NULL,'A'),(14,4,6,1,'2025-04-07 21:46:04',2,NULL,NULL,'A');
/*!40000 ALTER TABLE `repair_product` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_repair_product` AFTER INSERT ON `repair_product` FOR EACH ROW begin

   if (

      select stock

        from product_detail

       where product_detail_id = new.product_detail_id

   ) >= new.quantity then

      update product_detail

         set

         stock = stock - new.quantity

       where product_detail_id = new.product_detail_id;

   else

      SIGNAL SQLSTATE '45000'

        SET MESSAGE_TEXT = 'Insufficient stock available for the product.';

   end if;

end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `state` char(1) COLLATE utf8mb4_general_ci DEFAULT 'A',
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `name` (`name`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','Rol que contiene todos los permisos en la applicaci├│n','2025-02-17 08:10:17',NULL,'2025-02-17 08:10:17',NULL,'A'),(2,'T├⌐cnico ','Este rol se asinados a los tecnicos, encagados de las reparacioes','2025-02-24 06:07:42',2,'2025-02-24 06:07:42',NULL,'A'),(3,'Prueba','Rol de prueba','2025-02-24 06:31:36',2,'2025-02-28 03:14:13',NULL,'I'),(4,'Prueba 2','Segundo estado de prueba','2025-02-24 07:17:02',2,'2025-02-24 07:21:33',NULL,'I'),(5,'Prueba 3','tercer estado de prueba','2025-02-24 07:19:39',2,'2025-02-24 07:21:39',NULL,'I'),(6,'Prueba 4','prueba 4','2025-02-24 07:21:04',2,'2025-02-24 07:21:29',NULL,'I'),(7,'Prueba 5','Rol de prueba 5','2025-02-24 07:22:38',2,'2025-02-24 07:30:37',NULL,'I'),(8,'Otra prueba','Otra prueba m├ís','2025-02-24 07:28:55',2,'2025-02-24 07:30:40',NULL,'I'),(9,'Prueba de finitiva','Una ulima prueba','2025-02-24 07:30:25',2,'2025-02-24 07:30:43',NULL,'I');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `gender` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` text COLLATE utf8mb4_general_ci,
  `phone` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `identity_document` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `document_type` char(11) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `address` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `state` char(1) COLLATE utf8mb4_general_ci DEFAULT 'A',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `identity_document` (`identity_document`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'brosario','Benjamin','M','Rosario','brosario@gmail.com','$2b$10$yUDjlBYlxDJ5Jj1k7FdxQe9ER/J1diTCCmM/88V5qfd1jCajAGD2S','https://png.pngtree.com/png-vector/20240710/ourmid/pngtree-criminal-icon-logo-isolated-vector-png-image_7052625.png','8293594707','40235979925','C','1996-06-19','Las Carolinas, La vaga, Rep. Dominicana','2025-02-17 06:58:49',NULL,'2025-02-23 04:41:37',NULL,'A'),(3,'amartinez','Antoni','M','Mart├¡nez Cruz','amartinez@gmail.com','$2b$10$E7eYKyTp5bx33NzIdqO1hOndNpsgsd4X2TmHrAximzJH0QYiLrosG','https://static.vecteezy.com/system/resources/thumbnails/007/786/824/small_2x/hacker-in-simple-flat-personal-profile-icon-or-symbol-people-concept-illustration-vector.jpg','8295568989','04735979957','C','1996-06-19','Las Carolinas, La vaga, Rep. Dominicana','2025-02-17 07:03:32',NULL,'2025-02-23 04:49:48',NULL,'A'),(4,'mrodriguez','Marisol','F','Rodr├¡guez P├⌐rez','mrodriguez@gmail.com','$2b$10$b9fvD2DZthnfZeE0JC4yTOVbBDGAlGshnUYoGkWo36VkWAEu8zM76','https://th.bing.com/th/id/OIP._HBdwypmCZDZd5Qg9qophgHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain','8293594127','04735979925','C','1999-12-19','Las Carolinas, La vaga, Rep. Dominicana','2025-02-23 01:57:40',NULL,NULL,NULL,'A'),(5,'hmatias','Hector Jos├⌐ ','M','Matias P├⌐rez','hmatias@outlook.com','$2b$10$EzpvlJ3qNQNppM5P.8FSMOJ24v9G3O61A4o3fHoA2L609JFNHy//K',NULL,'8099987874','04789896969','C','2003-08-05',NULL,'2025-02-23 02:00:36',NULL,'2025-02-23 02:17:40',NULL,'A'),(6,'psalceso','Pedro','M','Salcedo','psalcedo@gmail.com','$2b$10$fgS2/twvNP.KGDBb3aARReBhOMZZ3l65o7H3IWS/DzJwlrxGoAmE2',NULL,'8293365989','78956265789','C','2005-02-09',NULL,'2025-02-23 04:48:04',NULL,NULL,NULL,'A'),(7,'mrosario','Marco','M','Rosario','mrosario@gmail.com','$2b$10$CDZ9SI./nDRxbBcaaF66NuHfkAyskRb42iuBljQHQj0BveyTdFdQy',NULL,'8296698989','15859696969','C','2002-02-05',NULL,'2025-02-24 07:54:54',NULL,NULL,NULL,'A'),(8,'crodriguez','Camila','F','Rodr├¡guez','crodriguez@gmail.com','$2b$10$TK11QUsLdGYiYlpxrRwHn.1cKmiGWaiiqNQ3zNXWt3hKU5JV5XAa2',NULL,'8094478559','04898978589','C','2003-10-15','','2025-03-12 10:15:48',2,NULL,NULL,'A');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_x_roles`
--

DROP TABLE IF EXISTS `user_x_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_x_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `state` char(1) COLLATE utf8mb4_general_ci DEFAULT 'A',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_role_user` (`user_id`,`role_id`),
  UNIQUE KEY `unique_index` (`user_id`,`role_id`) USING BTREE,
  KEY `role_id` (`role_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_x_roles`
--

LOCK TABLES `user_x_roles` WRITE;
/*!40000 ALTER TABLE `user_x_roles` DISABLE KEYS */;
INSERT INTO `user_x_roles` VALUES (1,2,1,'2025-02-27 23:37:55',1,NULL,NULL,'A'),(2,8,2,'2025-03-12 10:18:59',NULL,NULL,NULL,'A');
/*!40000 ALTER TABLE `user_x_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-07 20:04:43
