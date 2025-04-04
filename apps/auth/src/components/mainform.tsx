"use client";
import Link from "next/link";
import { Button } from "@kloudlite/design-system/atoms/button";

export  const Main = () => {
    return (
        <>
            <div className="min-h-[82vh] flex items-center justify-center bg-gray-50 p-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md flex flex-col gap-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-8xl md:text-3xl font-bold text-gray-800">
                            Sign in to Kloudlite.io
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg">
                            Start integrating local coding with remote power
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            variant="outline"
                            content="Continue with GitHub"
                            className="w-full py-3 text-base "
                        />

                        <Button
                            variant="outline"
                            content="Continue with GitLab"
                            className="w-full py-3 text-base"
                        />

                        <Button
                            variant="outline"
                            content="Continue with Google"
                            className="w-full py-3 text-base"
                        />

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <Link href="/page" className="block w-full">
                            <Button
                                variant="outline"
                                content="Continue with email"
                                className="w-full py-3 text-base"
                                
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};