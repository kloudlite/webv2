"use client";

import React, { useState } from 'react';
import { Button } from "@kloudlite/design-system/atoms/button";
import { FaAws } from 'react-icons/fa';
import { FcGoogle as GoogleCloudIcon } from 'react-icons/fc';
import { TbBrandAzure as MicrosoftAzureIcon } from 'react-icons/tb';
import { useRegistration } from "../context/RegistrationContext";


const providers = [
    {
      name: 'Amazon Web Services',
      icon: <FaAws className="text-4xl text-orange-500" />,
      id: 'aws',
      disabled: false,
    },
    {
      name: 'Microsoft Azure',
      icon: <MicrosoftAzureIcon className="text-4xl text-blue-600" />,
      id: 'azure',
      disabled: true,
    },
    {
      name: 'Google Cloud Platform',
      icon: <GoogleCloudIcon className="text-4xl" />,
      id: 'gcp',
      disabled: true,
    },
  ];
  

export const CloudProviderForm = () => {
  const { data } = useRegistration();
  console.log(data)
  
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6xl">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2xl">
        {providers.map((provider) => {
        //   const isSelected = selected === provider.id;
          const isDisabled = provider.disabled;

          return (
            <div
              key={provider.id}
              onClick={() => !isDisabled && setSelected(provider.id)}
              className={`relative border rounded-lg p-4 flex flex-col items-center justify-center text-center space-y-2 transition ${
                isDisabled ? 'cursor-not-allowed bg-gray-100 opacity-60' : 'cursor-pointer hover:shadow-md'
              } 'border-blue-600 ring-2 ring-blue-500'`}
            >
              {provider.icon}
              <p className="text-sm font-medium">{provider.name}</p>
              {/* {isDisabled && (
                <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              )} */}
            </div>
          );
        })}
      </div>

      <Button
        size="lg"
        variant="primary"
        className="col-span-2"
        content={<span className="bodyLg-medium">Submit</span>}
        block
        type="submit"
        to="/cloud-provider"
        // disabled={!selected}
      />
    </div>
  );
};
