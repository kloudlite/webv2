import Container from "@components/container";
import { Link } from "@components/link";
import { Button } from "@kloudlite/design-system/atoms/button";
import { PasswordInput, TextInput } from "@kloudlite/design-system/atoms/input";
import { ArrowLeft, ArrowRight } from "@kloudlite/design-system/icons";

export default function Home() {
  return (
    <Container
      headerExtra={
        <Button
          variant="outline"
          content="Sign up"
          linkComponent={Link}
          to="/signup"
        />
      }
    >
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
          <form className="flex flex-col items-stretch gap-3xl">
            <TextInput
              label="Email"
              placeholder="Enter your email"
              className="h-[48px]"
              name="email"
              size="lg"
              autoFocus
            />
            <div className="flex flex-col gap-md">
              <PasswordInput
                label="Password"
                placeholder="XXXXXX"
                size="lg"
                className="h-[48px]"
                name="password"
              />
              <Button
                content={
                  <span className="text-text-soft">Forgot password</span>
                }
                size="sm"
                variant="plain"
                to="/forgot-password"
                linkComponent={Link}
              />
            </div>
            <Button
              size="lg"
              variant="primary"
              content={<span className="bodyLg-medium">Login with Email</span>}
              suffix={<ArrowRight />}
              block
              type="submit"
            />
          </form>
          <Button
            size="lg"
            variant="plain"
            content={
              <span className="bodyLg-medium">Other sign in options</span>
            }
            prefix={<ArrowLeft />}
            to="/"
            block
            linkComponent={Link}
          />
        </div>
      </div>
    </Container>
  );
}
