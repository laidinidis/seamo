import React from 'react';
import { useForm } from 'react-hook-form';

export default function CreateUserForm({ onSubmit }) {
  const { register, handleSubmit, reset } = useForm();

  return (
    <form onSubmit={handleSubmit((data, e) => onSubmit(data, e, reset))}>
      <input name="name" ref={register} />
      <input type="submit" />
    </form>
  );
}
