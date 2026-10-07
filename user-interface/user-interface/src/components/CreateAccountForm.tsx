import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';

const createAccountSchema = z.object({
  currency: z.string().length(3, 'Password must have at least 6 characters'),
});

const fullPayloadSchema = createAccountSchema.extend({
  userId: z.string(),
});

type CreateAccountInputs = z.infer<typeof createAccountSchema>;

const CreateAccountForm: React.FC = () => {

  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateAccountInputs>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = async (data: CreateAccountInputs) => {
    let completeData = {
      ...data,
      userId: user?.id
    }
    try {
      //TODO parametrize URL
      const response = await fetch('http://localhost:8080/api/v1/account/' + user?.id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeData),
      });

      if (!response.ok) throw new Error('Incorrect account data');

    } catch (error) {
      alert(error instanceof Error ? error.message : 'An unknown error ocurred');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Currency:</label>
          <input type="currency" {...register('currency')} />
          {errors.currency && <p style={{ color: 'red' }}>{errors.currency.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </div>
  );
};

export default CreateAccountForm;