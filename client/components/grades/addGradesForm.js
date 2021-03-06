import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import {
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient
} from 'react-query';

import { getStudents } from '../../api/students';
import { getClasses } from '../../api/classes';
import { addGrades } from '../../api/grades';

const years = [
  { label: 2020, value: 2020 },
  { label: 2021, value: 2021 },
  { label: 2022, value: 2022 }
];
const quarters = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 }
];

const defaultValues = {
  student: null,
  year: null,
  quarter: null,
  class: null,
  grade: null
};

const reactSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: 42
  })
};

export default function AddGradesForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, control } = useForm({ defaultValues });

  const { data: studentsData } = useQuery('students', getStudents);
  const { data: classesData } = useQuery('classes', getClasses);

  const addGradesMutation = useMutation(addGrades, {
    onSuccess: (newGrades) => {
      queryClient.setQueryData(['grades', { id: newGrades.id }], newGrades);
    }
  });

  const students = useMemo(
    () => studentsData.map((s) => ({ value: s.id, label: s.name })),
    [studentsData]
  );

  const classes = useMemo(
    () => classesData.map((c) => ({ value: c.id, label: c.name })),
    [classesData]
  );

  function onAddGrade({ year, quarter, grade, student, class: subject }) {
    addGradesMutation.mutate({
      year: year.value,
      quarter: quarter.value,
      grade: Number(grade),
      studentId: student.value,
      classId: subject.value
    });
    reset(defaultValues);
  }

  return (
    <form
      className="grid gap-4 grid-cols-6 w-full"
      onSubmit={handleSubmit(onAddGrade)}>
      <div className="">
        <label htmlFor="student">Student</label>
        <Controller
          name="student"
          control={control}
          render={({ onChange, onBlur, value }) => (
            <ReactSelect
              instanceId="student"
              styles={reactSelectStyles}
              options={students}
              isClearable
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </div>
      <div className="">
        <label htmlFor="year">Year</label>
        <Controller
          name="year"
          control={control}
          render={({ onChange, onBlur, value }) => (
            <ReactSelect
              instanceId="year"
              styles={reactSelectStyles}
              options={years}
              isClearable
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </div>
      <div className="">
        <label htmlFor="quarter">Quarter</label>
        <Controller
          name="quarter"
          control={control}
          render={({ onChange, onBlur, value }) => (
            <ReactSelect
              instanceId="quarter"
              styles={reactSelectStyles}
              options={quarters}
              isClearable
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </div>
      <div className="">
        <label htmlFor="class">Class</label>
        <Controller
          name="class"
          control={control}
          render={({ onChange, onBlur, value }) => (
            <ReactSelect
              instanceId="class"
              styles={reactSelectStyles}
              options={classes}
              isClearable
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </div>
      <div className="">
        <label className="block" htmlFor="grade">
          Grade
        </label>
        <input
          className="block w-full py-2 px-4 border border-gray-300 rounded-md"
          name="grade"
          type="number"
          min={0}
          max={10}
          ref={register}
          required
        />
      </div>
      <div className="">
        <label className="block invisible" htmlFor="submit">
          Add grade
        </label>
        <button
          type="submit"
          name="submit"
          className="inline-flex justify-center py-2 px-4 shadow-sm rounded-md border text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
          Add grade
        </button>
      </div>
    </form>
  );
}
