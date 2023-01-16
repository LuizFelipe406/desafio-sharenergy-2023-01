import React from "react";
import propTypes from 'prop-types';
import IRandomUser from "../interfaces/IRandomUser";

type UserCardProps = {
  user: IRandomUser
}

function UserCard({ user }: UserCardProps) {
  const {
    picture: { large },
    name: { first, last },
    email,
    login: { username },
    dob: { age },
  } = user;

  return (
    <div className="flex">
      <img className="rounded-full mr-10" src={ large } alt="user image" />
      <div>
        <h3 className="my-5 text-green font-bold">{ `${first.toUpperCase()} ${last.toUpperCase()}, ${age}` }</h3>
        <div className="border-t-2 border-gray-300 pt-3 font-medium">
          <span className="mr-5 text-green ">{ username }</span>
          <span>{ email }</span>
        </div>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: propTypes.shape({
    picture: propTypes.shape({
      large: propTypes.string,
    }),
    name: propTypes.shape({
      first: propTypes.string,
      last: propTypes.string
    }),
    email: propTypes.string,
    login: propTypes.shape({
      username: propTypes.string,
    }),
    dob: propTypes.shape({
      age: propTypes.number
    }),
  }).isRequired,
};

export default UserCard;