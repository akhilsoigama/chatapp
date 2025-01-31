'use client';
import React from 'react';
import { useUser } from '@clerk/clerk-react';

const User = () => {
    const { user } = useUser();
    
    return (
        <div className=" w-full flex flex-col items-center gap-8 p-5">
            <h2 className="text-xl font-bold mb-3">Login User</h2>
            
            {user ? (
                <table className="border-collapse border border-gray-300 w-lg">
                    <thead>
                        <tr className="bg-gray-200 border border-gray-300">
                            <th className="p-2 border border-gray-300">User ID</th>
                            <th className="p-2 border border-gray-300">Name</th>
                            <th className="p-2 border border-gray-300">Email</th>
                            <th className="p-2 border border-gray-300">Profile Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border border-gray-300">
                            <td className="p-2 border border-gray-300">{user?.id}</td>
                            <td className="p-2 border border-gray-300">{user?.fullName || "N/A"}</td>
                            <td className="p-2 border border-gray-300">{user?.emailAddresses?.[0]?.emailAddress || "N/A"}</td>
                            <td className="p-2 border border-gray-300">
                                {user?.imageUrl ? (
                                    <img src={user.imageUrl} alt="Profile" className="w-12 h-12 rounded-full" />
                                ) : "N/A"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p className="text-red-500">User not logged in</p>
            )}
        </div>
    );
};

export default User;
