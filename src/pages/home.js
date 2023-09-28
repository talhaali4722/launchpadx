import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { DropdownButton } from "react-bootstrap";
import { useHomeSlice } from "./store/useStore";
import UserLaunchpad from "../components/UserLaunchpads";
import AllLaunchpad from "../components/AllLaunchpad";
import {
  GET_ALL_LAUNCHPADS,
  GET_ALL_LAUNCHPADS_SOFTCAP,
  GET_ALL_OWNER_LAUNCHPADS,
  GET_ALL_LAUNCHPAD_DETAILS,
} from "./Graphql/Queries";
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import Loader from "../components/loader";
import HomeLoader from "../components/HomeLoader";
// import Pagination from "react-custom-pagination";
import Pagination from "react-js-pagination";
import LanchpadCard from "./LanchpadCard";
function Home() {
  const walletData = useSelector((state) => state.wallet);
  const [softData, setSoftData] = useState([]);
  const [cat, setCat] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dropdownText, setDropdownText] = useState("Filter By");
  const [lauchpadLength, setLauchpadLength] = useState();
  const [userLaunchpadLength, setUserLaunchpadLength] = useState();
  const [dropdownText1, setDropdownText1] = useState("Sort By");
  const [timerState, setTimerState] = useState([]);
  const [loader, setLoader] = useState(false);

  const [sort, setSort] = useState("");
  const [ownerSort, setOwnerSort] = useState("");

  const [filter, setFilter] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [ownerFilterState, setOwnerFilterState] = useState("");
  const [filterSearchState, setFilterSearchState] = useState("");
  const [ownerFilterSearchState, setOwnerFilterSearchState] = useState("");
  const [searchStatus, setSearchStatus] = useState(true);
  const [ownerSearch, setOwnerSearch] = useState("");
  const [searchData, setSearchData] = useState();
  const [all, setAll] = useState([]);

  const [sortState, setSortState] = useState();
  const [filterState, setFilterState] = useState("");
  const [search, setSearch] = useState("");

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const [currentPage, setCurrentPage] = useState(1);
  const [launchpadsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentLaunchpads, setCurrentLaunchpads] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [activePage, setActivePage] = useState();

  const [postsPerPage] = useState(15);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // const indexOfLastLaunchpad = currentPage * launchpadsPerPage;
  // const indexOfFirstLaunchpad = indexOfLastLaunchpad - launchpadsPerPage;
  // const currentPosts = data.slice(indexOfFirstLaunchpad, indexOfLastLaunchpad);

  const [
    getAll,
    { error: finalError, loading: finalLoading, data: finalData },
  ] = useLazyQuery(GET_ALL_LAUNCHPAD_DETAILS, {
    fetchPolicy: "network-only",
    variables: {
      filter: {
        page: 0,
        limit: 15,
      },
    },
  });

  const [
    getAllOwnerLaunchpads,
    { error: ownerError, loading: ownerLoading, data: ownerData },
  ] = useLazyQuery(GET_ALL_OWNER_LAUNCHPADS, {
    fetchPolicy: "network-only",
    variables: {
      filter: {
        launcher: walletData?.account,
      },
    },
  });

  // const currentPosts = finalData && finalData.GetAllLaunchpads.items.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    getAll();

    if (finalLoading) {
      setLoader(true);
    }
    if (finalError) {
      setLoader(true);
    }
    if (finalData) {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    getAllOwnerLaunchpads();

    if (ownerLoading) {
      setLoader(true);
    }
    if (ownerError) {
      setLoader(true);
    }
    if (ownerData) {
      setLoader(false);
    }
  }, []);

  const sortQuery = (number) => {
    if (sort == 0) {
      getAll({
        variables: {
          filter: {
            page: number,
            limit: 15,
          },
          sort: {
            hardCap: 1,
          },
        },
      });
    }
    if (sort == 1) {
      getAll({
        variables: {
          filter: {
            page: number,
            limit: 15,
          },
          sort: {
            softCap: 1,
          },
        },
      });
    }
    if (sort == 2) {
      getAll({
        variables: {
          filter: {
            page: number,
            limit: 15,
          },
          sort: {
            liquidityPercentage: 1,
          },
        },
      });
    }
    if (sort == 3) {
      getAll({
        variables: {
          filter: {
            page: number,
            limit: 15,
          },
          sort: {
            startTime: 1,
          },
        },
      });
    }
    if (sort == 4) {
      getAll({
        variables: {
          filter: {
            page: number,
            limit: 15,
          },
          sort: {
            endTime: 1,
          },
        },
      });
    }
  };

  const sortAndFilterQuery = (number) => {
    if (sort == 0) {
      getAll({
        variables: {
          filter: {
            page: number,
            limit: 15,
            filterStatus: filter,
          },
          sort: {
            hardCap: 1,
          },
        },
      });
    }
    if (sort == 1) {
      getAll({
        variables: {
          filter: {
            page: number,
            limit: 15,
            filterStatus: filter,
          },
          sort: {
            softCap: 1,
          },
        },
      });
    }
    if (sort == 2) {
      getAll({
        variables: {
          filter: {
            page: number,
            limit: 15,
            filterStatus: filter,
          },
          sort: {
            liquidityPercentage: 1,
          },
        },
      });
    }
    if (sort == 3) {
      getAll({
        variables: {
          filter: {
            page: number,
            limit: 15,
            filterStatus: filter,
          },
          sort: {
            startTime: 1,
          },
        },
      });
    }
    if (sort == 4) {
      getAll({
        variables: {
          filter: {
            page: number,
            limit: 15,
            filterStatus: filter,
          },
          sort: {
            endTime: 1,
          },
        },
      });
    }
  };

  const handlePageChange = (number) => {
    if (!search) {
      if (!sort && !filter) {
        getAll({
          variables: {
            filter: {
              page: number,
              limit: 15,
            },
          },
        });
      } else if (sort && !filter) {
        sortQuery(number);
      } else if (filter && !sort) {
        getAll({
          variables: {
            filter: {
              page: number,
              limit: 15,
              filterStatus: filter,
            },
          },
        });
      } else {
        sortAndFilterQuery(number);
      }
    } else {
      getAll({
        variables: {
          filter: {
            page: number,
            limit: 15,
            filterStatus: filter,
            search: search,
          },
        },
      });
    }

    setActivePage(number);
  };

  const [show, { loading: loadingSoft, error: errorSoft, data: dataSoft }] =
    useLazyQuery(GET_ALL_LAUNCHPADS_SOFTCAP, {
      fetchPolicy: "no-cache",
      partialRefetch: true,
      returnPartialData: true,
      onCompleted: (dataSoft) => {
        setSoftData(dataSoft);
      },
    });

  const [
    showSearch,
    { loading: loadingSearch, error: errorSearch, data: dataSearch },
  ] = useLazyQuery(GET_ALL_LAUNCHPADS_SOFTCAP, {
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
    onCompleted: (dataSearch) => setSearchData(dataSearch),
  });

  useEffect(() => {
    if (loadingSearch) {
      setSearchStatus(true);
    }
    if (errorSearch) {
      setSearchStatus(true);
    }
    if (dataSearch) {
      setSearchStatus(false);
      setSearchData(dataSearch);
    }
  }, [dataSearch]);

  const [
    showOwner,
    { loading: loadingOwner, error: errorOwner, data: dataOwner },
  ] = useLazyQuery(GET_ALL_OWNER_LAUNCHPADS, {});

  const {
    loading: loadingOwnerAll,
    error: errorOwnerAll,
    data: dataOwnerAll,
  } = useQuery(GET_ALL_OWNER_LAUNCHPADS, {
    // pollInterval: "5000",
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
    variables: {
      filterr: {
        launcher: window.ethereum ? walletData.account : "",
      },
    },
  });

  const [
    showOwnerSearch,
    {
      loading: loadingOwnerSearch,
      error: errorOwnerSearch,
      data: dataOwnerSearch,
    },
  ] = useLazyQuery(GET_ALL_OWNER_LAUNCHPADS, {
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
  });

  const {
    loading,
    error,
    data: dataAll,
  } = useQuery(GET_ALL_LAUNCHPADS, {
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
  });

  const [ownerLoader, setOwnerLoader] = useState(false);

  // const {
  //   loading: loadingOwner,
  //   error: errorOwner,
  //   data: dataOwner,
  // } = useLazyQuery(GET_ALL_OWNER_LAUNCHPADS, {
  //   pollInterval: 500,

  //   variables: {
  //     filterr: {
  //       launcher: window.ethereum.selectedAddress,
  //     },
  //   },
  // });
  const [isInterval, setIsInterval] = useState(false);

  const { selectedIndex, setSelectedIndex } = useHomeSlice((state) => ({
    selectedIndex: state.selectedIndex,
    setSelectedIndex: state.setSelectedIndex,
  }));

  //handle owner sort
  const handleOwnerSort = (e) => {
    setOwnerSort(e);
    setDropdownText1(
      e === "0"
        ? "HardCap"
        : e === "1"
        ? "SoftCap"
        : e === "2"
        ? "LP Percent"
        : e === "3"
        ? "Start Time"
        : e === "4"
        ? "End Time"
        : ""
    );

    if (ownerSearch && !ownerFilter) {
      if (e == 0) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,
              search: ownerSearch,
            },
            sort: {
              hardCap: 1,
            },
          },
        });
      }
      if (e == 1) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              search: ownerSearch,
            },
            sort: {
              softCap: 1,
            },
          },
        });
      }
      if (e == 2) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              search: ownerSearch,
            },
            sort: {
              liquidityPercentage: 1,
            },
          },
        });
      }
      if (e == 3) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              search: ownerSearch,
            },
            sort: {
              startTime: 1,
            },
          },
        });
      }
      if (e == 4) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              search: ownerSearch,
            },
            sort: {
              endTime: 1,
            },
          },
        });
      }
    } else if (ownerSearch && ownerFilter) {
      if (e == 0) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,
              search: ownerSearch,

              filterStatus: ownerFilter,
            },
            sort: {
              hardCap: 1,
            },
          },
        });
      }
      if (e == 1) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              search: ownerSearch,
              filterStatus: ownerFilter,
            },
            sort: {
              softCap: 1,
            },
          },
        });
      }
      if (e == 2) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              search: ownerSearch,
              launcher: walletData?.account,

              filterStatus: ownerFilter,
            },
            sort: {
              liquidityPercentage: 1,
            },
          },
        });
      }
      if (e == 3) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              search: ownerSearch,
              filterStatus: ownerFilter,
            },
            sort: {
              startTime: 1,
            },
          },
        });
      }
      if (e == 4) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              search: ownerSearch,
              filterStatus: ownerFilter,
            },
            sort: {
              endTime: 1,
            },
          },
        });
      }
    } else if (ownerFilter) {
      if (e == 0) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              filterStatus: ownerFilter,
            },
            sort: {
              hardCap: 1,
            },
          },
        });
      }
      if (e == 1) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              filterStatus: ownerFilter,
            },
            sort: {
              softCap: 1,
            },
          },
        });
      }
      if (e == 2) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              filterStatus: ownerFilter,
            },
            sort: {
              liquidityPercentage: 1,
            },
          },
        });
      }
      if (e == 3) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              filterStatus: ownerFilter,
            },
            sort: {
              startTime: 1,
            },
          },
        });
      }
      if (e == 4) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              filterStatus: ownerFilter,
            },
            sort: {
              endTime: 1,
            },
          },
        });
      }
    }
  };

  //handle owner filter
  const handleOwnerSelect = (e) => {
    setOwnerFilter(e);

    if (!ownerSort && !ownerSearch) {
      getAllOwnerLaunchpads({
        variables: {
          filter: {
            launcher: walletData?.account,
            filterStatus: e,
          },
        },
      });
    } else if (sort) {
      if (sort == 0) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              filterStatus: e,
            },
            sort: {
              hardCap: 1,
            },
          },
        });
      }
      if (sort == 1) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              filterStatus: e,
            },
            sort: {
              softCap: 1,
            },
          },
        });
      }
      if (sort == 2) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              filterStatus: e,
            },
            sort: {
              liquidityPercentage: 1,
            },
          },
        });
      }
      if (sort == 3) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              filterStatus: e,
            },
            sort: {
              startTime: 1,
            },
          },
        });
      }
      if (sort == 4) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              filterStatus: e,
            },
            sort: {
              endTime: 1,
            },
          },
        });
      }
    } else if (search) {
      getAllOwnerLaunchpads({
        variables: {
          filter: {
            launcher: walletData?.account,

            filterStatus: e,
            search: search,
          },
        },
      });
    }

    setDropdownText(
      e === "0"
        ? "Upcoming"
        : e === "1"
        ? "Inprogress"
        : e === "2"
        ? "Filled"
        : e === "3"
        ? "Ended"
        : e === "4"
        ? "Cancelled"
        : e === "5"
        ? "Expired"
        : e === ""
        ? "All Status"
        : ""
    );
  };

  const setSelectedIndexfun = (e) => {
    setSelectedIndex(e);
    setDataLoaded(false);
  };

  //All Contributions Handle Filter
  const handleSelect = (e) => {
    setFilter(e);
    if (!sort && !search) {
      getAll({
        variables: {
          filter: {
            filterStatus: e,
          },
        },
      });
    } else if (sort) {
      if (sort == 0) {
        getAll({
          variables: {
            filter: {
              filterStatus: e,
            },
            sort: {
              hardCap: 1,
            },
          },
        });
      }
      if (sort == 1) {
        getAll({
          variables: {
            filter: {
              filterStatus: e,
            },
            sort: {
              softCap: 1,
            },
          },
        });
      }
      if (sort == 2) {
        getAll({
          variables: {
            filter: {
              filterStatus: e,
            },
            sort: {
              liquidityPercentage: 1,
            },
          },
        });
      }
      if (sort == 3) {
        getAll({
          variables: {
            filter: {
              filterStatus: e,
            },
            sort: {
              startTime: 1,
            },
          },
        });
      }
      if (sort == 4) {
        getAll({
          variables: {
            filter: {
              filterStatus: e,
            },
            sort: {
              endTime: 1,
            },
          },
        });
      }
    } else if (search) {
      getAll({
        variables: {
          filter: {
            filterStatus: e,
            search: search,
          },
        },
      });
    }
    setDropdownText(
      e === "0"
        ? "Upcoming"
        : e === "1"
        ? "Inprogress"
        : e === "2"
        ? "Filled"
        : e === "3"
        ? "Ended"
        : e === "4"
        ? "Cancelled"
        : e === "5"
        ? "Expired"
        : e === ""
        ? "All Status"
        : ""
    );
  };

  //All Contributions Handle Sort
  const handleSelect1 = (e) => {
    setSort(e);
    if (search && !filter) {
      if (e == 0) {
        getAll({
          variables: {
            filter: {
              search: search,
            },
            sort: {
              hardCap: 1,
            },
          },
        });
      }
      if (e == 1) {
        getAll({
          variables: {
            filter: {
              search: search,
            },
            sort: {
              softCap: 1,
            },
          },
        });
      }
      if (e == 2) {
        getAll({
          variables: {
            filter: {
              search: search,
            },
            sort: {
              liquidityPercentage: 1,
            },
          },
        });
      }
      if (e == 3) {
        getAll({
          variables: {
            filter: {
              search: search,
            },
            sort: {
              startTime: 1,
            },
          },
        });
      }
      if (e == 4) {
        getAll({
          variables: {
            filter: {
              search: search,
            },
            sort: {
              endTime: 1,
            },
          },
        });
      }
    } else if (search && filter) {
      if (e == 0) {
        getAll({
          variables: {
            filter: {
              filterStatus: filter,
            },
            sort: {
              hardCap: 1,
            },
          },
        });
      }
      if (e == 1) {
        getAll({
          variables: {
            filter: {
              search: search,
              filterStatus: filter,
            },
            sort: {
              softCap: 1,
            },
          },
        });
      }
      if (e == 2) {
        getAll({
          variables: {
            filter: {
              search: search,
              filterStatus: filter,
            },
            sort: {
              liquidityPercentage: 1,
            },
          },
        });
      }
      if (e == 3) {
        getAll({
          variables: {
            filter: {
              search: search,
              filterStatus: filter,
            },
            sort: {
              startTime: 1,
            },
          },
        });
      }
      if (e == 4) {
        getAll({
          variables: {
            filter: {
              search: search,
              filterStatus: filter,
            },
            sort: {
              endTime: 1,
            },
          },
        });
      }
    } else if (filter) {
      if (e == 0) {
        getAll({
          variables: {
            filter: {
              filterStatus: filter,
            },
            sort: {
              hardCap: 1,
            },
          },
        });
      }
      if (e == 1) {
        getAll({
          variables: {
            filter: {
              filterStatus: filter,
            },
            sort: {
              softCap: 1,
            },
          },
        });
      }
      if (e == 2) {
        getAll({
          variables: {
            filter: {
              filterStatus: filter,
            },
            sort: {
              liquidityPercentage: 1,
            },
          },
        });
      }
      if (e == 3) {
        getAll({
          variables: {
            filter: {
              filterStatus: filter,
            },
            sort: {
              startTime: 1,
            },
          },
        });
      }
      if (e == 4) {
        getAll({
          variables: {
            filter: {
              filterStatus: filter,
            },
            sort: {
              endTime: 1,
            },
          },
        });
      }
    }

    setDropdownText1(
      e === "0"
        ? "HardCap"
        : e === "1"
        ? "SoftCap"
        : e === "2"
        ? "LP Percent"
        : e === "3"
        ? "Start Time"
        : e === "4"
        ? "End Time"
        : ""
    );
  };

  //All Contribution handle  Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    let value = e.target.value;
    if (!sort && !filter) {
      getAll({
        variables: {
          filter: {
            search: value,
          },
        },
      });
    } else if (sort) {
      if (sort == 0) {
        getAll({
          variables: {
            filter: {
              search: value,
            },
            sort: {
              hardCap: 1,
            },
          },
        });
      }
      if (sort == 1) {
        getAll({
          variables: {
            filter: {
              search: value,
            },
            sort: {
              softCap: 1,
            },
          },
        });
      }
      if (sort == 2) {
        getAll({
          variables: {
            filter: {
              search: value,
            },
            sort: {
              liquidityPercentage: 1,
            },
          },
        });
      }
      if (sort == 3) {
        getAll({
          variables: {
            filter: {
              search: value,
            },
            sort: {
              startTime: 1,
            },
          },
        });
      }
      if (sort == 4) {
        getAll({
          variables: {
            filter: {
              search: value,
            },
            sort: {
              endTime: 1,
            },
          },
        });
      }
    } else if (filter) {
      getAll({
        variables: {
          filter: {
            filterStatus: filter,
            search: value,
          },
        },
      });
    } else {
      getAll({
        variables: {
          filter: {
            filterStatus: filter,
            search: value,
          },
          sort: {
            liquidityPercentage: 1,
          },
        },
      });
    }
  };

  //Handle Owner Search
  const handleOwnerSearch = (e) => {
    setOwnerSearch(e.target.value);
    let value = e.target.value;
    if (!ownerSort && !ownerFilter) {
      getAllOwnerLaunchpads({
        variables: {
          filter: {
            launcher: walletData?.account,
            search: value,
          },
        },
      });
    } else if (ownerSort && !ownerFilter) {
      if (ownerSort == 0) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,
              search: value,
            },
            sort: {
              hardCap: 1,
            },
          },
        });
      }
      if (ownerSort == 1) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              search: value,
            },
            sort: {
              softCap: 1,
            },
          },
        });
      }
      if (ownerSort == 2) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              search: value,
            },
            sort: {
              liquidityPercentage: 1,
            },
          },
        });
      }
      if (ownerSort == 3) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              search: value,
            },
            sort: {
              startTime: 1,
            },
          },
        });
      }
      if (ownerSort == 4) {
        getAllOwnerLaunchpads({
          variables: {
            filter: {
              launcher: walletData?.account,

              search: value,
            },
            sort: {
              endTime: 1,
            },
          },
        });
      }
    } else if (ownerFilter && !ownerSearch) {
      getAllOwnerLaunchpads({
        variables: {
          filter: {
            launcher: walletData?.account,

            filterStatus: ownerFilter,
            search: value,
          },
        },
      });
    } else if (ownerSearch && ownerFilter) {
      getAllOwnerLaunchpads({
        variables: {
          filter: {
            launcher: walletData?.account,
            filterStatus: ownerFilter,
            search: value,
          },
          sort: {
            liquidityPercentage: 1,
          },
        },
      });
    }
  };

  const runthis = () => {
    getAll({
      variables: {
        filter: {
          search: search,
        },
      },
    });
  };

  const runthis1 = () => {
    if (loadingOwnerSearch) {
    }
    if (errorOwnerSearch) {
    }
    if (dataOwnerSearch) {
    }

    showOwnerSearch({
      variables: {
        filterr: {
          search: ownerSearch,
          launcher: walletData.account.toLowerCase(),
        },
      },
    });
  };

  return (
    <>
      <div className="main">
        <div className="main-inner">
          <div className="container-fluid dashboard-container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <h1>Current Presales</h1>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <Tabs
                  defaultActiveKey="launchpads"
                  id="controlled-tab-example"
                  activeKey={selectedIndex}
                  className="mb-3"
                  onSelect={(e) => setSelectedIndexfun(e)}
                >
                  <Tab eventKey="launchpads" title="All Launchpads">
                    <div className="row">
                      <div className="col-xl-5 col-lg-6 col-md-6 offset-xl-1">
                        <div className="space-20"></div>
                        <div
                          className="search-panel"
                          style={{ position: "relative", marginTop: "20px" }}
                        >
                          <Form.Control
                            type="text"
                            autoComplete="off"
                            className="home-input"
                            id="token-symbol"
                            onKeyDown={(e) =>
                              e.keyCode === 13 ? runthis() : ""
                            }
                            onChange={(e) => handleSearch(e)}
                            value={search}
                            aria-describedby="Token Symbol"
                            placeholder="Enter token name or token symbol"
                          />{" "}
                          <IconContext.Provider
                            value={{
                              className: "social-media-icon",

                              style: {
                                fontSize: "20px",
                                cursor: "pointer",
                                verticalAlign: "center",
                                color: "white",
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                              },
                            }}
                          >
                            <BsSearch onClick={runthis} />
                          </IconContext.Provider>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-xl-5">
                        <div className="row">
                          <div className="space-20"></div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <label>Filter By</label>
                            <DropdownButton
                              onSelect={handleSelect}
                              id="dropdown-menu-align-right"
                              title={dropdownText}
                              className="mb-3"
                            >
                              <Dropdown.Item eventKey="">
                                All status
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="0">
                                Upcoming
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="1">
                                Inprogress
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="2">Filled</Dropdown.Item>
                              <Dropdown.Item eventKey="3">Ended</Dropdown.Item>
                              <Dropdown.Item eventKey="4">
                                Cancelled
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="5">
                                Expired
                              </Dropdown.Item>
                            </DropdownButton>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <label>Sort By</label>
                            <DropdownButton
                              onSelect={handleSelect1}
                              id="dropdown-menu-align-right"
                              title={dropdownText1}
                            >
                              <Dropdown.Item
                                onClick={() => {
                                  getAll({
                                    variables: {
                                      sort: {
                                        hardCap: 1,
                                      },
                                    },
                                  });
                                }}
                                eventKey="0"
                              >
                                HardCap
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  getAll({
                                    variables: {
                                      sort: {
                                        softCap: 1,
                                      },
                                    },
                                  });
                                }}
                                eventKey="1"
                              >
                                SoftCap
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  getAll({
                                    variables: {
                                      sort: {
                                        liquidityPercentage: 1,
                                      },
                                    },
                                  });
                                }}
                                eventKey="2"
                              >
                                LP Percent
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  getAll({
                                    variables: {
                                      sort: {
                                        startTime: 1,
                                      },
                                    },
                                  });
                                }}
                                eventKey="3"
                              >
                                Start Time
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  getAll({
                                    variables: {
                                      sort: {
                                        endTime: 1,
                                      },
                                    },
                                  });
                                }}
                                eventKey="4"
                              >
                                End Time
                              </Dropdown.Item>
                            </DropdownButton>
                          </div>
                        </div>
                      </div>
                      <div className="space-40"></div>

                      {finalData && finalData.GetAllLaunchpads.items ? (
                        finalData.GetAllLaunchpads.items.length > 0 ? (
                          finalData.GetAllLaunchpads.items.map(
                            (item, index) => {
                              return <LanchpadCard item={item} key={index} />;
                            }
                          )
                        ) : (
                          <div className="reload-warning-div container">
                            <p className="reload-warning-text">
                              No Record Found
                            </p>
                          </div>
                        )
                      ) : (
                        <HomeLoader />
                      )}

                      {
                        <div className="white-list-container not-white col-12">
                          {finalData &&
                            finalData.GetAllLaunchpads.items.length > 0 &&
                            finalData.GetAllLaunchpads.items && (
                              <Pagination
                                activePage={activePage}
                                itemsCountPerPage={15}
                                totalItemsCount={
                                  finalData.GetAllLaunchpads.total
                                    ? finalData.GetAllLaunchpads.total
                                    : finalData.GetAllLaunchpads.items.length
                                }
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                              />
                            )}
                        </div>
                      }
                    </div>
                  </Tab>
                  <Tab eventKey="contributions" title="My Contributions">
                    <div className="row">
                      <div className="col-lg-5 col-md-6 offset-lg-1">
                        <div className="space-20"></div>
                        <div
                          className="search-panel"
                          style={{ position: "relative", marginTop: "20px" }}
                        >
                          <Form.Control
                            type="text"
                            autoComplete="off"
                            id="token-symbol"
                            aria-describedby="Token Symbol"
                            placeholder="Enter token name or token symbol"
                            onKeyDown={(e) =>
                              e.keyCode === 13 ? runthis1() : ""
                            }
                            onChange={(e) => handleOwnerSearch(e)}
                            value={ownerSearch}
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-4">
                        <div className="row">
                          <div className="space-20"></div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <label>Filter By</label>
                            <DropdownButton
                              onSelect={handleOwnerSelect}
                              id="dropdown-menu-align-right"
                              title={dropdownText}
                            >
                              <Dropdown.Item eventKey="">
                                All status
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="0">
                                Upcoming
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="1">
                                Inprogress
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="2">Filled</Dropdown.Item>
                              <Dropdown.Item eventKey="3">Ended</Dropdown.Item>
                              <Dropdown.Item eventKey="4">
                                Cancelled
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="5">
                                Expired
                              </Dropdown.Item>
                            </DropdownButton>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <label>Sort By</label>
                            <DropdownButton
                              onSelect={handleOwnerSort}
                              id="dropdown-menu-align-right"
                              title={dropdownText1}
                            >
                              <Dropdown.Item
                                onClick={() => {
                                  getAllOwnerLaunchpads({
                                    variables: {
                                      sort: {
                                        hardCap: 1,
                                      },
                                    },
                                  });
                                }}
                                eventKey="0"
                              >
                                HardCap
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  getAllOwnerLaunchpads({
                                    variables: {
                                      sort: {
                                        softCap: 1,
                                      },
                                    },
                                  });
                                }}
                                eventKey="1"
                              >
                                SoftCap
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  getAllOwnerLaunchpads({
                                    variables: {
                                      sort: {
                                        liquidityPercentage: 1,
                                      },
                                    },
                                  });
                                }}
                                eventKey="2"
                              >
                                LP Percent
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  getAllOwnerLaunchpads({
                                    variables: {
                                      sort: {
                                        startTime: 1,
                                      },
                                    },
                                  });
                                }}
                                eventKey="3"
                              >
                                Start Time
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  getAllOwnerLaunchpads({
                                    variables: {
                                      sort: {
                                        endTime: 1,
                                      },
                                    },
                                  });
                                }}
                                eventKey="4"
                              >
                                End Time
                              </Dropdown.Item>
                            </DropdownButton>
                          </div>
                        </div>
                      </div>
                      <div className="space-40"></div>

                      {walletData.account ? (
                        ownerData && ownerData.GetOwnerLaunchpad.items ? (
                          ownerData.GetOwnerLaunchpad.items.length > 0 ? (
                            ownerData.GetOwnerLaunchpad.items.map(
                              (item, index) => {
                                return <LanchpadCard item={item} key={index} />;
                              }
                            )
                          ) : (
                            <div className="reload-warning-div container">
                              <p className="reload-warning-text">
                                No Record Found
                              </p>
                            </div>
                          )
                        ) : (
                          <HomeLoader />
                        )
                      ) : (
                        <div className="reload-warning-div container">
                          <p className="reload-warning-text">
                            Please Connect Metamask{" "}
                          </p>
                        </div>
                      )}

                      {
                        <div className="white-list-container not-white col-12">
                          {ownerData &&
                            ownerData.GetOwnerLaunchpad.items.length > 0 &&
                            ownerData.GetOwnerLaunchpad.items && (
                              <Pagination
                                activePage={activePage}
                                itemsCountPerPage={15}
                                totalItemsCount={
                                  ownerData.GetOwnerLaunchpad.total
                                    ? ownerData.GetOwnerLaunchpad.total
                                    : ownerData.GetOwnerLaunchpad.items.length
                                }
                                pageRangeDisplayed={5}
                                onChange={handlePageChange}
                              />
                            )}
                        </div>
                      }
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
