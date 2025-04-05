import { Link } from "@repo/ui/link";
import { PasswordInput, TextInput } from "@kloudlite/design-system/atoms/input";
import { Button } from "@kloudlite/design-system/atoms/button";
import { ArrowLeft, ArrowRight } from "@kloudlite/design-system/icons";

export default function Home() {
  return (
    <div className="h-full">
      <div className="flex flex-col gap-3xl md:w-[600px] px-3xl py-5xl md:px-9xl">
        <div className="flex flex-col gap-lg items-center pb-6xl text-center">
          <div className="text-text-strong headingXl text-center">
            Sign in to Kloudlite
          </div>
          <div className="bodyMd-medium text-text-soft">
            to access Development Environments
          </div>
        </div>
        <form className="grid grid-cols-2 items-stretch gap-3xl">
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
              label="Phone"
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

          

          <Button
            size="lg"
            variant="primary"
            className="col-span-2"
            content={<span className="bodyLg-medium">Login with Email</span>}
            suffix={<ArrowRight />}
            block
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
