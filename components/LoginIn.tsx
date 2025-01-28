import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function LoginIn() {
    return (
        <>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </>
    );
}

export default LoginIn;
