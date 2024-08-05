"use client";

import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeData } from "@/fetchData/fetchData";
import { ContextValue } from "@/context/context";
import { useRouter } from "next/navigation";

const SingleContact = ({ item }) => {
  const {
    fullName,
    phoneNumber,
    relationshipLevel,
    meetingLocation,
    connectedThrough,
    firsthand,
    _id,
  } = item;

  const queryClient = useQueryClient();
  const { setUpdate } = ContextValue();
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["contact", _id],
    mutationFn: () => removeData(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const updateContact = (data) => {
    setUpdate(data);
    router.push("/addContact");
  };

  return (
    <tr className="bg-gray-100 hover:bg-gray-200 border-b">
      <td className="p-2 border">{fullName}</td>
      <td className="p-2 border">{phoneNumber}</td>
      <td className="p-2 border">{relationshipLevel}</td>
      <td className="p-2 border">{meetingLocation}</td>
      <td className="p-2 border">
        {firsthand
          ? "Firsthand"
          : connectedThrough
          ? connectedThrough.fullName
          : "Unknown"}
      </td>
      <td className="p-2 border flex justify-center items-center gap-4 text-xl">
        <span
          onClick={() => mutate(_id)}
          className={`cursor-pointer hover:text-red-500 ${
            isLoading ? "text-red-500" : ""
          }`}
        >
          <FaTrashAlt />
        </span>
        <span
          onClick={() => updateContact(item)}
          className="cursor-pointer hover:text-blue-500"
        >
          <AiFillEdit />
        </span>
      </td>
    </tr>
  );
};

export default SingleContact;
