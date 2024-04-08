import  { useState, useEffect } from 'react';
import axios from 'axios';

const PaginationExample = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20; // Número de resultados por página

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
console.log(offset)
  const handlePrevPage = () => {
    if (offset >= limit) { // Asegura que el offset no sea menor que 0
      setOffset(offset - limit);
    }
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
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handlePrevPage} disabled={offset === 0}>Anterior</button>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
      )}
    </div>
  );
}

export default PaginationExample;
