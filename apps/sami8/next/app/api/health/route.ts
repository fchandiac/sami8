// apps/mi-parral/next/app/api/health/route.ts

export async function GET(request: Request) {
  // Aquí puedes realizar cualquier lógica necesaria, como chequear el estado de la aplicación.
  const responseMessage = { 
      status: 'OK', 
      message: 'La aplicación está en funcionamiento.' 
  };

  return new Response(JSON.stringify(responseMessage), {
      status: 200,
      headers: {
          'Content-Type': 'application/json',
      },
  });
}
