import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateStudentForm({ onSubmit }) {
  const { control, register, handleSubmit, reset } = useForm();

  return (
    <form
      className="grid gap-4 grid-cols-6 w-full"
      onSubmit={handleSubmit((data, e) => onSubmit(data, e, reset))}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          className="block w-full py-2 px-4 border border-gray-300 rounded-md"
          name="name"
          ref={register}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Date of birth</label>
        <div className="form-control">
          <Controller
            control={control}
            name="birthdate"
            defaultValue={null}
            rules={{ required: true }}
            render={({ onChange, onBlur, value }) => (
              <DatePicker
                className="block w-full py-2 px-4 border border-gray-300 rounded-md"
                selected={value}
                onChange={onChange}
                onBlur={onBlur}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
              />
            )}
          />
        </div>
      </div>
      <div>
        <label htmlFor="name" className="invisible">
          Create student
        </label>
        <button
          type="submit"
          name="submit"
          className="inline-flex justify-center py-2 px-4 shadow-sm rounded-md border text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
          Create student
        </button>
      </div>
    </form>
  );
}
