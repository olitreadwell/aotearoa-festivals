import Link from 'next/link';

import { Container, Stack } from '@numeral/ui';

export default function NotFound(): React.ReactElement {
  return (
    <Container size="narrow" className="py-[var(--spacing-3xl)] text-center">
      <Stack className="items-center gap-6">
        <p className="numeral-text-eyebrow text-[var(--color-muted)]">Error 404</p>
        <h1 className="numeral-heading-4xl">404</h1>
        <h2 className="numeral-heading-xl">Page not found</h2>
        <p className="numeral-paragraph-md text-[var(--color-muted)]">
          The page you are looking for does not exist or has been moved. Check the URL or head back
          to the homepage.
        </p>
        <Link href="/" className="numeral-button numeral-button-primary numeral-button-lg">
          Back to home
        </Link>
      </Stack>
    </Container>
  );
}
