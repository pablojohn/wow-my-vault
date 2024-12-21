"use client";

import React, { useState } from "react";

interface FormComponentProps {
  onSubmit: (name: string, realm: string) => void;
}

export default function FormComponent({ onSubmit }: FormComponentProps) {
  const [formData, setFormData] = useState({ name: '', realm: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData.name, formData.realm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
        placeholder="Name"
      />
      <input
        type="text"
        name="realm"
        value={formData.realm}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
        placeholder="Realm"
      />
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
        Submit
      </button>
    </form>
  );
}