import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import ReactSelect from 'react-select';

import Layout from '../components/layout/layout';
import { getStudentStats } from '../api/stats';
import { getStudents } from '../api/students';

const reactSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: 42
  })
};

function Stats() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { data: studentStats } = useQuery(
    ['stats.students', selectedStudent?.value],
    () => getStudentStats(selectedStudent?.value),
    { enabled: !!selectedStudent }
  );
  const { data: studentsData } = useQuery('students', getStudents);

  const students = useMemo(
    () =>
      studentsData
        ? studentsData.map((s) => ({ value: s.id, label: s.name }))
        : [],
    [studentsData]
  );

  return (
    <Layout title="Statistics per student">
      <h1 className="text-4xl mb-4">Statistics per student</h1>
      <div className="flex mb-8">
        <div className="flex-1 max-w-xs">
          <ReactSelect
            instanceId="student"
            styles={reactSelectStyles}
            options={students}
            isClearable
            onChange={setSelectedStudent}
            value={selectedStudent}
          />
        </div>
      </div>

      <div className="w-full h-96">
        {selectedStudent && (
          <h2 className="text-2xl mb-4">
            {selectedStudent.label}&apos;s average
          </h2>
        )}
        {studentStats?.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studentStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="avg" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <span>No data</span>
        )}
      </div>
    </Layout>
  );
}

export default Stats;
