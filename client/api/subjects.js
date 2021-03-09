import { BASE_URL } from './config';

export async function getSubjects() {
  const res = await fetch(`${BASE_URL}/api/subjects`);
  return res.json();
}
