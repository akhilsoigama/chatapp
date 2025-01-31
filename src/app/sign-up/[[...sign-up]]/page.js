import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='w-full flex justify-center items-center min-h-screen p-4 dark:bg-black'>
            <SignUp />
        </div>
    )
}