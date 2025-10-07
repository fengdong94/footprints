export default function Signup() {
  return (
    <>
      <form className="space-y-4">
        <div>
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            className="w-full h-12 px-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-primary text-black/90 dark:text-white/90 placeholder:text-black/40 dark:placeholder:text-white/40 transition-colors"
            id="email"
            placeholder="Email"
            type="email"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            className="w-full h-12 px-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-primary text-black/90 dark:text-white/90 placeholder:text-black/40 dark:placeholder:text-white/40 transition-colors"
            id="password"
            placeholder="Password"
            type="password"
          />
        </div>
        <button
          className="w-full h-12 px-6 rounded-lg bg-primary text-white font-bold text-base hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:ring-offset-background-dark"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </>
  );
}
