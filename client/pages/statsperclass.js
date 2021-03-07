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
import { getClassStats } from '../api/stats';
import { getClasses } from '../api/classes';

const reactSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: 42
  })
};

function Stats() {
  const [selectedClass, setSelectedClass] = useState(null);

  const { data: classStats } = useQuery(
    ['stats.classes', selectedClass?.value],
    () => getClassStats(selectedClass?.value),
    { enabled: !!selectedClass }
  );
  const { data: classData } = useQuery('classes', getClasses);

  const classes = useMemo(
    () =>
      classData ? classData.map((s) => ({ value: s.id, label: s.name })) : [],
    [classData]
  );

  return (
    <Layout title="Statistics per class">
      <h1 className="text-4xl mb-4">Statistics per class</h1>
      <div className="flex mb-8">
        <div className="flex-1 max-w-xs">
          <ReactSelect
            instanceId="class"
            styles={reactSelectStyles}
            options={classes}
            isClearable
            onChange={setSelectedClass}
            value={selectedClass}
          />
        </div>
      </div>

      <div className="w-full h-96">
        {selectedClass && (
          <h2 className="text-2xl mb-4">{selectedClass.label} average</h2>
        )}
        {classStats?.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classStats}>
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
