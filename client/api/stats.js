import { BASE_URL } from './config';

export async function getStudentStats(id) {
  const res = await fetch(`${BASE_URL}/api/statistics/student/${id}`);
  return res.json();
}

export async function getClassStats(id) {
  const res = await fetch(`${BASE_URL}/api/statistics/class/${id}`);
  return res.json();
}
export async function getPeriodStats(year, quarter) {
  const res = await fetch(
    `${BASE_URL}/api/statistics/period?year=${year}&quarter=${quarter}`
  );
  return res.json();
}
