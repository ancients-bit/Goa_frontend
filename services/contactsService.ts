const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000';

export interface Contact {
  id: number;
  full_name: string;
  email: string;
  phone_number?: string;
  organization?: string;
  subject?: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface CreateContactData {
  full_name: string;
  email: string;
  phone_number?: string;
  organization?: string;
  subject?: string;
  message: string;
}

export interface UpdateContactData {
  full_name?: string;
  email?: string;
  phone_number?: string;
  organization?: string;
  subject?: string;
  message?: string;
}

class ContactsService {
  private baseUrl = `${API_URL}/admin/contacts`;

  // Fetch all contacts
  async getAllContacts(): Promise<Contact[]> {
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
      console.error('Error fetching contacts:', error);
      throw error;
    }
  }

  // Fetch single contact by ID
  async getContactById(id: number): Promise<Contact> {
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
      console.error(`Error fetching contact ${id}:`, error);
      throw error;
    }
  }

  // Create new contact
  async createContact(contactData: CreateContactData): Promise<Contact> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact: contactData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  // Update existing contact
  async updateContact(id: number, contactData: UpdateContactData): Promise<Contact> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact: contactData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating contact ${id}:`, error);
      throw error;
    }
  }

  // Delete contact
  async deleteContact(id: number): Promise<void> {
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
      console.error(`Error deleting contact ${id}:`, error);
      throw error;
    }
  }
}

export default new ContactsService();
