import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Business from "@/lib/models/business.model";
import Charity from "@/lib/models/charity.model";
import { connectToDB } from "@/lib/mongoose";
import AccountProfile from "@/components/forms/AccountProfile";

async function checkIfUserIsOnboarded(userEmail: string) {
  await connectToDB();

  const business = await Business.findOne({ email: userEmail });
  const charity = await Charity.findOne({ email: userEmail });

  // If the user is onboarded in either collection, return true
  if ((business && business.onboarded) || (charity && charity.onboarded)) {
    return true;
  }

  return false;
}

async function Page() {
  const user = await currentUser();
  if (!user) return null;
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  const isOnboarded = await checkIfUserIsOnboarded(userEmail);

  // If onboarded, redirect to the homepage
  if (isOnboarded) {
    redirect("/");
  }

  // If not onboarded, proceed with rendering the onboarding form
  const userData = { id: user.id, email: userEmail };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="text-heading2-bold text-light-1">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile.
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;
