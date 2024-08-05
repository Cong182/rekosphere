"use client";

import SingleContact from "@/components/SingleContact";
import { getData } from "@/fetchData/fetchData";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["contacts"],
    queryFn: getData,
  });

  if (isError) {
    return <div className="text-red-500">Error fetching data</div>; // Handle the error state gracefully
  }

  return (
    <div className="w-[90%] lg:w-[70%] mx-auto my-[5rem]">
      <div className="text-right mb-4">
        <Link href="/addContact">
          <span className="p-2 py-3 bg-blue-600 rounded-md hover:bg-blue-700/50 mr-2 cursor-pointer">
            Add Contact
          </span>
        </Link>
        <Link href="/contactGraph">
          <span className="p-2 py-3 bg-green-600 rounded-md hover:bg-green-700/50 cursor-pointer">
            View Contact Graph
          </span>
        </Link>
      </div>

      <div className="mt-[2rem] bg-white rounded-md shadow-lg p-4">
        <h1 className="text-center text-3xl py-4 uppercase font-semibold">
          Contact App
        </h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Phone No</th>
              <th className="p-2 border">Relationship Level</th>
              <th className="p-2 border">Meeting Location</th>
              <th className="p-2 border">Connected Through</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data?.length ? (
              data.map((item, i) => <SingleContact item={item} key={i} />)
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No contacts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
