import React, { useState } from 'react';

function App() {
  const [token, setToken] = useState('');
  const [projects, setProjects] = useState([]);

  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'john@example.com', password: '123456' }),
    });
    const data = await response.json();
    setToken(data.token);
  };

  const fetchProjects = async () => {
    const response = await fetch('http://localhost:5000/projects', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setProjects(data);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={fetchProjects}>Fetch Projects</button>
      <ul>
        {projects.map(p => (
          <li key={p.id}>{p.title} - {p.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
