import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('applies tone and size classes', () => {
    render(
      <Button tone="secondary" size="lg">
        Action
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'Action' });
    expect(btn.className).toContain('numeral-button-secondary');
    expect(btn.className).toContain('numeral-button-lg');
  });

  it('forwards arbitrary className', () => {
    render(<Button className="custom-cls">Action</Button>);
    expect(screen.getByRole('button', { name: 'Action' }).className).toContain('custom-cls');
  });

  it('a11y: no violations in default state', async () => {
    const { container } = render(<Button>Submit</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
