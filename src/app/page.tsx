import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import CSVUploadForm from "@/components/forms/CSVUpload";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <CSVUploadForm />
      </SignedIn>
    </div>
  );
}
