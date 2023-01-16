import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import UserCard from "../components/UserCard";
import IRandomUser from "../interfaces/IRandomUser";
import requestApi from "../utils/requestApi";

function RandomUsers() {
  const [totalData, setTotalData] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState("0");
  const [pages, setPages] = useState([0,1,2,3,4]);
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
    const totalPages = Math.ceil((users.length / 6));
    const newPages = [];
    for (let i = 0; i < totalPages; i += 1) {
      newPages.push(i);
    }
    setPages(newPages);
  }, [users])

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
    <div>
      <SideBar />
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div>
          <div>
            <input
              type="radio"
              value="name"
              name="gender"
              id="nameFilter"
              onChange={handleRadioChange}
              checked={filterType === "name"}
            />
            <label htmlFor="nameFilter">Nome</label>
            <input
              type="radio"
              value="email"
              name="gender"
              id="emailFilter"
              onChange={handleRadioChange}
              checked={filterType === "email"}
            />
            <label htmlFor="emailFilter">Email</label>
            <input
              type="radio"
              value="username"
              name="gender"
              id="usernameFilter"
              onChange={handleRadioChange}
              checked={filterType === "username"}
            />
            <label htmlFor="usernameFilter">Usuário</label>
          </div>
          <input
            type="text"
            value={filterValue}
            onChange={handleFilterChange}
          />
          <button type="button" onClick={addFilter}>
            pesquisar
          </button>
          <button type="button" onClick={removeFilter}>
            {filter.filterValue}
          </button>
        </div>
        <div>
          {users.slice(0 + (parseInt(currentPage) * 6),6 + (parseInt(currentPage) * 6)).map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            {pages.map((page, index) => (
              <button key={index} type="button" onClick={PageChange} value={ page }>
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
