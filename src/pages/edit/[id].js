import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";

const edit = ({ data }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();

  useEffect(() => {
    setName(data.name);
    setAvatar(data.avatar);
    setAddress(data.address);
    setPhoneNumber(data.phoneNumber);
  }, []);

  const updateData = async (e) => {
    e.preventDefault();
    await axios.put(
      `https://637b94246f4024eac2121bed.mockapi.io/dataUser/${data.id}`,
      {
        name,
        avatar,
        address,
        phoneNumber,
      }
    );
    router.push("/");
    // .then(() => router.reload());
  };

  return (
    <div id="createUser">
      <Head>
        <title>Edit User</title>
      </Head>
      <div className="bg-sky-300 w-11/12 md:w-4/5 mx-auto rounded-md mt-2">
        <h1 className="font-bold text-xl">EDIT USER</h1>
        <form className="flex flex-col gap-2 py-4 pl-10">
          <div>
            <label>Name</label>
            <input
              value={name}
              name={name}
              className="ml-[80px]"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Avatar</label>
            <input
              value={avatar}
              className="ml-[78px]"
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="link of image"
            />
          </div>
          <div>
            <label>Address</label>
            <input
              value={address}
              className="ml-[64px]"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              value={phoneNumber}
              className="ml-[15px]"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <button
              className="border-solid border border-violet-500 bg-slate-100 py-[2px] px-2 rounded"
              onClick={updateData}
            >
              UPDATE DATA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default edit;

export async function getServerSideProps(context) {
  const { id } = context.query;
  if (id) {
    const res = await fetch(
      `https://637b94246f4024eac2121bed.mockapi.io/dataUser/${id}`
    );
    const data = await res.json();

    if (!data) {
      return {
        notFound: true,
      };
    }
    return {
      props: { data },
    };
  }
}
