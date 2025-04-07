"use client";

import { TextInput } from "@kloudlite/design-system/atoms/input";
import { Button } from "@kloudlite/design-system/atoms/button";
import { ArrowRight } from "@kloudlite/design-system/icons";
import Select from "@kloudlite/design-system/atoms/select";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { listDNSRecords } from "@repo/cf-domain-management";


export const RegistrationForm = () => {

  const [company, setCompany] = useState("");
  const [suggestedDomains, setSuggestedDomains] = useState<{ label: string, value: string }[]>([]);

  const fetchSuggestedDomains = async (companyName: string) => {
    if (!companyName) return;
    try {
      // const suggestions = await listDNSRecords(companyName);
      const suggestions = await listDNSRecords;
      console.log(suggestions)
      // setSuggestedDomains(suggestions.map((d: string) => ({
      //   label: d,
      //   value: d,
      // })));
    } catch (err) {
      console.error("Error fetching domain suggestions", err);
    }
  };

  const debouncedFetch = debounce(fetchSuggestedDomains, 500);

  useEffect(() => {
    debouncedFetch(company);
    return debouncedFetch.cancel;
  }, [company]);


  return (
    <form className="flex flex-col gap-6xl">
      <div className="grid grid-cols-2 items-stretch gap-3xl">
        <TextInput
          label="First Name"
          className="h-[48px]"
          name="name"
          size="lg"
          autoFocus
        />
        <TextInput
          label="Last Name"
          className="h-[48px]"
          name="name"
          size="lg"
          autoFocus
        />
        <div className="col-span-2">
          <TextInput
            label="Email"
            className="h-[48px]"
            name="email"
            size="lg"
          />
        </div>
        <div className="col-span-2">
          <TextInput
            label="Website"
            className="h-[48px]"
            name="phone"
            size="lg"
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
        />

        <div className="col-span-2">
          <Select
            label="Kloudlite Domain"
            value=""
            size="lg"
            options={() => Promise.resolve(suggestedDomains)}
          />
        </div>

        <div className="col-span-2">
          <Select
            label="Country"
            value="IN"
            size="lg"
            options={async () => {
              return [{
                label: "India",
                value: "IN",
              }, {
                label: "United States",
                value: "US",
              }];
            }}
          />
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
          to="/cloud-provider"
        />
      </div>
    </form>
  );
};
