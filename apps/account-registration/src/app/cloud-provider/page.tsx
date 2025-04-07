import { CloudProviderForm } from "../_components/cloud-provider-components";

export default function Home(formData: FormData) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-6xl md:w-[600px] px-3xl p-5xl md:px-5xl bg-surface-basic-default border border-border-default rounded-lg">
        <div className="flex flex-col gap-lg">
          <div className="text-text-strong headingXl ">
            Pick your cloud provider
          </div>
          <div className="bodyMd-medium text-text-soft">
          You’ll need admin access to your cloud account to get started.
          </div>
        </div>
        <CloudProviderForm />
      </div>
    </div>
  );
}
