'use client';
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="text-2xl font-bold cursor-pointer">MyApp</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="hover:text-gray-400">Home</Link>
                        <Link href="/about" className="hover:text-gray-400">About</Link>
                        <Link href="/pages/shorten" className="hover:text-gray-400">shorten Url</Link>
                        <Link href="/pages/chatapp" className="hover:text-gray-400">chatapp</Link>

                        <UserButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
