import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Pagination from '@/components/Pagination';

function buildHref(page: number): string {
  return `/festivals?page=${page}`;
}

describe('Pagination', () => {
  it('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} buildHref={buildHref} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows the current page out of the total', () => {
    render(<Pagination currentPage={2} totalPages={3} buildHref={buildHref} />);
    expect(screen.getByText('Page 2 of 3')).toBeTruthy();
  });

  it('renders a previous link except on the first page', () => {
    const middle = render(<Pagination currentPage={2} totalPages={3} buildHref={buildHref} />);
    expect(within(middle.container).getByText('Previous').tagName).toBe('A');
    const first = render(<Pagination currentPage={1} totalPages={3} buildHref={buildHref} />);
    expect(within(first.container).getByText('Previous').tagName).toBe('SPAN');
  });

  it('renders a next link except on the last page', () => {
    const first = render(<Pagination currentPage={1} totalPages={3} buildHref={buildHref} />);
    expect(within(first.container).getByText('Next').tagName).toBe('A');
    const last = render(<Pagination currentPage={3} totalPages={3} buildHref={buildHref} />);
    expect(within(last.container).getByText('Next').tagName).toBe('SPAN');
  });
});
