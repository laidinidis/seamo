import { useState } from 'react';
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
import { getPeriodStats } from '../api/stats';

const reactSelectStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: 42
  })
};

const years = [
  { label: 2009, value: 2009 },
  { label: 2010, value: 2010 },
  { label: 2011, value: 2011 },
  { label: 2012, value: 2012 },
  { label: 2013, value: 2013 },
  { label: 2014, value: 2014 },
  { label: 2015, value: 2015 },
  { label: 2016, value: 2016 },
  { label: 2017, value: 2017 },
  { label: 2018, value: 2018 },
  { label: 2019, value: 2019 },
  { label: 2020, value: 2020 },
  { label: 2021, value: 2021 }
];
const quarters = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 }
];

function Stats() {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedQuarter, setSelectedQurter] = useState(quarters[0]);

  const { data: periodStats } = useQuery(
    ['stats.periods', selectedYear?.value, selectedQuarter?.value],
    () => getPeriodStats(selectedYear?.value, selectedQuarter?.value),
    { enabled: !!selectedYear && !!selectedQuarter }
  );

  return (
    <Layout title="Statistics per period">
      <h1 className="text-4xl mb-4">Statistics per period</h1>
      <div className="grid gap-4 grid-cols-2 mb-8 max-w-screen-sm">
        <div className="">
          <ReactSelect
            instanceId="year"
            styles={reactSelectStyles}
            options={years}
            isClearable
            onChange={setSelectedYear}
            value={selectedYear}
          />
        </div>
        <div className="">
          <ReactSelect
            instanceId="quarter"
            styles={reactSelectStyles}
            options={quarters}
            isClearable
            onChange={setSelectedQurter}
            value={selectedQuarter}
          />
        </div>
      </div>

      <div className="w-full h-96">
        {selectedYear && selectedQuarter && (
          <h2 className="text-2xl mb-4">
            {selectedYear.label} - Q{selectedQuarter.value} average
          </h2>
        )}
        {periodStats?.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={periodStats}>
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
