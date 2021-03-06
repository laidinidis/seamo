import {
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient
} from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getStudents, createStudent, deleteStudent } from '../api/students';

import Layout from '../components/layout/layout';
import CreateStudentForm from '../components/students/createUserForm';

function Students() {
  const queryClient = useQueryClient();
  const { data } = useQuery('students', getStudents);

  const createStudentMutation = useMutation(createStudent, {
    onSuccess: (newStudent) => {
      queryClient.setQueryData(['students', { id: newStudent.id }], newStudent);

      // refetch students
      queryClient.invalidateQueries('students');
    }
  });

  const deleteStudentMutation = useMutation(deleteStudent, {
    onSuccess: () => {
      // queryClient.setQueryData(['students', { id: newStudent.id }], newStudent);
      // refetch();

      // refetch students
      queryClient.invalidateQueries('students');
    }
  });

  function onCreateUser(newStudent, e, reset) {
    createStudentMutation.mutate(newStudent);
    reset();
  }

  function onDeleteUser(id) {
    deleteStudentMutation.mutate(id);
  }

  return (
    <Layout title="Students">
      <h1 className="text-4xl mb-4">Students</h1>
      {data && (
        <ul>
          {data.map((student) => (
            <li key={student.id}>
              {student.name}{' '}
              <button onClick={() => onDeleteUser(student.id)}>x</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <CreateStudentForm onSubmit={onCreateUser} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('students', getStudents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Students;
