import { useMemo } from 'react';
import {
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient
} from 'react-query';
import Select from 'react-select';
import { dehydrate } from 'react-query/hydration';
import { getStudents } from '../api/students';
import { getClasses } from '../api/classes';

function Grades() {
  const { data: studentsData } = useQuery('students', getStudents);
  const { data: classesData } = useQuery('classes', getClasses);

  const students = useMemo(
    () => studentsData.map((s) => ({ value: s.id, label: s.name })),
    [studentsData]
  );

  const classes = useMemo(
    () => classesData.map((c) => ({ value: c.id, label: c.name })),
    [classesData]
  );

  function onStudentSelect(student) {
    console.log(student);
  }

  function onClassSelect(cls) {
    console.log(cls);
  }

  return (
    <div>
      <h2>Grades</h2>
      <div>
        <label>Student</label>
        <Select instanceId={1} options={students} onChange={onStudentSelect} />
      </div>
      <div>
        <label>Class</label>
        <Select instanceId={2} options={classes} onChange={onClassSelect} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery('students', getStudents),
    queryClient.prefetchQuery('classes', getClasses)
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Grades;
