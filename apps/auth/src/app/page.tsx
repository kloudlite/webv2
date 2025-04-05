import Container from "@components/container";
import { Link } from '@components/link';
import { Button } from "@kloudlite/design-system/atoms/button";

export default function Home() {
  return (
    <Container headerExtra={
      <Button
          variant="outline"
          content="Sign up"
          linkComponent={Link}
          to="/signup"
        />
    }>
      <div className="h-full">
      </div>
    </Container>
  );
}