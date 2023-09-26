import React, { useState, useEffect } from "react";
import "@/app/globals.css";
const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch("http://localhost:4242/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((err) => console.log(err));
    };

    const handleDelete = (userId) => {
        fetch(`http://localhost:4242/deleteUser/${userId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data);
                fetchUsers(); // Fetch users again after deletion to update the list
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.name} - {user.mail} - {user.birthdate}
                        <button onClick={() => handleDelete(user._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
