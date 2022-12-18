import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Head from "next/head";

const Index = ({ data }) => {
  const [dataUser, setDataUser] = useState(data);

  const updatedData = async () => {
    const res = await fetch(
      `https://637b94246f4024eac2121bed.mockapi.io/dataUser`
    );
    const data = await res.json();

    setDataUser(data);
  };

  useEffect(() => {
    setDataUser(data);
  }, []);

  const onDelete = async (id) => {
    await axios
      .delete(`https://637b94246f4024eac2121bed.mockapi.io/dataUser/${id}`)
      .then(() => {
        updatedData();
      });
  };

  return (
    <div id="home">
      <Head>
        <title>Contact CRUD</title>
      </Head>
      <div className="bg-sky-300 w-11/12 md:w-4/5 mx-auto rounded-md mt-2">
        <div>
          <h2 className="mx-auto text-center font-bold text-3xl">
            Contact List
          </h2>
        </div>
        <div className="flex justify-center py-6">
          <Link href="/createUsers">
            <button className="border-solid border border-violet-500 bg-slate-100 py-[2px] px-2 rounded">
              Add New Contact
            </button>
          </Link>
        </div>

        <div>
          <table className="mx-auto">
            <tbody>
              <tr>
                <th className="">ID</th>
                <th className="w-36">Avatar</th>
                <th className="w-52">Name</th>
                <th className="w-64">Address</th>
                <th className="w-40">Phone Number</th>
                <th className="w-48">Action</th>
              </tr>
              {dataUser.map((x) => {
                return (
                  <>
                    <tr className="text-center">
                      <td>{x.id}</td>
                      <td>
                        <img
                          className="mx-auto rounded-[50%] w-24 h-24"
                          src={x.avatar}
                        />
                      </td>
                      <td>{x.name}</td>
                      <td>{x.address}</td>
                      <td>{x.phoneNumber}</td>
                      <td>
                        <div className="flex flex-row justify-evenly">
                          <Link href={`/edit/${x.id}`}>
                            <button className="border-solid border border-violet-500 bg-slate-100 py-[2px] px-2 rounded">
                              EDIT
                            </button>
                          </Link>
                          <button
                            className="border-solid border border-violet-500 bg-slate-100 py-[2px] px-2 rounded"
                            onClick={() => onDelete(x.id)}
                          >
                            DELETE
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps() {
  const { data } = await axios.get(
    `https://637b94246f4024eac2121bed.mockapi.io/dataUser`
  );
  return {
    props: {
      data: data || {},
    },
  };
}
