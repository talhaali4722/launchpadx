import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import LanchpadCard from "../pages/LanchpadCard";

export default function AllLaunchpad({ items, sort, total }) {
  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, index) => (
            <LanchpadCard item={item} key={index} />
          ))}
      </>
    );
  }
  function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);


    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(total / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % total;

      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        {items.length <= 1 ? (
          ""
        ) : (
          <div className="white-list-container not-white col-12">
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination d-flex justify-content-center mt-4 mb-3"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        )}
      </>
    );
  }
  
  return (
    <>
      <PaginatedItems itemsPerPage={12} />
      
    </>
  );
}
;