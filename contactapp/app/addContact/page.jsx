"use client";

import Input from "@/components/Input";
import { ContextValue } from "@/context/context";
import { addData, updateData, getData } from "@/fetchData/fetchData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    relationshipLevel: "",
    meetingLocation: "",
    connectedThrough: "",
    firsthand: true,
  });

  const queryClient = useQueryClient();
  const { update, setUpdate } = ContextValue();
  const { data: contacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: getData,
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => addData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const { mutateAsync: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: ({ id, data }) => updateData(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  useEffect(() => {
    if (update) {
      setForm(update);
    } else {
      setForm({
        fullName: "",
        phoneNumber: "",
        relationshipLevel: "",
        meetingLocation: "",
        connectedThrough: "",
        firsthand: true,
      });
    }
  }, [update]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the relationship level is chosen
    if (form.relationshipLevel === "") {
      alert("Please choose a relationship level");
      return;
    }

    // Prepare the form data for submission
    const formData = {
      ...form,
      firsthand: !form.connectedThrough, // Update firsthand based on connectedThrough
      connectedThrough: form.connectedThrough ? form.connectedThrough : null, // Ensure connectedThrough is ID or null
    };

    if (!update) {
      await mutateAsync(formData);
    } else {
      await updateMutate({ id: update._id, data: formData });
      setUpdate("");
    }
    router.push("/");
  };

  const loadingText = isLoading
    ? "Submitting..."
    : updateLoading
    ? "Updating..."
    : "";

  const inputs = [
    {
      label: "Full Name",
      type: "text",
      name: "fullName",
    },
    {
      label: "Phone Number",
      type: "text",
      name: "phoneNumber",
    },
    {
      label: "Relationship Level",
      type: "select",
      name: "relationshipLevel",
      options: [
        { value: "", text: "Choose a level" },
        { value: "A", text: "A" },
        { value: "B", text: "B" },
        { value: "C", text: "C" },
        { value: "D", text: "D" },
      ],
    },
    {
      label: "Meeting Location",
      type: "text",
      name: "meetingLocation",
    },
    {
      label: "Connected Through",
      type: "select",
      name: "connectedThrough",
      options: contacts
        ? [
            { _id: "", fullName: "Know firsthand" },
            ...contacts.map((c) => ({ _id: c._id, fullName: c.fullName })),
          ]
        : [],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
      firsthand:
        name === "connectedThrough" && value === ""
          ? true
          : prevState.firsthand,
    }));
  };

  return (
    <div className="w-[90%] md:w-[30rem] mx-auto my-[5rem] border border-gray-500 bg-white/10 rounded-md p-6">
      <span
        onClick={() => router.push("/")}
        className="bg-blue-600/50 p-3 rounded-md hover:bg-blue-700/50 absolute left-[3rem] top-[3rem] cursor-pointer "
      >
        Go back
      </span>
      <h2 className="pb-7 text-center text-2xl">Contact Form</h2>
      <form onSubmit={handleSubmit}>
        {inputs.map((item, i) => (
          <Input
            item={item}
            key={i}
            setForm={setForm}
            form={form}
            onChange={handleChange}
          />
        ))}
        <button
          type="submit"
          className="mt-[2rem] bg-blue-600/50 w-full p-3 rounded-md hover:bg-blue-700/50"
        >
          {!loadingText ? (update ? "Update" : "Submit") : loadingText}
        </button>
      </form>
    </div>
  );
};

export default Page;
