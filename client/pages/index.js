import { QueryClient, useQuery } from 'react-query';

import { dehydrate } from 'react-query/hydration';
import Layout from '../components/layout/layout';
import { getStudents } from '../api/students';
import { getClasses } from '../api/classes';
import AddGradesForm from '../components/grades/addGradesForm';
import { getGrades } from '../api/grades';

function Grades() {
  const { data: grades, isLoading } = useQuery('grades', getGrades);

  return (
    <Layout title="Grades">
      <h1 className="text-4xl mb-4">Grades</h1>
      <AddGradesForm />
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
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!isLoading &&
                    grades?.map((g) => (
                      <tr key={g.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {g.student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {g.year} - Q{g.quarter}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {g.class.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {g.grade}
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
