import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import RoomRoutes from './routes/room.mjs';
import BookingRoutes from './routes/booking.mjs';
import InvoiceRoutes from './routes/invoice.mjs';
import RoomTypeRoutes from './routes/roomType.mjs';
import CustomerTypeRoutes from './routes/customerType.mjs';
import BookingCustomerRoutes from './routes/bookingCustomer.mjs';
import ReportRoutes from './routes/report.mjs';
// import prisma from './database/connectSQL.mjs';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.static(`client/public`));
app.use(express.json({ limit: '2mb' }));

// prisma
//   .connect()
//   .then(() => {
//     console.log('Connected to SQL Server');
//   })
//   .catch((err) => {
//     console.log('Error connecting to SQL Server', err);
//   });

app.use('/api/rooms', RoomRoutes);
app.use('/api/bookings', BookingRoutes);
app.use('/api/invoices', InvoiceRoutes);
app.use('/api/roomtypes', RoomTypeRoutes);
app.use('/api/customertypes', CustomerTypeRoutes);
app.use('/api/bookingcustomers', BookingCustomerRoutes);
app.use('/api/reports', ReportRoutes);

const HOST = process.env.BACKEND_HOSTNAME || 'localhost';

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Back-end server is running');
});
