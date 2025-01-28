import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function LoginIn() {
    return (
        <>
            <div className="max-sm:pl-3 max-sm:py-2 max-sm:text-[17px]"> 
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </>
    );
}

export default LoginIn;
