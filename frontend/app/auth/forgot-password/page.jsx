"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPasswordReset } from "@/lib/api";
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await requestPasswordReset({ email });
            setIsSubmitted(true);
        }
        catch (apiError) {
            setError(apiError.message || "Unable to send reset instructions");
        }
        finally {
            setIsLoading(false);
        }
    };
    if (isSubmitted) {
        return (<AuthLayout title="Check your email" description="We&apos;ve sent you a password reset link">
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4 rounded-lg bg-accent/10 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <CheckCircle className="h-6 w-6 text-accent-foreground"/>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-foreground">
                We&apos;ve sent an email to <strong>{email}</strong> with a link to reset your
                password.
              </p>
              <p className="text-xs text-muted-foreground">
                If you don&apos;t see it, check your spam folder.
              </p>
            </div>
          </div>

          <Button variant="outline" className="w-full border-border" onClick={() => setIsSubmitted(false)}>
            Try another email
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link to="/auth/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </AuthLayout>);
    }
    return (<AuthLayout title="Forgot password?" description="No worries, we&apos;ll send you reset instructions">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
            <Input id="email" type="email" placeholder="you@example.com" className="pl-10 bg-secondary border-border" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (<>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Sending...
            </>) : ("Reset password")}
        </Button>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Link to="/auth/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4"/>
          Back to sign in
        </Link>
      </form>
    </AuthLayout>);
}
