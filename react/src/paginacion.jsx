import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const PaginationExample = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const limit = 15; // Número de resultados por página

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    async function fetchPageCount() {
      try {
        const response = await axios.get('http://localhost:8000/api/registersTotals');
        const totalUsers = response.data.count;
        setPageCount(Math.ceil(totalUsers / limit));
      } catch (error) {
        console.error('Error fetching page count:', error);
      }
    }
    fetchPageCount();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const offset = currentPage * limit;
      const response = await axios.get(`http://localhost:8000/api/users?limit=${limit}&offset=${offset}`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage); // Actualiza el estado de la página actual
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
        {pageCount > 0 && ( // Condición para renderizar React-Paginate solo si pageCount es mayor que 0
          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Siguiente'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'} // Aplica la clase 'pagination'
            activeClassName={'active'}
            forcePage={currentPage} // Asegura que la página activa refleje el estado actual
          />
        )}
      </div>
      )}
    </div>
  );
}

export default PaginationExample;
