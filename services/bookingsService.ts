const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000';

export interface Booking {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  service: string;
  date: string;
  time: string;
  number_of_people: number;
  special_requests?: string;
  status: number; // 0: pending, 1: confirmed, 2: completed, 3: cancelled
  created_at: string;
  updated_at: string;
}

export interface CreateBookingData {
  full_name: string;
  email: string;
  phone_number: string;
  service: string;
  date: string;
  time: string;
  number_of_people: number;
  special_requests?: string;
}

export interface UpdateBookingData {
  full_name?: string;
  email?: string;
  phone_number?: string;
  service?: string;
  date?: string;
  time?: string;
  number_of_people?: number;
  special_requests?: string;
  status?: number;
}

class BookingsService {
  private baseUrl = `${API_URL}/admin/bookings`;

  // Fetch all bookings
  async getAllBookings(): Promise<Booking[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  // Fetch single booking by ID
  async getBookingById(id: number): Promise<Booking> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching booking ${id}:`, error);
      throw error;
    }
  }

  // Create new booking
  async createBooking(bookingData: CreateBookingData): Promise<Booking> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ booking: bookingData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  // Update existing booking
  async updateBooking(id: number, bookingData: UpdateBookingData): Promise<Booking> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ booking: bookingData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating booking ${id}:`, error);
      throw error;
    }
  }

  // Delete booking
  async deleteBooking(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting booking ${id}:`, error);
      throw error;
    }
  }

  // Update booking status
  async updateBookingStatus(id: number, status: number): Promise<Booking> {
    return this.updateBooking(id, { status });
  }
}

export default new BookingsService();
