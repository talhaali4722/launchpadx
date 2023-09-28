import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import LanchpadCard from "../pages/LanchpadCard";

export default function UserLaunchpad({ items }) {
  /*   let userItem1 = [];
  
    let userItem2 = [];
    let userItem3 = [];
    let userItem4 = [];
    let userItem5 = [];
    let userItem6 = [];
    userlaunchpadDetails.forEach((item) => {
      if (parseInt(item?.startTime) === timerState[0]) {
        userItem1 = item;
      }
      if (parseInt(item?.startTime) === timerState[1]) {
        userItem2 = item;
      }
      if (parseInt(item?.startTime) === timerState[2]) {
        userItem3 = item;
      }
      if (parseInt(item?.startTime) === timerState[3]) {
        userItem4 = item;
      }
      if (parseInt(item?.startTime) === timerState[4]) {
        userItem5 = item;
      }
      if (parseInt(item?.startTime) === timerState[5]) {
        userItem6 = item;
      }
    });
  
    const userCardSet = new Set();
    userCardSet.add(userItem1);
    userCardSet.add(userItem2);
    userCardSet.add(userItem3);
    userCardSet.add(userItem4);
    userCardSet.add(userItem5);
    userCardSet.add(userItem6);
  
    const userCardArray = [];
  
    userCardSet.forEach((item) => {
      if (item.presaleAddress) {
        userCardArray.push(item);
      }
    }); */

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
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;

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
