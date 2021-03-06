import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateUserForm({ onSubmit }) {
  const { control, register, handleSubmit, reset } = useForm();

  return (
    <form onSubmit={handleSubmit((data, e) => onSubmit(data, e, reset))}>
      <input name="name" ref={register} required />
      <Controller
        control={control}
        name="birthdate"
        defaultValue={null}
        rules={{ required: true }}
        render={({ onChange, onBlur, value }) => (
          <DatePicker
            selected={value}
            onChange={onChange}
            onBlur={onBlur}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        )}
      />
      <input type="submit" />
    </form>
  );
}
