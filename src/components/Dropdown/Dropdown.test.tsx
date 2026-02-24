import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown';

const defaultItems = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

describe('Dropdown', () => {
  describe('rendering', () => {
    it('renders correctly with default props', () => {
      render(<Dropdown items={defaultItems} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toHaveTextContent('Select...');
    });

    it('renders with label', () => {
      render(<Dropdown items={defaultItems} label="Choose" />);
      expect(screen.getByText('Choose')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Dropdown items={defaultItems} placeholder="Pick one" />);
      expect(screen.getByRole('combobox')).toHaveTextContent('Pick one');
    });

    it('shows selected item label when value matches', () => {
      render(<Dropdown items={defaultItems} value="b" />);
      expect(screen.getByRole('combobox')).toHaveTextContent('Option B');
    });
  });

  describe('interactions', () => {
    it('opens menu on click and calls onChange when option selected', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Dropdown items={defaultItems} onChange={onChange} />);
      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      await user.click(screen.getByRole('option', { name: /option b/i }));
      expect(onChange).toHaveBeenCalledWith('b');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('closes on Escape key', async () => {
      const user = userEvent.setup();
      render(<Dropdown items={defaultItems} />);
      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles empty items array without crash', () => {
      render(<Dropdown items={[]} placeholder="Empty" />);
      expect(screen.getByRole('combobox')).toHaveTextContent('Empty');
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    });

    it('handles undefined or null items without crash (defensive)', () => {
      expect(() => {
        render(<Dropdown items={undefined as unknown as typeof defaultItems} placeholder="No items" />);
      }).not.toThrow();
    });

    it('shows placeholder when value does not match any item', () => {
      render(<Dropdown items={defaultItems} value="unknown" placeholder="Select" />);
      expect(screen.getByRole('combobox')).toHaveTextContent('Select');
    });
  });
});
