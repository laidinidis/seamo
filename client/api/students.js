import { BASE_URL } from './config';

export async function getStudents() {
  const res = await fetch(`${BASE_URL}/api/students`);
  const { data } = await res.json();
  return data;
}

export async function getStudent(id) {
  const res = await fetch(`${BASE_URL}/api/students/${id}`);
  const { data } = await res.json();
  return data;
}

export async function createStudent(student) {
  const res = await fetch(`${BASE_URL}/api/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  });

  const { data } = await res.json();
  return data;
}

export async function deleteStudent(id) {
  const res = await fetch(`${BASE_URL}/api/students/delete/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const { data } = await res.json();
  return data;
}
