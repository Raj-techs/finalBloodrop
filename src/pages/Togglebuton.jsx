import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../App.css'


const DonarToggle = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://json-server-api-vcou.onrender.com/users'); // Update with your API endpoint
      setData(response.data);
    };
    fetchData();
  }, []);

  const toggleDonar = async (item) => {
    const updatedDonar = item.donar === 'on' ? 'off' : 'on';

    await axios.put(`https://json-server-api-vcou.onrender.com/users/${item.id}`, {
      ...item,
      donar: updatedDonar,
    });

    setData((prevData) =>
      prevData.map((i) => (i.id === item.id ? { ...i, donar: updatedDonar } : i))
    );
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>User</th>
          <th>Donar</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.donar}</td>
            <td>
              <button className="btn" onClick={() => toggleDonar(item)}>
                {item.donar === 'on' ? 'Turn Off' : 'Turn On'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DonarToggle;
