/**
 * Integration test: Form with multiple components (Input + Button)
 * Tests form submission flow with name input and submit button.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState, ChangeEvent } from 'react';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

function SimpleForm() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <Input
        label="Name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <Button onClick={() => setSubmitted(true)}>Submit</Button>
      {submitted && <p data-testid="success">Submitted: {name}</p>}
    </>
  );
}

describe('Integration: Form submission flow', () => {
  it('updates input and shows submitted value on button click', async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);
    await user.type(screen.getByLabelText(/name/i), 'Jane');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.getByTestId('success')).toHaveTextContent('Submitted: Jane');
  });
});
