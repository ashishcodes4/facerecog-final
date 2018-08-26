import React from 'react';

const Users = ({ user }) => {
  return (
    <div>
      {user.array.forEach(element => {
        <div>
          <p>{element.name}</p>
          <p>{element.email}</p>
        </div>;
      })}
    </div>
  );
};

export default Users;
