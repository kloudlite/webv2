import Container from "@components/container";
import { Button } from "@kloudlite/design-system/atoms/button";
import { Link } from '@components/link';

export default function Home() {
  return (
    <Container
      headerExtra={
        <Button
          variant="outline"
          content="Sign in"
          linkComponent={Link}
          to="/login"
        />
      }
    >
      <div className="bg-red-400">
      Login Form
      </div>
    </Container>
  );
}