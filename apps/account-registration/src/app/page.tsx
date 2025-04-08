import { MainForm } from "./_components/registration-form";
// import { listDNSRecords } from "@repo/cf-domain-management";

export default function Home() {
  // console.log(listDNSRecords)
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-6xl md:w-[600px] px-3xl p-5xl md:px-5xl bg-surface-basic-default border border-border-default rounded-lg">
        <div className="flex flex-col gap-lg">
          <div className="text-text-strong headingXl ">
            Create your Kloudlite account
          </div>
          <div className="bodyMd-medium text-text-soft">
            Sign up with your work email to elevate your trial with expert assistance, cloud options and more.
          </div>
        </div>
        <MainForm />
      </div>
    </div>
  );
}
