import FormHeader from "./components/form-header";
import FormFooter from "./components/form-footer";

// TODO background image, can use canva
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
          <div className="relative my-6">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <div className="w-full border-t border-black/10 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background-light dark:bg-background-dark text-black/60 dark:text-white/60">
                Or
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <button className="w-full h-12 px-6 rounded-lg bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 font-semibold text-sm hover:bg-white dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.611 20.083H24v8.571h11.303c-1.649 4.657-6.08 8.12-11.303 8.12-8.351 0-15.174-6.823-15.174-15.174s6.823-15.174 15.174-15.174c4.322 0 7.918 1.957 10.316 4.75l6.533-6.533C36.685 4.393 30.683 2 24 2 11.832 2 2.25 11.832 2.25 24s9.582 22 21.75 22c11.352 0 20.16-9.108 20.16-20.16 0-1.34-.143-2.65-.399-3.917z"
                  fill="#4285F4"
                ></path>
              </svg>
              Login with Google
            </button>
            <button className="w-full h-12 px-6 rounded-lg bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 font-semibold text-sm hover:bg-white dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
              <svg
                className="w-5 h-5"
                fill="#1877F2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-.83 0-1 .42-1 .98V12h2.5l-.5 3H14v6.8c4.56-.93 8-4.96 8-9.8z"></path>
              </svg>
              Login with Facebook
            </button>
          </div>
          <FormFooter />
        </div>
      </main>
    </div>
  );
}
