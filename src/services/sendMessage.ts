const urlLocal = 'http://localhost:5000';
// const url = 'https://j4ivhyzeieywf7v6c5ebgwknba0bcxus.lambda-url.us-east-1.on.aws/';
export function sendMessage(user_id: string, message: string) {
  const url = `${urlLocal}/sendMessage`;
  const body = {
    user_id: user_id,
    message: message,
  };

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error al enviar el mensaje:', error);
    });
}
