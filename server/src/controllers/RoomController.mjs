import { StatusCodes } from 'http-status-codes';
import RoomModel from '../models/RoomModel.mjs';
import RoomTypeModel from '../models/RoomTypeModel.mjs';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const RoomController = {
  getAllRooms: async (req, res) => {
    try {
      const rooms = await RoomModel.getAllRooms();
      return res.status(StatusCodes.OK).json(rooms);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },

  getRoomById: async (req, res) => {
    try {
      const { id } = req.params;
      const room = await RoomModel.getRoomById(id);
      if (!room) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Room not found',
        });
      }
      return res.status(StatusCodes.OK).json(room);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },

  addNewRoom: async (req, res) => {
    try {
      let { RoomId, Type, Status, Description } = req.body;
      let { ImgUrl } = req.body;

      const roomIdInt = Number.parseInt(RoomId, 10);
      if (Number.isNaN(roomIdInt)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'RoomId must be a valid number',
        });
      }

      if (!RoomId || !Type) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'RoomId and Type are required',
        });
      }

      if (Status === null || Status === undefined) {
        Status = true;
      }

      if (Description === null || Description === undefined) {
        Description = '';
      }

      if (ImgUrl?.startsWith('data:image')) {
        const result = await cloudinary.uploader.upload(ImgUrl, {
          folder: 'Hotel-Management',
        });
        ImgUrl = result.secure_url;
      }

      const room = await RoomModel.createRoom(
        roomIdInt,
        Type,
        Status,
        Description,
        ImgUrl
      );

      return res.status(StatusCodes.CREATED).json(room);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },

  updateRoom: async (req, res) => {
    try {
      const { id } = req.params;
      const roomIdInt = Number.parseInt(id, 10);
      const { Type, Status, Description } = req.body;
      let { ImgUrl } = req.body;

      if (ImgUrl?.startsWith('data:image')) {
        const result = await cloudinary.uploader.upload(ImgUrl, {
          folder: 'Hotel-Management',
        });
        ImgUrl = result.secure_url;
      }

      if (Type == null || Number.isNaN(roomIdInt)) {

        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'RoomId and Type are required',
        });
      }

      const result = await RoomModel.updateRoom(
        roomIdInt,
        Type,
        Status,
        Description,
        ImgUrl
      );

      if (result.code == StatusCodes.NOT_FOUND) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: result.message });
      } else if (result.code == StatusCodes.OK) {
        return res.status(StatusCodes.OK).json({ message: result.message });
      }
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },

  deleteRoom: async (req, res) => {
    try {
      const { id } = req.params;
      const roomIdInt = Number.parseInt(id, 10);
      if (Number.isNaN(roomIdInt)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'RoomId must be a valid number',
        });
      }
      const room = await RoomModel.deleteRoom(roomIdInt);
      return res.status(StatusCodes.OK).json(room);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },

  getAllRoomsTypes: async (req, res) => {
    const { roomNumber } = req.query;
    if (roomNumber) {
      try {
        const roomTypes = await RoomModel.getTypeInfoOfRoom(roomNumber);
        return res.status(StatusCodes.OK).json(roomTypes);
      } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: err.message,
        });
      }
    }

    try {
      const roomTypes = await RoomTypeModel.getAllRoomTypes();
      return res.status(StatusCodes.OK).json(roomTypes);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },

  getAllRoomsAvailable: async (req, res) => {
    try {
      const rooms = await RoomModel.getRoomByStatus(true);
      return res.status(StatusCodes.OK).json(rooms);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },

  createNewRoomType: async (req, res) => {
    const {
      Type,
      Price,
      MinCustomerForSurcharge,
      MaxOccupancy,
      SurchargeRate,
    } = req.body;
    try {
      const roomType = await RoomTypeModel.CreateRoomType(
        Type,
        Price,
        MaxOccupancy,
        MinCustomerForSurcharge,
        SurchargeRate
      );
      return res.status(StatusCodes.CREATED).json(roomType);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },

  updateRoomType: async (req, res) => {
    const { type } = req.params;
    const { Price, MinCustomerForSurcharge, MaxOccupancy, SurchargeRate } =
      req.body;
    try {
      const roomType = await RoomTypeModel.UpdateRoomType(
        type,
        Price,
        MaxOccupancy,
        MinCustomerForSurcharge,
        SurchargeRate
      );
      return res.status(StatusCodes.OK).json(roomType);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },

  deleteRoomType: async (req, res) => {
    const { type } = req.params;
    try {
      const roomType = await RoomTypeModel.DeleteRoomType(type);
      return res.status(StatusCodes.OK).json(roomType);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  },
};
