export const getToken = async (): Promise<void> => {
  const response = await fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const token = await response.json();
  localStorage.setItem('token', token.token);
  return token.token;
};

export const updateCategoryName = (categoryName: string): void => {
  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/data');
  xhr.send(categoryName);
};
