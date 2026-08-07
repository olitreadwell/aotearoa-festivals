import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import HomePage from './page';

expect.extend(toHaveNoViolations);

describe('HomePage', () => {
  it('renders the heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
