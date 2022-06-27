/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 100422
 Source Host           : localhost:3306
 Source Schema         : db_product_test

 Target Server Type    : MySQL
 Target Server Version : 100422
 File Encoding         : 65001

 Date: 27/06/2022 15:10:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `product_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `product_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `product_picture` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `product_price` int NULL DEFAULT NULL,
  `product_sale` int NULL DEFAULT NULL,
  `product_stock` int NULL DEFAULT NULL,
  `product_created_at` datetime NULL DEFAULT NULL,
  `product_updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('0929d0c5-5369-4acf-9dfe-a192e5ee379c', 'semangka', '2022-06-27T08-03-09.726Z-semangka.jpg', 10000, 15000, 1000, '2022-06-27 15:03:09', NULL);
INSERT INTO `products` VALUES ('35c11aa4-b66e-4547-a0fd-e2c1c2fe2862', 'alpukat', '2022-06-27T07-00-45.803Z-alpukat.jpg', 1000, 2500, 12, '2022-06-27 13:50:23', '2022-06-27 14:00:45');
INSERT INTO `products` VALUES ('a36957d4-d570-4267-881d-b6ffd1eb24ca', 'anggur', '2022-06-27T07-59-03.168Z-anggur.jpg', 10000, 12000, 10, '2022-06-27 14:59:03', NULL);
INSERT INTO `products` VALUES ('ad88833c-1990-4eab-a212-b2d1c1138dd9', 'buku', '2022-06-27T07-32-48.981Z-buku.jpg', 1000, 10000, 10, '2022-06-27 14:29:55', '2022-06-27 14:32:49');
INSERT INTO `products` VALUES ('bef5a548-489e-491d-a5a1-3bd28fa54fdc', 'tomat', '2022-06-27T07-30-41.739Z-tomat.jpg', 1000, 1000, 12, '2022-06-27 14:30:41', NULL);
INSERT INTO `products` VALUES ('e9705e93-e115-42aa-a911-6a87e82e5b71', 'pulpen', '2022-06-27T07-32-25.048Z-pulpen.png', 1000, 10000, 12, '2022-06-27 14:32:25', NULL);

SET FOREIGN_KEY_CHECKS = 1;
