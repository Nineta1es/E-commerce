import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import 'tailwindcss/tailwind.css';


const UpdateUser = () => {
    const router = useRouter()

    const [editID, seteditID] = useState(router.query.id);
    const [deleteID, setdeleteID] = useState(router.query.id);
    const [name, setName] = useState("");
    
    const DeleteCategorie = () => {
        fetch("http://localhost:4242/deleteCategorie/" + deleteID, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(
            err => console.log(err)
        )
    }


    const EditCategorie = () => {
        fetch("http://localhost:4242/updateCategorie/" + editID, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(
            err => console.log(err)
        )
    }

     return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-semibold mb-8">Update Category</h1>
            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="border p-4 rounded"
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
                    onClick={EditCategorie}
                >
                    Edit
                </button>
            </form>
            <h1 className="text-4xl font-semibold mt-10 mb-4">Delete Category</h1>
            <form>
                <button
                    className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
                    onClick={DeleteCategorie}
                >
                    Delete
                </button>
            </form>
            <Link href="/admin" className="border border-black px-6 py-3 mt-10 rounded hover:bg-gray-200">
                Go to Admin Page
            </Link>
        </div>
    );
};

export default UpdateUser;