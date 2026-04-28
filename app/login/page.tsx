import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", {
              password: formData.get("password") as string,
              redirect: false,
            });
          } catch (error) {
            if (error instanceof AuthError) {
              redirect("/login?error=1");
            }
            throw error;
          }
          redirect("/today");
        }}
        className="w-full max-w-sm space-y-5 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Job Search</h1>
          <p className="text-sm text-zinc-500">Enter your app password to continue.</p>
        </div>
        <ErrorIfAny searchParams={searchParams} />
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required autoFocus />
        </div>
        <Button type="submit" className="w-full">Sign in</Button>
      </form>
    </div>
  );
}

async function ErrorIfAny({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  if (!error) return null;
  return (
    <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      Wrong password.
    </div>
  );
}
