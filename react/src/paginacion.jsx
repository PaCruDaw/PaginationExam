import  { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const PaginationExample = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 10; // Definir el número de elementos por página

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users?page=${currentPage}`);
      setData(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div>
    <section>
      <ul>
        {data.map(item => (
            <p key={item.id} >
                {item.name}
            </p>
        ))}
      </ul>
    </section>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={Math.ceil(data.length / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName={'pagination flex space-x-2 items-center'}
        activeClassName={'active'}
        pageClassName={'text-black px-4 py-2 rounded-lg text-lg cursor-pointer'}
        breakClassName={'text-black px-4 py-2 rounded-lg text-lg'}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default PaginationExample;
