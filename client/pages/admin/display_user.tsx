import React, { useEffect, useState } from "react";
import Link from "next/link";

const DisplayUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4242/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, [users]);

  return (
    <div>
        <h1 className="text-center text-2xl">Liste de tous les utilisateurs</h1>
        <Link className="border-2 border-red-500" href="/admin/create_user">
            Créer un utilisateur
        </Link>
        <div className="flex justify-center my-36">
            {users.map(user => (
                <div className="border border-black rounded-lg m-5 text-center" key={user._id}>
                    <div>
                    <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                    <p className="text-gray-600 text-sm mb-2">Mail: {user.mail}</p>
                    <p className="text-gray-600 text-sm mb-2">Birthdate: {user.birthdate}</p>
                    </div>
                    <Link
                    className="border-2 border-red-500"
                    href={{
                        pathname: "/admin/update_user",
                        query: { id: user._id },
                    }}
                    >
                    Modifier
                    </Link>
                </div>
            ))}
        </div>
    </div>
  );
};

export default DisplayUser;
