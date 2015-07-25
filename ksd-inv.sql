CREATE DATABASE IF NOT EXISTS ksd_inventory;

USE ksd_inventory;

--
-- Table structure for table `items`
--


CREATE TABLE IF NOT EXISTS `inventory` (
  `itemNumber` int(11) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(50) NOT NULL,
  `serialNumber` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `room` varchar(50) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `ts` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`itemNumber`)
);

--
-- Dumping data for table `items`
--

INSERT INTO `inventory` (`itemNumber`, `itemName`, `serialNumber`, `type`, `room`, `city`) VALUES
(103, 'Johns Desktop Computer', '238-1338-22', 'Desktop','251', 'Kansas City'),
(112, 'sony bravia 40 HDMI', 'SB-20070902218', 'Television', '2nd Floor Conference', 'Topeka');

