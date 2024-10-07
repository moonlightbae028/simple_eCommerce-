-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 07, 2024 at 12:55 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce1`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `total` decimal(10,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shipping_address` varchar(255) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_status` enum('pending','paid') DEFAULT 'pending',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userId`, `status`, `total`, `createdAt`, `shipping_address`, `payment_method`, `payment_status`) VALUES
(1, 9, 'approved', 100.00, '2024-10-01 13:37:01', NULL, NULL, 'pending'),
(2, 9, 'approved', 205.00, '2024-10-01 13:41:45', NULL, NULL, 'pending'),
(3, 9, 'approved', 105.00, '2024-10-01 14:06:35', NULL, NULL, 'pending'),
(4, 9, 'approved', 100.00, '2024-10-01 14:43:40', NULL, NULL, 'pending'),
(5, 7, 'approved', 105.00, '2024-10-01 20:22:51', NULL, NULL, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text,
  `picture` varchar(255) DEFAULT NULL,
  `stock` int NOT NULL,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `picture`, `stock`, `category`) VALUES
(31, 'Chaco Z/Cloud', 105.00, 'All-terrain performance sandals', 'chaco_z_cloud.jpg', 18, 'Sandals'),
(30, 'Keen Newport H2', 100.00, 'Water-friendly outdoor sandals', 'keen_newport_h2.jpg', 15, 'Outdoor'),
(29, 'Nike Mercurial Superfly 8 Elite', 275.00, 'Elite football boots with speed and agility focus', 'nike_mercurial_superfly_8_elite.jpg', 8, 'Sports'),
(28, 'New Balance Fresh Foam 1080v11', 150.00, 'Premium cushioned running shoes', 'new_balance_fresh_foam_1080v11.jpg', 25, 'Running'),
(27, 'Merrell Moab 2 Vent', 120.00, 'Breathable hiking shoes', 'merrell_moab_2_vent.jpg', 20, 'Outdoor'),
(26, 'Columbia Newton Ridge Plus II', 100.00, 'Waterproof hiking boots', 'columbia_newton_ridge_plus_ii.jpg', 22, 'Outdoor'),
(25, 'Johnston & Murphy Melton Cap Toe', 195.00, 'Timeless leather dress shoes', 'johnston_murphy_melton_cap_toe.jpg', 18, 'Formal'),
(24, 'Allen Edmonds Park Avenue', 395.00, 'Elegant leather oxford shoes', 'allen_edmonds_park_avenue.jpg', 10, 'Formal'),
(23, 'Converse Chuck 70', 80.00, 'Vintage-style high-top sneakers', 'converse_chuck_70.jpg', 25, 'Casual'),
(22, 'Vans Classic Slip-On', 60.00, 'Easy-wear canvas shoes for casual outings', 'vans_classic_slip_on.jpg', 40, 'Casual'),
(21, 'Adidas Predator Edge+', 250.00, 'Football boots with precision and control', 'adidas_predator_edge.jpg', 10, 'Sports'),
(20, 'Nike LeBron 19', 200.00, 'Top-tier basketball shoes with responsive cushioning', 'nike_lebron_19.jpg', 12, 'Sports'),
(11, 'Nike Air Zoom Pegasus 39', 130.00, 'High-performance running shoes', 'nike_air_zoom_pegasus_39.jpg', 25, 'Running'),
(10, 'Jordan Air 1 Retro High OG', 170.00, 'Classic basketball shoes with premium materials', 'jordan_air_1_retro.jpg', 10, 'Shoes'),
(18, 'Birkenstock Arizona', 100.00, 'Classic two-strap sandals', 'birkenstock_arizona.jpg', 45, 'Sandals'),
(9, 'Asics Gel-Kayano 28', 160.00, 'Supportive running shoes with GEL cushioning', 'asics_gel_kayano_28.jpg', 18, 'Shoes'),
(19, 'Teva Original Universal', 50.00, 'All-day comfort sandals for outdoor activities', 'teva_original_universal.jpg', 30, 'Sandals'),
(17, 'Saucony Endorphin Speed 3', 160.00, 'Fast and responsive running shoes', 'saucony_endorphin_speed_3.jpg', 18, 'Running'),
(16, 'Asics GT-2000 10', 140.00, 'Supportive and cushioned running shoes', 'asics_gt_2000_10.jpg', 28, 'Running'),
(15, 'Clarks Wallabee', 150.00, 'Classic casual shoes with crepe soles', 'clarks_wallabee.jpg', 35, 'Casual'),
(14, 'Timberland 6-Inch Premium Waterproof Boots', 190.00, 'Durable outdoor boots', 'timberland_premium_boots.jpg', 20, 'Outdoor'),
(13, 'Puma Future Z 1.4 FG', 200.00, 'Firm ground football boots for top performance', 'puma_future_z_1.4_fg.jpg', 15, 'Sports'),
(12, 'Adidas Adilette Slides', 45.00, 'Comfortable and stylish slip-on sandals', 'adidas_adilette_slides.jpg', 50, 'Sandals');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('FBh_qZoVlyTM3eK_KJEC1P9Lb7Ne5tlp', 1728261612, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-10-07T00:40:11.683Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"userId\":9,\"username\":\"moonn\",\"userType\":\"user\"},\"success\":true,\"cart\":[{\"id\":31,\"name\":\"Chaco Z/Cloud\",\"price\":105,\"description\":\"All-terrain performance sandals\",\"picture\":\"chaco_z_cloud.jpg\",\"stock\":18,\"category\":\"Sandals\",\"quantity\":1},{\"id\":30,\"name\":\"Keen Newport H2\",\"price\":100,\"description\":\"Water-friendly outdoor sandals\",\"picture\":\"keen_newport_h2.jpg\",\"stock\":15,\"category\":\"Outdoor\",\"quantity\":3}]}'),
('UO8GgbOQ5FFfLeIpiEN0UfJWZLGgKQLU', 1728265377, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-10-07T01:42:16.073Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":7,\"email\":\"admin@admin\",\"password\":\"admin\",\"fullName\":\"admin\",\"username\":\"admin2\",\"userType\":\"admin\"},\"success\":true}'),
('qJ3rJ6cffzr2KRCkVmCVsVquSH6xps8X', 1728261652, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-10-07T00:00:13.807Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"userId\":9,\"username\":\"moonn\",\"userType\":\"user\"},\"success\":true,\"cart\":[{\"id\":31,\"name\":\"Chaco Z/Cloud\",\"price\":105,\"description\":\"All-terrain performance sandals\",\"picture\":\"chaco_z_cloud.jpg\",\"stock\":18,\"category\":\"Sandals\",\"quantity\":1},{\"id\":27,\"name\":\"Merrell Moab 2 Vent\",\"price\":120,\"description\":\"Breathable hiking shoes\",\"picture\":\"merrell_moab_2_vent.jpg\",\"stock\":20,\"category\":\"Outdoor\",\"quantity\":1}]}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullName` varchar(100) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `userType` enum('user','admin') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `fullName`, `username`, `userType`) VALUES
(11, 'john@gmail.com', 'John', 'John Allen ', 'johnd', NULL),
(6, 'user@user.com', 'user', 'user', 'user', 'user'),
(7, 'admin@admin', 'admin', 'admin', 'admin2', 'admin'),
(8, 'alvnvllavrdee@gmail.com', 'Alvin', 'Alvin Villaverde', 'moonlight', 'user'),
(9, 'alvnvllavrdd@gmail.com', 'Alvin', 'Alvin Villaverdeeee', 'moonn', 'user'),
(10, 'Johnallen.magmanlac@gmail.com', 'qwertyuiop', 'John Allen ', 'Jamd', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
