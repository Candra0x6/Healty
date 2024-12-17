"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "@/src/components/elements/Navbar";
import { Session } from "next-auth";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useSession();
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn("google");
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to sign in with Google", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };
  const { data: session } = useSession();
  return (
    <>
      <Navbar user={session as Session} />
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-white">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-gray-900 p-8 shadow-2xl">
          <h2 className="text-center text-3xl font-extrabold">
            Sign in to your account
          </h2>

          <div>
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-gray-700 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-5"
              onClick={loginWithGoogle}
              disabled={isLoading}
            >
              <svg
                className="mr-2 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 48 48"
              >
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="b">
                  <use xlinkHref="#a" overflow="visible" />
                </clipPath>
                <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                <path
                  clipPath="url(#b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                />
              </svg>
              {isLoading ? "Trying to Sign In" : " Sign in with Google"}{" "}
            </button>
            {data?.user && (
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-lg border border-gray-700 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleSignOut}
                disabled={isLoading}
              >
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* <Dialog open={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-gray-900 p-6 text-white">
            <Dialog.Title className="text-lg font-medium leading-6">Create your account</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-400">
              Sign up to get started with our service.
            </Dialog.Description>

            <form className="mt-4 space-y-4">
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium">
                  Email address
                </label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label htmlFor="signup-confirm-password" className="block text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="signup-confirm-password"
                  name="confirm-password"
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-300">
                    I agree to the{' '}
                    <a href="#" className="text-blue-500 hover:text-blue-400">
                      Terms
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-500 hover:text-blue-400">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign Up
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="mt-4 flex items-center justify-center">
              <button
                onClick={() => setIsSignUpOpen(false)}
                className="text-sm text-gray-400 hover:text-gray-300"
              >
                Already have an account? Sign in
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog> */}
      </div>
    </>
  );
}
