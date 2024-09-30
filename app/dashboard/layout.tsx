import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import Logo from "@/public/logo.png";
import { DashboardLinks } from "../components/DashboardLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden md:block border-r bg-muted/40">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/" className="flex items-center gap-2">
                                <Image src={Logo} alt="logo" className="size-8" />
                                <p className="text-xl font-bold">
                                    Cal<span className="text-primary">Clark</span>
                                </p>
                            </Link>
                        </div>

                        <div className="flex-1">
                            <nav className="grid items-center px-2 lg:px-4">
                                <DashboardLinks />
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <header className="flex h-14 items-center cap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="md:hidden shrink-0" size="icon" variant="outline">
                                    <Menu className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <nav className="grid gap-2 mt-10">
                                    <DashboardLinks />
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </header>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;
