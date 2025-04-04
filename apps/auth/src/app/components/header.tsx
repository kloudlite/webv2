"use client";
import { Button } from "@kloudlite/design-system/atoms/button";
import { BrandLogo } from "@kloudlite/design-system/branding/brand-logo";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <BrandLogo size={40} detailed />
        </Link>

        <div className="flex items-center gap-4 px-4 py-2 text-xl font-bold">
          <Link href="https://kloudlite.io/contact-us">
            <Button variant="plain" content="Contact us" className="" />
          </Link>
          <Link href="/sign-up">
            <Button
              variant="primary"
              content="Sign up"
              className="px-4 py-2 text-3xl font-bold"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
