import { BASE_URL } from './config';

export async function getGrades() {
  const res = await fetch(`${BASE_URL}/api/grades`);
  return res.json();
}

export async function addGrades(grade) {
  const res = await fetch(`${BASE_URL}/api/grades`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(grade)
  });

  return res.json();
}

export async function deleteStudent(id) {
  const res = await fetch(`${BASE_URL}/api/students/delete/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return res.json();
}
