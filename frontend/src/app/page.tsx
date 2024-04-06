
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="bg-blue-200 w-100 rounded-sm p-4">
        <h1 className="flex justify-center">Login</h1>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input className="bg-transparent border-b-2 border-black" type="text" />
        </div>
        <button className="flex justify-center bg-blue-500/85 rounded-md p-1 my-3">Entrar</button>
      </div>
    </main>
  );
}
