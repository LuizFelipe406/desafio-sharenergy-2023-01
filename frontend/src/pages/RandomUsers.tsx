import React, { useState, useEffect } from "react";
import { BsSearch, BsXCircle } from "react-icons/bs";
import SideBar from "../components/SideBar";
import UserCard from "../components/UserCard";
import IRandomUser from "../interfaces/IRandomUser";
import requestApi from "../utils/requestApi";

function RandomUsers() {
  const [totalData, setTotalData] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState("0");
  const [pages, setPages] = useState([0, 1, 2, 3, 4]);
  const [filterType, setFilterType] = useState("name");
  const [filterValue, setFilterValue] = useState("");
  const [filter, setFilter] = useState({ filterType: "", filterValue: "" });

  useEffect(() => {
    const request = async () => {
      if (filter.filterType.length === 0) {
        const {
          data: { results },
        } = await requestApi(
          "GET",
          `https://randomuser.me/api/?results=30&seed=abc&inc=name,email,login,dob,picture`,
          {}
        );
        setTotalData(results);
        setUsers(results);
      }
    };
    request();
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(users.length / 6);
    const newPages = [];
    for (let i = 0; i < totalPages; i += 1) {
      newPages.push(i);
    }
    setPages(newPages);
  }, [users]);

  useEffect(() => {
    const filteredResults = totalData.filter((user: IRandomUser) => {
      switch (filter.filterType) {
        case "name":
          return (
            user.name.first
              .toLowerCase()
              .includes(filter.filterValue.toLowerCase()) ||
            user.name.last
              .toLowerCase()
              .includes(filter.filterValue.toLowerCase())
          );
        case "email":
          return user.email.includes(filter.filterValue);
        case "username":
          return user.login.username
            .toLowerCase()
            .includes(filter.filterValue.toLowerCase());
      }
    });

    setUsers(filteredResults);
  }, [filter]);

  const PageChange = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { value } = currentTarget;
    setCurrentPage(value);
  };

  const handleRadioChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setFilterType(value);
  };

  const handleFilterChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setFilterValue(value);
  };

  const addFilter = () => {
    setFilter({ filterType, filterValue });
    setFilterType("name");
    setFilterValue("");
  };

  const removeFilter = () => {
    setFilter({ filterType: "name", filterValue: "" });
    setUsers(totalData);
  };

  return (
    <div className="bg-gradient-to-tr from-dcream to-cream w-screen h-screen font-plexSans">
      <SideBar />
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="mr-16 mb-2">
            <input
              className="mr-1 text-lg accent-golden"
              type="radio"
              value="name"
              name="gender"
              id="nameFilter"
              onChange={handleRadioChange}
              checked={filterType === "name"}
            />
            <label htmlFor="nameFilter" className="font-medium mr-4">
              Nome
            </label>
            <input
              className="mr-1 text-lg accent-golden"
              type="radio"
              value="email"
              name="gender"
              id="emailFilter"
              onChange={handleRadioChange}
              checked={filterType === "email"}
            />
            <label htmlFor="emailFilter" className="font-medium mr-4">
              Email
            </label>
            <input
              className="mr-1 text-lg accent-golden"
              type="radio"
              value="username"
              name="gender"
              id="usernameFilter"
              onChange={handleRadioChange}
              checked={filterType === "username"}
            />
            <label htmlFor="usernameFilter" className="font-medium">
              Usuário
            </label>
          </div>
          <div className="h-11 flex items-center justify-center mb-5 w-96">
            <input
              className="h-full px-4 w-full rounded-l-lg shadow-md focus:outline-none"
              type="text"
              value={filterValue}
              onChange={handleFilterChange}
            />
            <button
              type="button"
              onClick={addFilter}
              className="bg-golden h-full px-3 rounded-r-lg shadow-md mr-8"
            >
              {<BsSearch />}
            </button>
          </div>
          <button
              className="bg-red-400 font-medium rounded-md py-2 px-4 w-fit shadow-lg disabled:invisible mr-5"
              type="button"
              disabled={ filter.filterValue.length === 0}
              onClick={removeFilter}
            >
              {
                <div className="flex items-center justify-center transition duration-200">
                  <BsXCircle />
                  <span className="ml-2">{filter.filterValue}</span>
                </div>
              }
            </button>
        </div>
        <div className="grid grid-cols-2 h-3/5">
          {users
            .slice(0 + parseInt(currentPage) * 6, 6 + parseInt(currentPage) * 6)
            .map((user, index) => (
              <UserCard key={index} user={user} />
            ))}
        </div>

        <div>
          <nav className="flex items-center mt-10">
            {pages.map((page, index) => (
              <button
                className={`transition duration-200 bg-green mr-3 py-1 px-3 rounded-md text-${ parseInt(currentPage) === page ? 'golden' : 'white '}`}
                key={index}
                type="button"
                onClick={PageChange}
                value={page}
              >
                {page + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default RandomUsers;
