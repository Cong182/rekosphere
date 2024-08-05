"use client";

import React from "react";
import { useStore } from "easy-peasy";
const Input = ({ item, setForm, form, onChange }) => {
  const { label, type, name, options } = item;
  //code
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm pt-2" htmlFor={name}>
        {label}
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={form[name]}
          onChange={onChange}
          className="p-3 bg-white/20 outline-none text-sm rounded-md"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value ?? option._id}>
              {option.text ?? option.fullName}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={form[name]}
          placeholder={`${name}...`}
          onChange={onChange}
          className="p-3 bg-white/20 outline-none text-sm rounded-md"
        />
      )}
    </div>
  );
};

export default Input;
