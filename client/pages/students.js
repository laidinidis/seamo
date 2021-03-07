import {
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient
} from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getStudents, createStudent, deleteStudent } from '../api/students';

import Layout from '../components/layout/layout';
import Icon from '../components/icons/icon';
import CreateStudentForm from '../components/students/createStudentForm';

function Students() {
  const queryClient = useQueryClient();
  const { data: students, isLoading } = useQuery('students', getStudents);

  const createStudentMutation = useMutation(createStudent, {
    onSuccess: (newStudent) => {
      queryClient.setQueryData(['students', { id: newStudent.id }], newStudent);

      queryClient.invalidateQueries('students');
    }
  });

  const deleteStudentMutation = useMutation(deleteStudent, {
    onSuccess: () => {
      // queryClient.setQueryData(['students', { id: newStudent.id }], newStudent);
      // refetch();

      queryClient.invalidateQueries('students');
    }
  });

  function onCreateStudent(newStudent, e, reset) {
    createStudentMutation.mutate(newStudent);
    reset();
  }

  function onDeleteUser(id) {
    deleteStudentMutation.mutate(id);
  }

  return (
    <Layout title="Students">
      <h1 className="text-4xl mb-4">Students</h1>
      <CreateStudentForm onSubmit={onCreateStudent} />
      <div className="flex flex-col mt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date of birth
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!isLoading &&
                    students?.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Intl.DateTimeFormat('gr-GR').format(
                            new Date(student.birthdate)
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button onClick={() => onDeleteUser(student.id)}>
                            <Icon width={24} height={24} icon="trash" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
