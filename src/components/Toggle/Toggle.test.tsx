
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  describe('uncontrolled mode (no checked prop)', () => {
    it('renders unchecked by default', () => {
      render(<Toggle label="Dark mode" />);
      const switchEl = screen.getByRole('switch', { name: /dark mode/i });
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });

    it('toggles state when clicked', async () => {
      const user = userEvent.setup();
      render(<Toggle label="Dark mode" />);
      const switchEl = screen.getByRole('switch', { name: /dark mode/i });
      await user.click(switchEl);
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
      await user.click(switchEl);
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('TDD Bug: controlled mode — onChange not called, state not synced', () => {
    // RED: When parent controls `checked`, we must call onChange so parent can update state
    it('calls onChange with new value when clicked in controlled mode', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(
        <Toggle label="Feature" checked={false} onChange={onChange} />
      );
      const switchEl = screen.getByRole('switch', { name: /feature/i });
      await user.click(switchEl);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('in controlled mode, reflects checked prop and calls onChange on click', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const { rerender } = render(
        <Toggle label="Feature" checked={true} onChange={onChange} />
      );
      const switchEl = screen.getByRole('switch', { name: /feature/i });
      expect(switchEl).toHaveAttribute('aria-checked', 'true');
      await user.click(switchEl);
      expect(onChange).toHaveBeenCalledWith(false);
      // Parent updates state and rerenders
      rerender(<Toggle label="Feature" checked={false} onChange={onChange} />);
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('disabled', () => {
    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<Toggle label="Off" checked={false} disabled onChange={onChange} />);
      const switchEl = screen.getByRole('switch');
      await user.click(switchEl);
      expect(onChange).not.toHaveBeenCalled();
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });

    it('has tabIndex -1 when disabled (accessibility)', () => {
      render(<Toggle label="Off" disabled />);
      const track = document.querySelector('[role="switch"]');
      expect(track).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('accessibility', () => {
    it('has role="switch" and aria-checked', () => {
      render(<Toggle label="A11y" />);
      const switchEl = screen.getByRole('switch', { name: /a11y/i });
      expect(switchEl).toHaveAttribute('aria-checked', 'false');
    });
  });
});
