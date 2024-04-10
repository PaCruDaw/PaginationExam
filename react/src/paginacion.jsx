import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaginationExample = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const limit = 15; // Número de resultados por página
  const maxPagesToShow = 5; // Número máximo de páginas mostradas en los controles de paginación

  useEffect(() => {
    fetchData();
    fetchPageCount();
  }, [currentPage]); // Solo se ejecuta cuando currentPage cambia

  const fetchPageCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/registersTotals');
      const totalUsers = response.data.count;
      setPageCount(Math.ceil(totalUsers / limit));
    } catch (error) {
      console.error('Error fetching page count:', error);
    }
  };

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

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, pageCount - 1));
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(pageCount - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(pageCount - 1, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => handlePageClick(i)} className={currentPage === i ? 'active' : ''}>
          {i + 1}
        </button>
      );
    }
    return pages;
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
          <div className="pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 0}>
              Primera
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 0}>
              Anterior
            </button>
            {renderPageNumbers()}
            <button onClick={handleNextPage} disabled={currentPage === pageCount - 1}>
              Siguiente
            </button>
            <button onClick={handleLastPage} disabled={currentPage === pageCount - 1}>
              Última
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaginationExample;
