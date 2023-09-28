import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import ReactPaginate from "react-paginate";

function Items({
  currentItems,
  whiteListAddresses2,
  removeWhiteListing,
  setIsWhitelisting,
  isWhitelisting,
}) {
  return (
    <>
      <ListGroup className="whitelist-list">
        {currentItems?.map((whiteAddress, index) => (
          <ListGroup.Item
            className="whitelist-list-item d-flex justify-content-between"
            key={index}
          >
            <span>
              <span className="list-index">
                {whiteListAddresses2.indexOf(whiteAddress) + 1}
              </span>{" "}
              <span>{whiteAddress}</span>
            </span>{" "}
            <span
              onClick={(e) => removeWhiteListing(whiteAddress)}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faXmark} size={"lg"} />
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

function PaginatedItems({
  itemsPerPage,
  whiteListAddresses,
  removeWhiteListing,
  setIsWhitelisting,
  isWhitelisting,
}) {
  const items = whiteListAddresses;
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    let remainder = items.length % itemsPerPage;
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      <Items
        currentItems={currentItems}
        whiteListAddresses2={whiteListAddresses}
        removeWhiteListing={removeWhiteListing}
        isWhitelisting={isWhitelisting}
        setIsWhitelisting={setIsWhitelisting}
      />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={12}
        marginPagesDisplayed={1}
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
    </>
  );
}
export default PaginatedItems;
