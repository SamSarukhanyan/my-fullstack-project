-- MySQL dump 10.13  Distrib 5.7.44, for Linux (x86_64)
--
-- Host: localhost    Database: living-invest
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Properties`
--

DROP TABLE IF EXISTS `Properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `propertyId` int(11) NOT NULL,
  `region` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subregion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uniqueFields` json NOT NULL,
  `price` float NOT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rentalPeriod` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `photos` json NOT NULL,
  `contactInfo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `propertyStatus` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'standard',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Properties`
--

LOCK TABLES `Properties` WRITE;
/*!40000 ALTER TABLE `Properties` DISABLE KEYS */;
INSERT INTO `Properties` VALUES (1,'sale-land',5456,'Երևան','Կենտրոն','{\"Тип\": \"Сельскохозяйственный\", \"Адрес\": \"ffgfgd\", \"Коммуникации\": [\"Электричество\"], \"Площадь участка\": \"5455456\"}',7876,'AMD',NULL,'jhgjhh','[\"uploads/photos-1721979668627.jpg\"]','45556',40.1915,44.5344,'standard','2024-07-26 11:41:08','2024-07-26 11:41:08'),(2,'sale-land',5476,'Երևան','Կենտրոն','{\"Тип\": \"Сельскохозяйственный\", \"Адрес\": \"gfhgfh\", \"Коммуникации\": [\"Электричество\"], \"Площадь участка\": \"5656\"}',5656,'AMD',NULL,'ghfhfg','[\"uploads/photos-1721979690160.jpg\"]','54',40.1638,44.4898,'top','2024-07-26 11:41:30','2024-07-26 11:41:30'),(3,'sale-land',566,'Երևան','Ավան','{\"Тип\": \"Сельскохозяйственный\", \"Адрес\": \"ghgfh\", \"Коммуникации\": [\"Электричество\"], \"Площадь участка\": \"564654\"}',5656,'AMD',NULL,'gfghghf','[\"uploads/photos-1721979712300.jpg\", \"uploads/photos-1721979712300.jpg\", \"uploads/photos-1721979712301.jpg\"]','564',40.194,44.504,'standard','2024-07-26 11:41:52','2024-07-26 11:41:52'),(4,'sale-land',656,'Երևան','Ավան','{\"Тип\": \"Сельскохозяйственный\", \"Адрес\": \"fghghf\", \"Коммуникации\": [\"Электричество\"], \"Площадь участка\": \"ggfgh\"}',5456,'AMD',NULL,'fghghfhg','[\"uploads/photos-1721979734331.jpg\"]','56',40.1745,44.5452,'top','2024-07-26 11:42:14','2024-07-26 11:42:14'),(5,'sale-house',88,'Երևան','Կենտրոն','{\"Тип\": \"Таунхаус\", \"Гараж\": \"Одно место\", \"Улица\": \"gfhfgh\", \"Мебель\": \"Нет\", \"Ремонт\": \"Косметический ремонт\", \"Удобства\": [\"Бассейн\"], \"Состояние\": \"Недостроен\", \"Номер дома\": \"5456\", \"Тип здания\": \"Каменное\", \"Площадь дома\": \"564\", \"Коммуникации\": [\"Водоснабжение\"], \"Этажей в доме\": 1, \"Бытовая техника\": [\"Холодильник\"], \"Площадь участка\": \"5456\", \"Количество комнат\": 2, \"Количество санузлов\": 2}',678,'AMD',NULL,'hgfhg','[\"uploads/photos-1721979777653.jpg\"]','8787',40.1706,44.5394,'standard','2024-07-26 11:42:57','2024-07-26 11:42:57');
/*!40000 ALTER TABLE `Properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Davit','$2a$10$WLYQ9ip5P.VsS0JveLejNu7GewvBjzlokqvcRAYc0fJ56YAx7uygq',1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-26  8:02:21
