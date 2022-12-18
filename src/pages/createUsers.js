import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head";

const CreateUsers = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`https://637b94246f4024eac2121bed.mockapi.io/dataUser`, {
      name,
      avatar,
      address,
      phoneNumber,
    });
    router.push("/");
    // .then(() => router.reload());
  };

  return (
    <div id="createUser">
      <Head>
        <title>Create User</title>
      </Head>
      <div className="bg-sky-300 w-11/12 md:w-4/5 mx-auto rounded-md mt-2">
        <h1 className="font-bold text-xl">ADD NEW USER</h1>
        <form className="flex flex-col gap-2 py-4 pl-10">
          <div>
            <label>Name</label>
            <input
              className="ml-[80px]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Avatar</label>
            <input
              className="ml-[78px]"
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="link of image"
            />
          </div>
          <div>
            <label>Address</label>
            <input
              className="ml-[64px]"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              className="ml-[15px]"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <button
              className="border-solid border border-violet-500 bg-slate-100 py-[2px] px-2 rounded"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUsers;
