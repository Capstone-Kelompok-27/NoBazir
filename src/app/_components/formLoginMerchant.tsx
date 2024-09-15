"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";

interface FormLoginMerchantProp {
  session: Session;
}

type MerchantFormInputs = {
  userId: string;
  merchantName: string;
  location?: string;
  merchantType?: string;
  phoneNumber?: string;
  socialMedia?: string;
  profilePictureUrl?: string;
};

const FormLoginMerchant: React.FC<FormLoginMerchantProp> = ({ session }) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<MerchantFormInputs>({
    userId: session.user.id,
    merchantName: "",
    location: "",
    merchantType: "",
    phoneNumber: "",
    socialMedia: "",
    profilePictureUrl: session.user.image ?? "",
  });

  const [errors, setErrors] = useState<Partial<MerchantFormInputs>>({});

  const createMerchant = api.auth.createMerchant.useMutation();
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
    const newErrors: Partial<MerchantFormInputs> = {};

    if (!formValues.userId) {
      newErrors.userId = "User ID is required";
    }
    if (!formValues.merchantName) {
      newErrors.merchantName = "Merchant name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    createMerchant.mutate(formValues, {
      onSuccess: (createdMerchant) => {
        console.log("Merchant created successfully:", createdMerchant);
        setFormValues({
          userId: session.user.id,
          merchantName: "",
          location: "",
          merchantType: "",
          phoneNumber: "",
          socialMedia: "",
          profilePictureUrl: session.user.image ?? "",
        });
      },
      onError: (error) => {
        console.error("Error creating Merchant:", error.message);
      },
    });

    updateUserRole.mutate({
      id: session.user.id,
      role: "merchant",
    });

    router.push("/merchant");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 md:p-10 w-full">
      <span className="font-semibold text-green-600">
        Name: {session.user.name}
      </span>
      <div className="my-3 flex flex-col">
        <label htmlFor="merchantName" className="text-green-600">
          Business Name:
        </label>
        <input
          id="merchantName"
          name="merchantName"
          type="text"
          value={formValues.merchantName}
          onChange={handleChange}
          className="w-full rounded-2xl border-2 p-2"
        />
        {errors.merchantName && <p>{errors.merchantName}</p>}
      </div>

      <div className="my-3 flex flex-col">
        <label htmlFor="merchantType" className="text-green-600">
          Business Type:
        </label>
        <input
          id="merchantType"
          name="merchantType"
          type="text"
          value={formValues.merchantType}
          onChange={handleChange}
          className="w-full rounded-2xl border-2 p-2"
        />
        {errors.merchantType && <p>{errors.merchantType}</p>}
      </div>

      <div className="my-3 flex flex-col">
        <label htmlFor="location" className="text-green-600">
          Location:
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formValues.location}
          onChange={handleChange}
          className="w-full rounded-2xl border-2 p-2"
        />
      </div>

      <div className="my-3 flex flex-col">
        <label htmlFor="phoneNumber" className="text-green-600">
          Phone Number:{" "}
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          value={formValues.phoneNumber}
          onChange={handleChange}
          className="w-full rounded-2xl border-2 p-2"
        />
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
      </div>

      <div className="my-3 flex flex-col">
        <label htmlFor="socialMedia" className="text-green-600">
          Social Media:{" "}
        </label>
        <input
          id="socialMedia"
          name="socialMedia"
          type="text"
          value={formValues.socialMedia}
          onChange={handleChange}
          className="w-full rounded-2xl border-2 p-2"
        />
        {errors.socialMedia && <p>{errors.socialMedia}</p>}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-1/2 rounded-full bg-green-600 p-3 text-white"
        >
          Create Merchant
        </button>
      </div>
    </form>
  );
};

export default FormLoginMerchant;
