"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, IconButton } from "@kloudlite/design-system/atoms/button";
import { FaAws } from "react-icons/fa";
import { ArrowLeftLg, ArrowLeftSm } from "@jengaicons/react";
import { FcGoogle as GoogleCloudIcon } from "react-icons/fc";
import { TbBrandAzure as MicrosoftAzureIcon } from "react-icons/tb";
import { FormDataType } from "./common";
import clsx from "clsx";
import { ArrowLeft } from "@kloudlite/design-system/icons";

const providers = [
  {
    name: "Amazon Web Services",
    icon: <FaAws className="text-4xl text-orange-500" />,
    id: "aws",
    disabled: false,
  },
  {
    name: "Microsoft Azure",
    icon: <MicrosoftAzureIcon className="text-4xl text-blue-600" />,
    id: "azure",
    disabled: true,
  },
  {
    name: "Google Cloud Platform",
    icon: <GoogleCloudIcon className="text-4xl" />,
    id: "gcp",
    disabled: true,
  },
];

export const CloudProviderForm = (
  { formData, setFormData, goPrev }: {
    formData: FormDataType;
    setFormData: Dispatch<SetStateAction<FormDataType>>;
    goPrev: () => void;
  },
) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6xl">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2xl">
        {providers.map((provider) => {
          const isDisabled = provider.disabled;
          return (
            <Button
              disabled={isDisabled}
              variant="outline"
              key={provider.id}
              onClick={() =>
                !isDisabled && setSelected((selected) => {
                  if (!selected) {
                    return provider.id;
                  }
                  return null;
                })}
              className={clsx("min-w-full", {
                "ring-2": provider.id === selected,
              })}
              content={
                <div className="flex flex-col items-center">
                  <span
                    className={clsx({
                      "opacity-25": isDisabled,
                    })}
                  >
                    {provider.icon}
                  </span>
                  <div className="text-xs font-medium">{provider.name}</div>
                </div>
              }
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-xl">
        <div className="text-sm text-text-soft">
          Kloudlite will be installed in your selected cloud provider under
          <span className="font-semibold"> {formData.kloudliteDomain}.khost.dev</span>
        </div>
        <div className="flex gap-md justify-between">
          <Button
            size="lg"
            variant="outline"
            onClick={goPrev}
            prefix={<ArrowLeft />}
            content={"Back"}
          />
          <Button
            size="lg"
            disabled={!selected}
            variant="primary"
            className="col-span-2"
            content="Proceed"
            type="submit"
            to="/cloud-provider"
          />
        </div>
      </div>
    </div>
  );
};
