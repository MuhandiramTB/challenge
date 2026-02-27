/**
 * Integration test: Full App – verifies all bug fixes work when the real App is used.
 * Run: npm test -- app-fixes
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../App';

describe('Integration: App (all fixes)', () => {
  it('Button: disabled button does not increase click count', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByText(/clicked 0x/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /disabled/i }));
    expect(screen.getByText(/clicked 0x/)).toBeInTheDocument();
  });

  it('Button: loading button does not trigger click', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /saving/i }));
    expect(screen.getByText(/clicked 0x/)).toBeInTheDocument();
  });

  it('Button: primary button increases click count', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /primary \(clicked 0x\)/i }));
    expect(screen.getByText(/clicked 1x/)).toBeInTheDocument();
  });

  it('Toggle: onChange updates displayed state (Dark mode ON/OFF)', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByText(/dark mode: off/i)).toBeInTheDocument();
    await user.click(screen.getByRole('switch', { name: /dark mode/i }));
    expect(screen.getByText(/dark mode: on/i)).toBeInTheDocument();
    await user.click(screen.getByRole('switch', { name: /dark mode/i }));
    expect(screen.getByText(/dark mode: off/i)).toBeInTheDocument();
  });

  it('Tabs: clicking tab shows correct content (0-based index)', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByText('This is the overview tab content.')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: /features/i }));
    expect(screen.getByText('This is the features tab content.')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: /pricing/i }));
    expect(screen.getByText('This is the pricing tab content.')).toBeInTheDocument();
  });

  it('Dropdown: selecting option updates "Selected:" text', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('combobox', { name: /framework/i }));
    await user.click(screen.getByRole('option', { name: /^vue$/i }));
    expect(screen.getByText(/selected: vue/i)).toBeInTheDocument();
  });

  it('Modal: opens and closes', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /open modal/i }));
    expect(screen.getByRole('dialog', { name: /example modal/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('Input: typing in Name updates value', async () => {
    const user = userEvent.setup();
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'Jane');
    expect(nameInput).toHaveValue('Jane');
  });
});
