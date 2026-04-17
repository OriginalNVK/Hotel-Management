-- Insert Room Types
INSERT INTO roomtype (type, price, "maxOccupancy", "surchargeRate", "minCustomerForSurcharge") 
VALUES 
  ('A', 150, 6, 0.25, 3),
  ('B', 170, 4, 0.25, 2),
  ('C', 200, 2, 0.25, 1)
ON CONFLICT (type) DO NOTHING;

-- Insert Rooms
INSERT INTO room ("roomId", type, "isAvailable", "imgUrl") 
VALUES 
  (101, 'A', false, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/1'\),
  (102, 'B', false, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/2'\),
  (103, 'C', false, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/3'\),
  (201, 'A', false, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/4'\),
  (202, 'B', false, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/5'\),
  (203, 'C', true, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/6'\),
  (301, 'A', true, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/7'\),
  (302, 'B', true, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/8'\),
  (303, 'C', true, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/9'\),
  (104, 'A', true, 'https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/HotelManagement/10'\)
ON CONFLICT ("roomId") DO NOTHING;

-- Insert Customer Types
INSERT INTO customertype (type, name, coefficient) 
VALUES 
  (1, 'domestic', 1),
  (2, 'foreign', 1.5)
ON CONFLICT (type) DO NOTHING;

-- Insert Customers (these will have auto-incremented IDs)
INSERT INTO customer (name, address, "identityCard", type) 
VALUES 
  ('Hoàng Tiến Huy', 'Dĩ An, Bình Dương', '066204006779', 1),
  ('Nguyễn Trấn An', 'Tp.Thủ Đức', '081197006912', 1),
  ('Rồi Sẽ Ổn', 'Yên Bình', '077200106219', 1),
  ('Nông Văn Lâm', 'KTX khu A', '014199206014', 1),
  ('Mường Thanh', 'KTX khu B', '042194749147', 1),
  ('Lebrons James', NULL, '000000000001', 2),
  ('Ishow Speed', NULL, '000000000002', 2),
  ('Leo Messi', NULL, '000000000003', 2),
  ('Cristiano Ronaldo', NULL, '000000000004', 2);
