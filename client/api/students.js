import { BASE_URL } from './config';

export async function getStudents() {
  const res = await fetch(`${BASE_URL}/api/students`);
  return res.json();
}

export async function getStudent(id) {
  const res = await fetch(`${BASE_URL}/api/students/${id}`);
  return res.json();
}

export async function createStudent(student) {
  const res = await fetch(`${BASE_URL}/api/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
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
