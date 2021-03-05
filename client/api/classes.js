import { BASE_URL } from './config';

export async function getClasses() {
  const res = await fetch(`${BASE_URL}/api/classes`);
  const { data } = await res.json();
  return data;
}
