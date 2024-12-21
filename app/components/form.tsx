import React, { useState } from "react";

interface FormComponentProps {
  onSubmit: (name: string, realm: string) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [realm, setRealm] = useState("");
  const [errors, setErrors] = useState<{ name?: string; realm?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; realm?: string } = {};
    if (!name) newErrors.name = "Name is required";
    if (!realm) newErrors.realm = "Realm is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(name, realm);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded`}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-white">Realm</label>
        <input
          type="text"
          value={realm}
          onChange={(e) => setRealm(e.target.value)}
          className={`w-full p-2 border ${errors.realm ? "border-red-500" : "border-gray-300"} rounded`}
        />
        {errors.realm && <p className="text-red-500">{errors.realm}</p>}
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default FormComponent;