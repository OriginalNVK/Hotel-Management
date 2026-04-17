-- Insert Room Types
INSERT INTO roomtype (type, price, "maxOccupancy", "surchargeRate", "minCustomerForSurcharge") 
VALUES ('A', 150, 6, 0.25, 3);
INSERT INTO roomtype (type, price, "maxOccupancy", "surchargeRate", "minCustomerForSurcharge") 
VALUES ('B', 170, 4, 0.25, 2);
INSERT INTO roomtype (type, price, "maxOccupancy", "surchargeRate", "minCustomerForSurcharge") 
VALUES ('C', 200, 2, 0.25, 1);

-- Insert Rooms
INSERT INTO room ("roomId", type, "isAvailable", "imgUrl") VALUES (101, 'A', false, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/1');
INSERT INTO room ("roomId", type, "isAvailable", "imgUrl") VALUES (102, 'B', false, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/2');
INSERT INTO room ("roomId", type, "isAvailable", "imgUrl") VALUES (103, 'C', false, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/3');
INSERT INTO room ("roomId", type, "isAvailable", "imgUrl") VALUES (201, 'A', false, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/4');
INSERT INTO room ("roomId", type, "isAvailable", "imgUrl") VALUES (202, 'B', false, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/5');
INSERT INTO room ("roomId", type, "isAvailable", "imgUrl") VALUES (203, 'C', true, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/6');
INSERT INTO room ("roomId", type, "isAvailable", "imgUrl") VALUES (301, 'A', true, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/7');
INSERT INTO room ("roomId", type, "isAvailable", "imgUrl") VALUES (302, 'B', true, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/8');
INSERT INTO room ("roomId", type, "isAvailable", "imgUrl") VALUES (303, 'C', true, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/9');
INSERT INTO room ("roomId", type, "isAvailable", "imgUrl") VALUES (104, 'A', true, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/10');

-- Insert Customer Types
INSERT INTO customertype (type, name, coefficient) VALUES (1, 'domestic', 1);
INSERT INTO customertype (type, name, coefficient) VALUES (2, 'foreign', 1.5);

-- Insert Customers
INSERT INTO customer (name, address, "identityCard", type) VALUES ('Hoàng Tiến Huy', 'Dĩ An, Bình Dương', '066204006779', 1);
INSERT INTO customer (name, address, "identityCard", type) VALUES ('Nguyễn Trấn An', 'Tp.Thủ Đức', '081197006912', 1);
INSERT INTO customer (name, address, "identityCard", type) VALUES ('Rồi Sẽ Ổn', 'Yên Bình', '077200106219', 1);
INSERT INTO customer (name, address, "identityCard", type) VALUES ('Nông Văn Lâm', 'KTX khu A', '014199206014', 1);
INSERT INTO customer (name, address, "identityCard", type) VALUES ('Mường Thanh', 'KTX khu B', '042194749147', 1);
INSERT INTO customer (name, address, "identityCard", type) VALUES ('Lebrons James', NULL, '000000000001', 2);
INSERT INTO customer (name, address, "identityCard", type) VALUES ('Ishow Speed', NULL, '000000000002', 2);
INSERT INTO customer (name, address, "identityCard", type) VALUES ('Leo Messi', NULL, '000000000003', 2);
INSERT INTO customer (name, address, "identityCard", type) VALUES ('Cristiano Ronaldo', NULL, '000000000004', 2);
