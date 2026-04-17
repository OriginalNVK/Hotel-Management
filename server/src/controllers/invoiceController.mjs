import { StatusCodes } from 'http-status-codes';
import InvoiceModel from '../models/InvoiceModel.mjs';
import BookingModel from '../models/BookingModel.mjs';

export const InvoiceController = {
  getAllBookingUnpaid: async (req, res) => {
    try {
      const invoices = await BookingModel.getAllBookingUnpaid();
      return res.status(StatusCodes.OK).json(invoices);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },

  createInvoice: async (req, res) => {
    try {
      const { Bookings, RepresentativeId } = req.body;
      // Convert RepresentativeId to integer
      const repIdInt = Number.parseInt(RepresentativeId, 10);
      if (Number.isNaN(repIdInt)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid RepresentativeId provided',
        });
      }
      // Convert booking IDs to integers
      const bookingIds = (Bookings || []).map((id) => {
        const bookingIdInt = Number.parseInt(id, 10);
        return Number.isNaN(bookingIdInt) ? null : bookingIdInt;
      }).filter((id) => id !== null);
      
      const invoice = await InvoiceModel.CreateInvoice(
        bookingIds,
        repIdInt
      );

      return res.status(StatusCodes.CREATED).json(invoice);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },

  getInvoiceInfo: async (req, res) => {
    try {
      const { InvoiceId } = req.params;
      const invoice = await InvoiceModel.getInvoiceInfo(InvoiceId);
      if (!invoice) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Invoice not found',
        });
      }
      return res.status(StatusCodes.OK).json(invoice);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },
};
