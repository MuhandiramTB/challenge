/**
 * Integration test: Modal with form inside
 * Tests opening modal, interacting with content, and closing.
 */
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

function ModalWithForm() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Form Modal">
        <Input
          label="Field"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => setOpen(false)}>Save</Button>
      </Modal>
    </>
  );
}

describe('Integration: Modal with form inside', () => {
  it('opens modal, allows input, and closes on Save', async () => {
    const user = userEvent.setup();
    render(<ModalWithForm />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.getByRole('dialog', { name: /form modal/i })).toBeInTheDocument();
    const field = screen.getByLabelText(/field/i);
    fireEvent.change(field, { target: { value: 'test' } });
    expect(screen.getByLabelText(/field/i)).toHaveValue('test');
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});