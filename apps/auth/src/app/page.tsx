import Container from "@components/container";
import { Link } from "@components/link";
import { Button } from "@kloudlite/design-system/atoms/button";

export default function Home() {
  return (
    <Container>
      <div className="h-full">
        <div className="flex flex-col gap-3xl md:w-[500px] px-3xl py-5xl md:px-9xl">
          <div className="flex flex-col gap-lg items-center pb-6xl text-center">
            <div className="text-text-strong headingXl text-center">
              Sign in to Kloudlite
            </div>
            <div className="bodyMd-medium text-text-soft">
              to access Development Environments
            </div>
          </div>
          <Button
            disabled
            size="lg"
            variant="basic"
            content={<span className="bodyLg-medium">Login using SSO</span>}
            block
            type="submit"
          />
          <Button
            to="/login"
            linkComponent={Link}
            size="lg"
            variant="tertiary"
            content={<span className="bodyLg-medium">Login with Email</span>}
            block
            type="submit"
          />
        </div>
      </div>
    </Container>
  );
}
