import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const tabItems = [
  { label: 'Tab 1', content: <p>Content 1</p> },
  { label: 'Tab 2', content: <p>Content 2</p> },
  { label: 'Tab 3', content: <p>Content 3</p> },
];

describe('Tabs', () => {
  describe('rendering', () => {
    it('renders correctly with default props', () => {
      render(<Tabs tabs={tabItems} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('renders with defaultIndex', () => {
      render(<Tabs tabs={tabItems} defaultIndex={1} />);
      expect(screen.getByRole('tab', { name: /tab 2/i })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('clamps defaultIndex to valid range when out of bounds', () => {
      render(<Tabs tabs={tabItems} defaultIndex={10} />);
      expect(screen.getByText('Content 3')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /tab 3/i })).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('interactions', () => {
    it('switches panel when tab is clicked', async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={tabItems} />);
      await user.click(screen.getByRole('tab', { name: /tab 2/i }));
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('calls onChange with correct 0-based index when tab clicked', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Tabs tabs={tabItems} onChange={onChange} />);
      await user.click(screen.getByRole('tab', { name: /tab 2/i }));
      expect(onChange).toHaveBeenCalledWith(1);
      await user.click(screen.getByRole('tab', { name: /tab 3/i }));
      expect(onChange).toHaveBeenCalledWith(2);
    });
  });

  describe('edge cases', () => {
    it('handles empty tabs array without crash', () => {
      render(<Tabs tabs={[]} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('handles defaultIndex 0 with single tab', () => {
      render(<Tabs tabs={[{ label: 'Only', content: <p>Only content</p> }]} defaultIndex={0} />);
      expect(screen.getByText('Only content')).toBeInTheDocument();
    });
  });
});
