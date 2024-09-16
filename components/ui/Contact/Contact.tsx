'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone_number: '',
    company: '',
    state_name: '',
  });
  const [contacts, setContacts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addContact = async () => {
    const { error } = await supabase.from('contacts').insert([
      {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        company: formData.company,
        state_name: formData.state_name,
      },
    ]);

    if (error) {
      console.error('Error inserting contact:', error);
    } else {
      console.log('Contact added successfully!');
      handleClose(); // Close modal after successful submission
      fetchContacts(); // Refresh the contact list
    }
  };

  const updateContact = async () => {
    const { error } = await supabase.from('contacts').update({
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      company: formData.company,
      state_name: formData.state_name,
    }).match({ id: formData.id });

    if (error) {
      console.error('Error updating contact:', error);
    } else {
      console.log('Contact updated successfully!');
      handleClose(); // Close modal after successful update
      fetchContacts(); // Refresh the contact list
      setIsEditing(false); // Reset editing state
    }
  };

  const deleteContact = async (id: string) => {
    const { error } = await supabase.from('contacts').delete().match({ id });

    if (error) {
      console.error('Error deleting contact:', error);
    } else {
      console.log('Contact deleted successfully!');
      fetchContacts(); // Refresh the contact list
    }
  };

  const fetchContacts = async () => {
    const { data, error } = await supabase.from('contacts').select('*');

    if (error) {
      console.error('Error fetching contacts:', error);
    } else {
      setContacts(data);
      console.log('Contacts fetched:', data);
    }
  };

  useEffect(() => {
    fetchContacts(); // Fetch contacts when the component mounts
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.state_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateContact();
    } else {
      addContact();
    }
  };

  const handleEdit = (contact: any) => {
    setFormData(contact);
    setIsEditing(true);
    handleOpen();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-black text-2xl mb-4 flex justify-center ">Contacts List</h1>
      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search for contacts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border text-black border-gray-300 rounded w-full"
        />
        <button
          onClick={() => {
            setIsEditing(false);
            handleOpen();
          }}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary"
        >
          + Add Contact
        </button>
      </div>

      {/* Contacts Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-pink-200">
              <th className="px-4 py-2 border border-pink-400 text-black">Name</th>
              <th className="px-4 py-2 border border-pink-400 text-black">Email</th>
              <th className="px-4 py-2 border border-pink-400 text-black">Phone</th>
              <th className="px-4 py-2 border border-pink-400 text-black">Company</th>
              <th className="px-4 py-2 border border-pink-400 text-black">State</th>
              <th className="px-4 py-2 border border-pink-400 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-pink-100">
                  <td className="border border-pink-300 px-4 py-2 text-black">{contact.name}</td>
                  <td className="border border-pink-300 px-4 py-2 text-black">{contact.email}</td>
                  <td className="border border-pink-300 px-4 py-2 text-black">{contact.phone_number}</td>
                  <td className="border border-pink-300 px-4 py-2 text-black">{contact.company}</td>
                  <td className="border border-pink-300 px-4 py-2 text-black">{contact.state_name}</td>
                  <td className="border border-pink-300 px-4 py-2 text-black flex space-x-2">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center text-gray-500">No contacts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal - Conditionally rendered */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">{isEditing ? 'Edit Contact' : 'Add Contact'}</h2>
              <button onClick={handleClose} className="text-gray-500">
                &#x2715;
              </button>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="id"
                value={formData.id}
              />
              <label className="block mb-2 text-black">
                Name:
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                />
              </label>

              <label className="block mb-2 text-black">
                Email:
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                />
              </label>

              <label className="block mb-2 text-black">
                Phone Number:
                <input
                  type="tel"
                  name="phone_number"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                />
              </label>

              <label className="block mb-2 text-black">
                Company:
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                />
              </label>

              <label className="block mb-2 text-black">
                State:
                <input
                  type="text"
                  name="state_name"
                  placeholder="State"
                  value={formData.state_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
                />
              </label>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {isEditing ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
