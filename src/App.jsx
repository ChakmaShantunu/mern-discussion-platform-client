import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AdminProfile = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [stats, setStats] = useState({ posts: 0, comments: 0, users: 0 });
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Replace with your admin email or get from auth context
  const adminEmail = 'admin@example.com';

  useEffect(() => {
    // Fetch admin info
    axios.get(`/api/users/${adminEmail}`)
      .then(res => setAdminInfo(res.data))
      .catch(console.error);

    // Fetch stats (posts, comments, users)
    axios.get('/api/admin/stats')
      .then(res => setStats(res.data))
      .catch(console.error);

    // Fetch existing tags
    fetchTags();

    setLoading(false);
  }, []);

  const fetchTags = () => {
    axios.get('/api/tags')
      .then(res => setTags(res.data))
      .catch(console.error);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!tagInput.trim()) return;

    axios.post('/api/tags', { tag: tagInput.trim() })
      .then(() => {
        setMessage(`Tag "${tagInput.trim()}" added!`);
        setTagInput('');
        fetchTags();
      })
      .catch(err => setMessage('Error adding tag'));
  };

  const data = [
    { name: 'Posts', value: stats.posts },
    { name: 'Comments', value: stats.comments },
    { name: 'Users', value: stats.users },
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex items-center gap-4">
        <img
          src={adminInfo?.photoURL || 'https://via.placeholder.com/100'}
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{adminInfo?.name || 'Admin Name'}</h2>
          <p className="text-gray-600">{adminInfo?.email || 'admin@example.com'}</p>
        </div>
      </div>

      <div className="my-6">
        <h3 className="text-xl font-semibold mb-2">Site Statistics</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Add New Tag</h3>
        <form onSubmit={handleAddTag} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Enter tag"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 flex-grow"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add
          </button>
        </form>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Existing Tags</h3>
        <ul className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <li
              key={tag._id}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {tag.tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminProfile;
