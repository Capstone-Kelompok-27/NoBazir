"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";

interface FormLoginCustomerProp {
  session: Session;
}

type CustomerFormInputs = {
  userId: string;
  username: string;
  location?: string;
  profilePictureUrl?: string;
};

const FormLoginCustomer: React.FC<FormLoginCustomerProp> = ({ session }) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<CustomerFormInputs>({
    userId: session.user.id,
    username: "",
    location: "",
    profilePictureUrl: session.user.image ?? "",
  });

  const [errors, setErrors] = useState<Partial<CustomerFormInputs>>({});

  const createCustomer = api.auth.createCustomer.useMutation();
  const updateUserRole = api.auth.updateUserRole.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<CustomerFormInputs> = {};

    if (!formValues.userId) {
      newErrors.userId = "User ID is required";
    }
    if (!formValues.username) {
      newErrors.username = "Username is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    createCustomer.mutate(formValues, {
      onSuccess: (createdCustomer) => {
        console.log("Customer created successfully:", createdCustomer);
        setFormValues({
          userId: session.user.id,
          username: "",
          location: "",
          profilePictureUrl: session.user.image ?? "",
        });
      },
      onError: (error) => {
        console.error("Error creating customer:", error.message);
      },
    });

    updateUserRole.mutate({
      id: session.user.id,
      role: "customer",
    });

    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-10">
      <span className="text-green-600 font-semibold">Name: {session.user.name}</span>
      <div className="my-3 flex flex-col">
        <label htmlFor="username" className="text-green-600">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formValues.username}
          onChange={handleChange}
          className="border-2 p-2 rounded-2xl w-full"
        />
        {errors.username && <p>{errors.username}</p>}
      </div>

      <div className="my-3 flex flex-col ">
        <label htmlFor="location" className="text-green-600">Location:</label>
        <input
          id="location"
          name="location"
          type="text"
          value={formValues.location}
          onChange={handleChange}
          className="border-2 p-2 rounded-2xl w-full"
        />
      </div>
      <div className="flex justify-center">
      <button type="submit" className="w-1/2 p-3 bg-green-600 text-white rounded-full">
        Create Customer
      </button>
      </div>
    </form>
  );
};

export default FormLoginCustomer;
