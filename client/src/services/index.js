// *Bookings*
export const getBookings = async () => {
  const response = await fetch('http://localhost:3000/api/bookings');

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to load bookings (${response.status})`);
  }

  return response.json();
};

export const createBooking = async (data) => {
  const response = await fetch('http://localhost:3000/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to create booking (${response.status})`);
  }
  return response;
};

// *Rooms*
export const getRooms = async () => {
  const response = await fetch('http://localhost:3000/api/rooms');
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to load rooms (${response.status})`);
  }
  return response.json();
};

export const getRoom = async (id) => {
  const response = await fetch(`http://localhost:3000/api/rooms/${id}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to load room (${response.status})`);
  }
  return response.json();
};

export const createRoom = async (data) => {
  const response = await fetch('http://localhost:3000/api/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to create room (${response.status})`);
  }
  return response;
};

export const updateRoom = async (id, data) => {
  const response = await fetch(`http://localhost:3000/api/rooms/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const deleteRoom = async (id) => {
  const response = await fetch(`http://localhost:3000/api/rooms/${id}`, {
    method: 'DELETE',
  });
  return response;
};

// *Room Type*
export const getRoomTypes = async () => {
  const response = await fetch('http://localhost:3000/api/roomtypes');
  return response.json();
};

export const getRoomTypeByRoomNumber = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/roomtypes?roomNumber=${id}`
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to load room type (${response.status})`);
  }
  return response.json();
};

export const createRoomType = async (data) => {
  const response = await fetch('http://localhost:3000/api/roomtypes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const updateRoomType = async (id, data) => {
  const response = await fetch(`http://localhost:3000/api/roomtypes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

// *Customer Type*
export const getCustomerTypes = async () => {
  const response = await fetch('http://localhost:3000/api/customertypes');
  return response.json();
};

export const createCustomerType = async (data) => {
  const response = await fetch('http://localhost:3000/api/customertypes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const updateCustomerType = async (id, data) => {
  const response = await fetch(
    `http://localhost:3000/api/customertypes/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  return response;
};

// *Invoices*
export const getInvoices = async () => {
  const response = await fetch('http://localhost:3000/api/invoices');
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to load invoices (${response.status})`);
  }
  return response.json();
};

export const getInvoice = async (id) => {
  const response = await fetch(`http://localhost:3000/api/invoices/${id}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to load invoice (${response.status})`);
  }
  return response.json();
};

export const createInvoice = async (data) => {
  const response = await fetch('http://localhost:3000/api/invoices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to create invoice (${response.status})`);
  }
  return response;
};

// *Booking Customer*
export const getCustomersByBookingId = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/bookingcustomers?bookingId=${id}`
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to load customers (${response.status})`);
  }
  return response.json();
};

// * Reports *
export const getReports = async () => {
  const response = await fetch('http://localhost:3000/api/reports');
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to load reports (${response.status})`);
  }
  return response.json();
};

export const getRevenue = async (month, year) => {
  const response = await fetch(
    `http://localhost:3000/api/reports/revenue?month=${month}&year=${year}`
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to load revenue report (${response.status})`);
  }
  return response.json();
};

export const getOccupancy = async (month, year) => {
  const response = await fetch(
    `http://localhost:3000/api/reports/occupancy?month=${month}&year=${year}`
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to load occupancy report (${response.status})`);
  }
  return response.json();
};
