-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: nanopantano
-- ------------------------------------------------------
-- Server version	9.7.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '30936002-52bd-11f1-aafc-49416b546603:1-801';

--
-- Table structure for table `sesion`
--

DROP TABLE IF EXISTS `sesion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sesion` (
  `sesion_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `usuario_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `titulo` varchar(120) NOT NULL DEFAULT 'Nueva sesión de chat',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`sesion_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `sesion_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sesion`
--

LOCK TABLES `sesion` WRITE;
/*!40000 ALTER TABLE `sesion` DISABLE KEYS */;
INSERT INTO `sesion` VALUES ('aa87109d-dcfd-4e05-8145-0320243d9d11','0fbc96ca-6d39-11f1-932f-e41fd53cc845','Chat 21/6/2026, 12:20:32 a.m.','2026-06-21 06:20:32','2026-06-21 06:20:32'),('f209c56c-f183-44ad-8f65-4446bde23576','0fbc96ca-6d39-11f1-932f-e41fd53cc845','Chat 21/6/2026, 12:21:34 a.m.','2026-06-21 06:21:34','2026-06-21 06:21:34');
/*!40000 ALTER TABLE `sesion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sesion_mensaje`
--

DROP TABLE IF EXISTS `sesion_mensaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sesion_mensaje` (
  `mensaje_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `sesion_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `remitente` enum('user','assistant') NOT NULL DEFAULT 'user',
  `contenido` text NOT NULL,
  `tipo` varchar(20) NOT NULL DEFAULT 'text',
  `imagen_url` text,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`mensaje_id`),
  KEY `sesion_id` (`sesion_id`),
  CONSTRAINT `sesion_mensaje_ibfk_1` FOREIGN KEY (`sesion_id`) REFERENCES `sesion` (`sesion_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sesion_mensaje`
--

LOCK TABLES `sesion_mensaje` WRITE;
/*!40000 ALTER TABLE `sesion_mensaje` DISABLE KEYS */;
INSERT INTO `sesion_mensaje` VALUES ('098a930e-fb0a-4498-815d-94b41e5ae75d','aa87109d-dcfd-4e05-8145-0320243d9d11','assistant','Imagen generada a partir del prompt: \"generate a pear\"','image','https://s3.amazonaws.com/siliconflow-image/outputs/26uk69rjpi46i_83d67cbfeedeb854c0562379cf5f81c4_ComfyUI_b759b736_00001_.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVRUVSKQ6JGALS6NA%2F20260621%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260621T063623Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=94e99694d3b44f4e5fd632845fcd9f5d71379642bbc1db4d8451ee9711d41a11','2026-06-21 06:22:51'),('41486239-cf3d-473f-ad9d-fe98872fe2be','aa87109d-dcfd-4e05-8145-0320243d9d11','assistant','Imagen generada a partir del prompt: \"generate an apple\"','image','https://s3.amazonaws.com/siliconflow-image/outputs/2fv3vgv5sj03m_c3b3b591a8332d40471a7c2c3aadfbcc_ComfyUI_9c012dc1_00001_.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVRUVSKQ6JGALS6NA%2F20260621%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260621T063442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=57e631477a6f2e9499fd749b712fd91abda4cbc0844a1384b3c7cdac216f075d','2026-06-21 06:21:10'),('7f068641-010f-475b-a563-8ca56766e094','aa87109d-dcfd-4e05-8145-0320243d9d11','user','generate an apple','text',NULL,'2026-06-21 06:21:07'),('99c6c84a-37e8-4de9-954e-89e170949d2f','f209c56c-f183-44ad-8f65-4446bde23576','assistant','Imagen generada a partir del prompt: \"generate a motocycle\"','image','https://s3.amazonaws.com/siliconflow-image/outputs/284r5ex4n2c06_941660066af824225bddd43a1dfd0949_ComfyUI_61dd09a6_00001_.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVRUVSKQ6JGALS6NA%2F20260621%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260621T063533Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=60531485348e93b134aa73a4770bcef7a0f9263b6f5471593175e792c7d7a401','2026-06-21 06:22:01'),('c9b18ebb-5177-4f2e-9d8b-e14e19d59b0b','f209c56c-f183-44ad-8f65-4446bde23576','user','generate a motocycle','text',NULL,'2026-06-21 06:21:55'),('fafbe4eb-4c2f-4440-9b34-b022dc76a451','aa87109d-dcfd-4e05-8145-0320243d9d11','user','generate a pear','text',NULL,'2026-06-21 06:22:46');
/*!40000 ALTER TABLE `sesion_mensaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `usuario_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `usuario_name` varchar(45) NOT NULL,
  `usuario_password` varchar(45) NOT NULL,
  `usuario_type` varchar(45) NOT NULL,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `usuario_name` (`usuario_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('0fbc96ca-6d39-11f1-932f-e41fd53cc845','admin','1234','administrador');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-26  9:31:54
