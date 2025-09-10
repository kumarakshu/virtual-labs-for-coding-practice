import { SignInForm } from "@/components/auth/signin-form"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="font-bold">VL</span>
            </div>
            <span className="text-xl font-bold">VirtualLabs</span>
          </Link>
          <h2 className="text-3xl font-bold">Sign in to your account</h2>
          <p className="mt-2 text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}
