async function getAll() {
  const response = await fetch('http://localhost:3003/values/all');
  const data = await response.json();
  console.log(data);
  return data;
}

export { getAll };
