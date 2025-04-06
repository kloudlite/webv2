"use client";

import { Link } from "@repo/ui/link";
import { PasswordInput, TextInput } from "@kloudlite/design-system/atoms/input";
import { Button } from "@kloudlite/design-system/atoms/button";
import { ArrowLeft, ArrowRight } from "@kloudlite/design-system/icons";
import Select from "@kloudlite/design-system/atoms/select";

export const RegistrationForm = () => {
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
        />
        <TextInput
          label="Title"
          className="h-[48px]"
          name="company"
          size="lg"
        />
        <div className="col-span-2">
          <TextInput
            label="Kloudlite Domain"
            className="h-[48px]"
            name="domain"
            size="lg"
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
        />
      </div>
    </form>
  );
};
