import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Create RoomTypes
    console.log('📌 Creating Room Types...');
    const roomTypes = await Promise.all([
      prisma.roomType.upsert({
        where: { type: 'A' },
        update: {},
        create: {
          type: 'A',
          price: 150,
          maxOccupancy: 6,
          surchargeRate: 0.25,
          minCustomerForSurcharge: 3,
        },
      }),
      prisma.roomType.upsert({
        where: { type: 'B' },
        update: {},
        create: {
          type: 'B',
          price: 170,
          maxOccupancy: 4,
          surchargeRate: 0.25,
          minCustomerForSurcharge: 2,
        },
      }),
      prisma.roomType.upsert({
        where: { type: 'C' },
        update: {},
        create: {
          type: 'C',
          price: 200,
          maxOccupancy: 2,
          surchargeRate: 0.25,
          minCustomerForSurcharge: 1,
        },
      }),
    ]);
    console.log(`✅ Created ${roomTypes.length} room types\n`);

    // Create Rooms
    console.log('🏨 Creating Rooms...');
    const roomIds = [101, 102, 103, 201, 202, 203, 301, 302, 303, 104];
    const roomTypesList = ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A'];
    const rooms = [];

    for (let i = 0; i < roomIds.length; i++) {
      const room = await prisma.room.upsert({
        where: { roomId: roomIds[i] },
        update: {},
        create: {
          roomId: roomIds[i],
          type: roomTypesList[i],
          isAvailable: i > 3,
          imgUrl: `https://res.cloudinary.com/dvzhmi7a9/image/upload/t_scale_10/Hotel-Management/${i + 1}`,
        },
      });
      rooms.push(room);
    }
    console.log(`✅ Created ${rooms.length} rooms\n`);

    // Create CustomerTypes
    console.log('👥 Creating Customer Types...');
    const customerTypes = await Promise.all([
      prisma.customerType.upsert({
        where: { type: 1 },
        update: {},
        create: {
          type: 1,
          name: 'domestic',
          coefficient: 1,
        },
      }),
      prisma.customerType.upsert({
        where: { type: 2 },
        update: {},
        create: {
          type: 2,
          name: 'foreign',
          coefficient: 1.5,
        },
      }),
    ]);
    console.log(`✅ Created ${customerTypes.length} customer types\n`);

    // Create Customers
    console.log('👤 Creating Customers...');
    const customerData = [
      { name: 'Hoàng Tiến Huy', address: 'Dĩ An, Bình Dương', identityCard: '066204006779', type: 1 },
      { name: 'Nguyễn Trấn An', address: 'Tp.Thủ Đức', identityCard: '081197006912', type: 1 },
      { name: 'Rồi Sẽ Ổn', address: 'Yên Bình', identityCard: '077200106219', type: 1 },
      { name: 'Nông Văn Lâm', address: 'KTX khu A', identityCard: '014199206014', type: 1 },
      { name: 'Mường Thanh', address: 'KTX khu B', identityCard: '042194749147', type: 1 },
      { name: 'Lebrons James', address: null, identityCard: '000000000001', type: 2 },
      { name: 'Ishow Speed', address: null, identityCard: '000000000002', type: 2 },
      { name: 'Leo Messi', address: null, identityCard: '000000000003', type: 2 },
      { name: 'Cristiano Ronaldo', address: null, identityCard: '000000000004', type: 2 },
    ];

    const customers = [];
    for (const data of customerData) {
      const customer = await prisma.customer.create({
        data: {
          name: data.name,
          address: data.address,
          identityCard: data.identityCard,
          type: data.type,
        },
      });
      customers.push(customer);
    }
    console.log(`✅ Created ${customers.length} customers\n`);

    // Create Bookings and BookingCustomers
    console.log('📅 Creating Bookings...');
    const bookingDates = ['2024-08-01', '2024-08-01', '2024-08-02', '2024-08-01', '2024-08-17'];
    const bookingRooms = [101, 102, 201, 202, 301];
    const customerIndices = [
      [0, 1, 2],
      [3, 4],
      [5],
      [6],
      [7, 8],
    ];

    for (let i = 0; i < 5; i++) {
      const booking = await prisma.booking.create({
        data: {
          roomId: bookingRooms[i],
          bookingDate: new Date(bookingDates[i]),
        },
      });

      for (const custIdx of customerIndices[i]) {
        await prisma.bookingCustomer.create({
          data: {
            bookingId: booking.bookingId,
            customerId: customers[custIdx].customerId,
          },
        });
      }
    }
    console.log('✅ Created 5 bookings with customers\n');

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
