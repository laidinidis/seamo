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
import { getSubjectStats } from '../api/stats';
import { getSubjects } from '../api/subjects';

const reactSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: 42
  })
};

function Stats() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const { data: subjectStats } = useQuery(
    ['stats.subjects', selectedSubject?.value],
    () => getSubjectStats(selectedSubject?.value),
    { enabled: !!selectedSubject }
  );
  const { data: subjectData } = useQuery('subjects', getSubjects);

  const subjects = useMemo(
    () =>
      subjectData
        ? subjectData.map((s) => ({ value: s.id, label: s.name }))
        : [],
    [subjectData]
  );

  return (
    <Layout title="Statistics per subject">
      <h1 className="text-4xl mb-4">Statistics per subject</h1>
      <div className="flex mb-8">
        <div className="flex-1 max-w-xs">
          <ReactSelect
            instanceId="subject"
            styles={reactSelectStyles}
            options={subjects}
            isClearable
            onChange={setSelectedSubject}
            value={selectedSubject}
          />
        </div>
      </div>

      <div className="w-full h-96">
        {selectedSubject && (
          <h2 className="text-2xl mb-4">{selectedSubject.label} average</h2>
        )}
        {subjectStats?.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectStats}>
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
