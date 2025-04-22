import AuthForms from "@/components/auth/authForm";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-md">
        <AuthForms />
      </div>
    </main >
  );
}

export default Home;