"use client";

import { TextInput } from "@kloudlite/design-system/atoms/input";
import { Button } from "@kloudlite/design-system/atoms/button";
import { ArrowRight } from "@kloudlite/design-system/icons";
import Select from "@kloudlite/design-system/atoms/select";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { DnsRecord } from "./server";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useRegistration } from "../context/RegistrationContext";

export const RegistrationForm = () => {
  const [company, setCompany] = useState("");
  const [suggestedDomains, setSuggestedDomains] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const router = useRouter();
  const { setData } = useRegistration();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    title: "",
    country: "IN",
  });

  const isFormValid = Object.values(formValues).every(Boolean) && company && selectedDomain;

  const fetchSuggestedDomains = async () => {
    try {
      const suggestions = await DnsRecord();
      if (Array.isArray(suggestions) && suggestions.length > 0) {
        setSuggestedDomains(suggestions.slice(0, 3));
        setSelectedDomain(suggestions[0]);
      }
    } catch (err) {
      console.error("Error fetching domain suggestions", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget as HTMLFormElement);

    setData({
        ...formValues,
        company,
        kloudliteDomain: selectedDomain,
      });
      
    router.push("/cloud-provider");
  };

  const debouncedFetch = debounce(fetchSuggestedDomains, 500);

  useEffect(() => {
    debouncedFetch();
    return debouncedFetch.cancel;
  }, [company]);

  return (
    <form className="flex flex-col gap-6xl" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 items-stretch gap-3xl">
        <TextInput
          label="First Name"
          className="h-[48px]"
          name="firstName"
          size="lg"
          autoFocus
          value={formValues.firstName}
          onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
        />
        <TextInput
          label="Last Name"
          className="h-[48px]"
          name="lastName"
          size="lg"
          value={formValues.lastName}
          onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
        />
        <div className="col-span-2">
          <TextInput
            label="Email"
            className="h-[48px]"
            name="email"
            size="lg"
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
          />
        </div>
        <div className="col-span-2">
          <TextInput
            label="Website"
            className="h-[48px]"
            name="website"
            size="lg"
            value={formValues.website}
            onChange={(e) => setFormValues({ ...formValues, website: e.target.value })}
          />
        </div>

        <TextInput
          label="Company"
          className="h-[48px]"
          name="company"
          size="lg"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <TextInput
          label="Title"
          className="h-[48px]"
          name="title"
          size="lg"
          value={formValues.title}
          onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
        />

        <div className="col-span-2">
        <TextInput
          label="Kloudlite Domain"
          className="h-[48px] bg-gray-100"
          name="kloudliteDomain"
          size="lg"
          value={selectedDomain}
          disabled
        />

          {suggestedDomains.length > 0 && (
            <div className="flex gap-md mt-md flex-wrap">
              {suggestedDomains.map((domain) => (
                <button
                  key={domain}
                  type="button"
                  className={clsx(
                    "px-3 py-1 rounded-full border text-sm transition",
                    domain === selectedDomain
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
                  )}
                  onClick={() => setSelectedDomain(domain)}
                >
                  {domain}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-2">
        <Select
          name="country"
          value={formValues.country}
          onChange={(e: any) => { 
              console.log(e.value),
             setFormValues({ ...formValues, country: e.value })
            }
          }
          options={[
            { value: "IN", label: "India" },
            { value: "US", label: "United States" },
          ]}
          className="h-[48px] w-full border px-3 py-2 pl-4 rounded-lg text-sm appearance-none bg-white"
        >
        </Select>
        </div>
      </div>

      <div className="flex flex-col gap-3xl">
        <p className="bodySm">
          By clicking "Continue," you agree to Kloudlite processing your
          personal data in accordance with its Privacy Notice.
        </p>
        <Button
          size="lg"
          variant="primary"
          className="col-span-2"
          content={<span className="bodyLg-medium">Continue</span>}
          suffix={<ArrowRight />}
          block
          type="submit"
          disabled={!isFormValid}
        />
      </div>
    </form>
  );
};
