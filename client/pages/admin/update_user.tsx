import React, { useEffect, useState } from "react";
import "../../app/globals.css";
import Link from "next/link";

const UpdateUser = () => {
  const [editID, seteditID] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const EditUser = () => {
    fetch(`http://localhost:4242/updateUser/` + editID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        mail: mail,
        password: password,
        birthdate: birthdate,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        window.location.href = "/admin/liste_users";
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("_id");
    if (userId !== null) {
      fetch("http://localhost:4242/userid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          seteditID(data[0]._id);
          setName(data[0].name);
          setMail(data[0].mail);
          setBirthdate(data[0].birthdate);
        });
    }
  }, []);

  return (
    <div className="gap-8 mx-auto h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl">Modifier un utilisateur</h1>
      <div className="w-1/4">
        <form onSubmit={EditUser}>
          <div className="flex flex-col gap-4">
            <input
              className="border-b-2 p-2 border-black outline-none"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              name="name"
              placeholder="nom"
              required
            />
            <input
              className="border-b-2 p-2 border-black outline-none"
              type="text"
              value={mail}
              onChange={(event) => setMail(event.target.value)}
              name="mail"
              placeholder="mail"
              required
            />
            <input
              className="border-b-2 p-2 border-black outline-none"
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              name="password"
              placeholder="password"
              required
            />
            <input
              className="border-b-2 p-2 border-black outline-none"
              type="date"
              value={birthdate}
              onChange={(event) => setBirthdate(event.target.value)}
              name="birthdate"
              required
            />

            <button
              className="p-2 bg-black text-white hover:opacity-90"
              type="submit"
            >
              Modifier
            </button>
          </div>
        </form>
        <Link className="border border-black" href="/admin/liste_users">
          Retour
        </Link>
        
      </div>
    </div>
  );
};

export default UpdateUser;