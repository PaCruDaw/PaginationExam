import  { useState, useEffect } from 'react';
import axios from 'axios';

const PaginationExample = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 25; // Número de resultados por página

  useEffect(() => {
    fetchData();
  }, [offset]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/users?limit=${limit}&offset=${offset}`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    setOffset(offset - limit);
  };

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
          <button onClick={handlePrevPage} disabled={offset === 0}>Anterior</button>
          <button onClick={handleNextPage}>Siguiente</button>
        </div>
      )}
    </div>
  );
}

export default PaginationExample;