import React from "react";
import propTypes from 'prop-types';
import IRandomUser from "../interfaces/IRandomUser";

type UserCardProps = {
  user: IRandomUser
}

function UserCard({ user }: UserCardProps) {
  const {
    picture: { thumbnail },
    name: { first, last },
    email,
    login: { username },
    dob: { age },
  } = user;

  return (
    <div>
      <img src={ thumbnail } alt="user image" />
      <div>
        <h3>{ `${first} ${last}` }</h3>
        <span>{ username }</span>
        <span>{ email }</span>
        <span>{ age }</span>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: propTypes.shape({
    picture: propTypes.shape({
      thumbnail: propTypes.string,
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