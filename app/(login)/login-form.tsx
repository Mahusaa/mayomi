'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, KeyIcon, AtSign } from 'lucide-react';
import type { ActionState } from '@/server/auth/middleware';
import { signIn } from './action';
import { ShoppingBag } from 'lucide-react';

export function Login() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    signIn,
    { error: '' }
  )

  return (
    <div className="h-screen bg-gradient-to-br from-[#1E3765] via-[#1E3765] to-[#1E3765] flex">
      <div className="hidden lg:flex w-1/2 bg-[#E5A7A0] items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-white text-center p-8">
          <ShoppingBag className="w-16 h-16 mb-4 mx-auto" />
          <h1 className="text-3xl font-bold mb-4">For Admin</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="bg-[#E5A7A0] text-white p-2 rounded-lg">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-white">Kayana</h1>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-white">Kayana</h2>
              <p className="text-[#F4C7C3] text-sm">
                Sign in to access your admin dashboard
              </p>
            </div>

            <form className="space-y-4" action={formAction}>
              <div className="space-y-2">
                <Label
                  className="mb-3 mt-5 block text-xs font-medium text-[#E5A7A0]"
                  htmlFor="email"
                >
                  Email
                </Label>
                <div className="relative">
                  <Input
                    className="peer block w-full border border-[#F4C7C3] py-[9px] pl-10 text-sm outline-2 placeholder:text-[#F4C7C3] bg-[#1E3765] text-white"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                  <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#F4C7C3] peer-focus:text-[#E5A7A0]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  className="mb-3 mt-5 block text-xs font-medium text-[#E5A7A0]"
                  htmlFor="password"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    className="peer block w-full border border-[#F4C7C3] py-[9px] pl-10 text-sm outline-2 placeholder:text-[#F4C7C3] bg-[#1E3765] text-white"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#F4C7C3] peer-focus:text-[#E5A7A0]" />
                </div>
              </div>

              {state?.error && (
                <div className="text-[#E5A7A0] text-sm items-center">
                  {state.error}
                </div>
              )}

              <Button
                className="w-full bg-[#E5A7A0] hover:bg-[#F4C7C3] text-[#1E3765] h-11"
                disabled={pending}
                type="submit"
              >
                {pending ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Loading...
                  </>
                ) : (
                  "Sign In to Dashboard"
                )}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <Link
                href="/"
                className="text-sm text-[#F4C7C3] hover:text-[#E5A7A0]"
              >
                Back?
              </Link>

              <div className="pt-4 border-t border-[#F4C7C3]">
                <div className="flex items-center justify-center gap-4 text-xs text-[#F4C7C3]">
                  <span>Need help?</span>
                  <a href="#" className="text-[#E5A7A0] hover:text-[#F4C7C3]">
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
