import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '', secondName: '', lastName: '', phone: '+267', omang: '', pin: '', referredBy: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', form);
      alert(`Success! Share your link (optional): ${res.data.referralLink}`);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Error registering');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white text-black rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-botswana-blue mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="firstName" placeholder="First Name" required className="input" onChange={handleChange} />
        <input name="secondName" placeholder="Second Name (optional)" className="input" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" required className="input" onChange={handleChange} />
        <input name="phone" value={form.phone} required className="input" onChange={handleChange} />
        <input name="omang" placeholder="Omang (9 digits)" required className="input" onChange={handleChange} />
        <input name="pin" placeholder="4-Digit PIN" type="password" maxLength="4" required className="input" onChange={handleChange} />
        <input name="referredBy" placeholder="Referral Code (optional)" className="input" onChange={handleChange} />
        <button type="submit" className="w-full bg-botswana-blue text-white py-4 rounded-lg font-bold text-xl">Register</button>
      </form>
    </div>
  );
}