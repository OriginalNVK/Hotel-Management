import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

// Import Prisma client from the generated location
import { PrismaClient } from '../src/generated/prisma/client.ts';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create RoomTypes
  const roomTypeA = await prisma.roomType.upsert({
    where: { type: 'A' },
    update: {},
    create: {
      type: 'A',
      price: 150,
      maxOccupancy: 6,
      surchargeRate: 0.25,
      minCustomerForSurcharge: 3,
    },
  });

  const roomTypeB = await prisma.roomType.upsert({
    where: { type: 'B' },
    update: {},
    create: {
      type: 'B',
      price: 170,
      maxOccupancy: 4,
      surchargeRate: 0.25,
      minCustomerForSurcharge: 2,
    },
  });

  const roomTypeC = await prisma.roomType.upsert({
    where: { type: 'C' },
    update: {},
    create: {
      type: 'C',
      price: 200,
      maxOccupancy: 2,
      surchargeRate: 0.25,
      minCustomerForSurcharge: 1,
    },
  });

  console.log('Created room types:', { roomTypeA, roomTypeB, roomTypeC });

  // Create Rooms
  const rooms = [];
  const roomIds = [101, 102, 103, 201, 202, 203, 301, 302, 303, 104];
  const roomTypes = ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A'];

  for (let i = 0; i < roomIds.length; i++) {
    const room = await prisma.room.upsert({
      where: { roomId: roomIds[i] },
      update: {},
      create: {
        roomId: roomIds[i],
        type: roomTypes[i],
        isAvailable: i > 3,
        imgUrl: `https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/Hotel-Management/${i + 1}`,
      },
    });
    rooms.push(room);
  }

  console.log(`Created ${rooms.length} rooms`);

  // Create CustomerTypes
  const customerTypeDomestic = await prisma.customerType.upsert({
    where: { type: 1 },
    update: {},
    create: {
      type: 1,
      name: 'domestic',
      coefficient: 1,
    },
  });

  const customerTypeForeign = await prisma.customerType.upsert({
    where: { type: 2 },
    update: {},
    create: {
      type: 2,
      name: 'foreign',
      coefficient: 1.5,
    },
  });

  console.log('Created customer types:', { customerTypeDomestic, customerTypeForeign });

  // Create Customers
  const customers = [];
  const customerData = [
    { name: 'Hoàng Tiến Huy', address: 'Dĩ An, Bình Dương', identityCard: '066204006779', type: 1 },
    { name: 'Nguyễn Trấn An', address: 'Tp.Thủ Đức', identityCard: '081197006912', type: 1 },
    { name: 'Rồi Sẽ Ổn', address: 'Yên Bình', identityCard: '077200106219', type: 1 },
    { name: 'Nông Văn Lâm', address: 'KTX khu A', identityCard: '014199206014', type: 1 },
    { name: 'Mường Thanh', address: 'KTX khu B', identityCard: '042194749147', type: 1 },
    { name: 'Lebrons James', address: null, identityCard: '', type: 2 },
    { name: 'Ishow Speed', address: null, identityCard: '', type: 2 },
    { name: 'Leo Messi', address: null, identityCard: '', type: 2 },
    { name: 'Cristiano Ronaldo', address: null, identityCard: '', type: 2 },
  ];

  for (const data of customerData) {
    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        address: data.address,
        identityCard: data.identityCard || `${Date.now()}-${Math.random()}`,
        type: data.type,
      },
    });
    customers.push(customer);
  }

  console.log(`Created ${customers.length} customers`);

  // Create Bookings and BookingCustomers
  const bookingDates = ['2024-08-01', '2024-08-01', '2024-08-02', '2024-08-01', '2024-08-17'];
  const bookingRooms = [101, 102, 201, 202, 301];

  for (let i = 0; i < 5; i++) {
    const booking = await prisma.booking.create({
      data: {
        roomId: bookingRooms[i],
        bookingDate: new Date(bookingDates[i]),
      },
    });

    // Add customers to booking
    const customerIndices = [
      [0, 1, 2],
      [3, 4],
      [5],
      [6],
      [7, 8],
    ];

    for (const custIdx of customerIndices[i]) {
      await prisma.bookingCustomer.create({
        data: {
          bookingId: booking.bookingId,
          customerId: customers[custIdx].customerId,
        },
      });
    }
  }

  console.log('Created bookings with customers');

  console.log('Seeding completed successfully!');
}

try {
  await main();
} catch (e) {
  console.error('Error seeding database:', e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
