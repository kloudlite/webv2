"use client";

import { TextInput } from "@kloudlite/design-system/atoms/input";
import { Button } from "@kloudlite/design-system/atoms/button";
import { ArrowRight } from "@kloudlite/design-system/icons";
import Select from "@kloudlite/design-system/atoms/select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getSuggestedNames } from "./server";
import clsx from "clsx";
import { CloudProviderForm } from "./cloud-provider-selection";
import { FormDataType } from "./common";

export const MainForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    title: "",
    country: "IN",
    company: "",
    kloudliteDomain: "",
    suggestedDomains:[],
  });
  const goNext = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const goPrev = () => {
    setStep((prevStep) => prevStep - 1);
  };
  return (
    <>
      {step === 0 && (
        <RegistrationForm
          formData={formData}
          setFormData={setFormData}
          goNext={goNext}
        />
      )}
      {step === 1 && (
        <CloudProviderForm
          formData={formData}
          setFormData={setFormData}
          goPrev={goPrev}
        />
      )}
    </>
  );
};

export const RegistrationForm = (
  { formData, setFormData, goNext }: {
    formData: FormDataType;
    setFormData: Dispatch<SetStateAction<FormDataType>>;
    goNext: () => void;
  },
) => {
  // const [suggestedDomains, setSuggestedDomains] = useState<string[]>([]);

  const isFormValid = Object.values(formData).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goNext();
  };

  const [dtimer, setDtimer] = useState<any>();

  useEffect(() => {
    if(formData.suggestedDomains.length > 0) {
      return
    }
    if (dtimer) {
      clearTimeout(dtimer);
    }
    const timer = setTimeout(async () => {
      if (formData.company || formData.kloudliteDomain) {
        const suggestionFromCompanyName = formData.company.split(" ")[0] || "";
        const suggestions = await getSuggestedNames(
          formData.kloudliteDomain || suggestionFromCompanyName,
        );
        if (Array.isArray(suggestions) && suggestions.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            suggestedDomains: suggestions,
            kloudliteDomain: suggestions[0] || "",
          }));
        }
      } else {
        setFormData((prevData)=>{
          return {
            ...prevData,
            suggestedDomains: [],
            kloudliteDomain: "",
          }
        })
      }
    }, 500);
    setDtimer(timer);
  }, [formData.company, formData.kloudliteDomain]);

  return (
    <form className="flex flex-col gap-6xl" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 items-stretch gap-3xl">
        <TextInput
          label="First Name"
          className="h-[48px]"
          name="firstName"
          size="lg"
          autoFocus
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })}
        />
        <TextInput
          label="Last Name"
          className="h-[48px]"
          name="lastName"
          size="lg"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })}
        />
        <div className="col-span-2">
          <TextInput
            label="Email"
            className="h-[48px]"
            name="email"
            size="lg"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="col-span-2">
          <TextInput
            label="Website"
            className="h-[48px]"
            name="website"
            size="lg"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })}
          />
        </div>

        <TextInput
          label="Company"
          className="h-[48px]"
          name="company"
          size="lg"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })}
        />

        <TextInput
          label="Title"
          className="h-[48px]"
          name="title"
          size="lg"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <div className="col-span-2 flex flex-col gap-lg">
          <TextInput
            label="Kloudlite Domain"
            className="h-[48px] bg-gray-100"
            name="kloudliteDomain"
            size="lg"
            suffix=".khost.dev"
            value={formData.kloudliteDomain}
            onChange={(e) =>
              setFormData({ ...formData, kloudliteDomain: e.target.value })}
          />

          {formData.suggestedDomains.length > 0 && (
            <div className="flex gap-md mt-md flex-wrap items-center">
              <span className="text-sm text-text-soft font-medium">suggestions: </span>
              {formData.suggestedDomains.map((domain) => (
                <Button
                  size="sm"
                  variant="outline"
                  key={domain}
                  type="button"
                  className={clsx(
                    "!px-xl !rounded-full border text-sm transition",
                    domain === formData.kloudliteDomain
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300 hover:border-blue-400",
                  )}
                  onClick={() => {
                    setFormData({ ...formData, kloudliteDomain: domain });
                  }}
                  content={domain}
                />
              ))}
            </div>
          )}
        </div>

        <div className="col-span-2 h-[48px] flex flex-col items-stretch">
          <Select
            size="lg"
            label="Country"
            value={formData.country}
            onChange={(e: any) => {
              setFormData({ ...formData, country: e.value });
            }}
            options={async () => {
              return [
                { value: "IN", label: "India" },
                { value: "US", label: "United States" },
              ];
            }}
          >
          </Select>
        </div>
      </div>

      <div className="flex gap-3xl justify-between pt-3xl">
        <p className="bodySm">
          By clicking "Continue," you agree to Kloudlite processing your
          personal data in accordance with its Privacy Notice.
        </p>
        <div>
          <Button
            size="lg"
            variant="primary"
            content={<span className="bodyLg-medium">Continue</span>}
            suffix={<ArrowRight />}
            block
            type="submit"
            disabled={!isFormValid}
          />
        </div>
      </div>
    </form>
  );
};
