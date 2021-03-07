import { BASE_URL } from './config';

export async function getStudentStats(id) {
  const res = await fetch(`${BASE_URL}/api/statistics/student/${id}`);
  const { data } = await res.json();
  return data;
}

export async function getClassStats(id) {
  const res = await fetch(`${BASE_URL}/api/statistics/class/${id}`);
  const { data } = await res.json();
  return data;
}
export async function getPeriodStats(year, quarter) {
  const res = await fetch(
    `${BASE_URL}/api/statistics/period?year=${year}&quarter=${quarter}`
  );
  const { data } = await res.json();
  return data;
}
