import FormHeader from "./components/FormHeader";
import FormFooter from "./components/FormFooter";

export default function SignupLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 sm:px-10 py-4 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 text-primary">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h1 className="text-lg font-bold text-black/90 dark:text-white/90">
            Footprints
          </h1>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md mx-auto">
          <FormHeader />
          {children}
          <FormFooter />
        </div>
      </main>
    </div>
  );
}
