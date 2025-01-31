import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='w-full min-h-screen dark:bg-black flex justify-center items-center p-4'>
            <SignIn />
        </div>
    )
}