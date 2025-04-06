"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  learnerNav,
  mentorNav,
  navigation,
  organisationNav,
} from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setTheme } = useTheme();
  const { data: session } = useSession();
  const [navItems, setNavItems] = useState(navigation);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      const role = session.user?.role;
      switch (role) {
        case "learner":
          return setNavItems(learnerNav);
        case "mentor":
          return setNavItems(mentorNav);
        case "organisation":
          return setNavItems(organisationNav);
        default:
          return setNavItems(navigation);
      }
    } else {
      setNavItems(navigation);
    }
  }, [session]);

  const handleSignOut = () => {
    setMobileMenuOpen(false);
    signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-semibold flex gap-2">
              <Image
                src={"/logo.svg"}
                height={30}
                width={30}
                alt="Logo"
                className="font-bold invert dark:invert-0"
              />
              RiseUp
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-3 lg:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() =>
              setTheme(
                document.documentElement.classList.contains("dark")
                  ? "light"
                  : "dark"
              )
            }
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Profile + Sign Out / Sign In */}
          {session ? (
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full p-0 flex items-center"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt={session.user?.name || ""}
                    />
                    <AvatarFallback>
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </Link>
              <Button variant="default" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
            </div>
          ) : (
            <Button asChild size="sm">
              <Link href="/signin">Sign In</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <div className="px-7 pt-5">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-semibold flex gap-2"
                >
                  <Image src={"/logo.svg"} height={30} width={30} alt="Logo" />
                  RiseUp
                </Link>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-7 py-2 text-base font-medium transition-colors hover:text-primary",
                      pathname === item.href
                        ? "bg-accent text-primary"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {!session && (
                  <Link
                    href="/signin"
                    className="px-7 py-2 text-base font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
                {session && (
                  <Button
                    className="px-7 py-2 text-base font-medium text-muted-foreground"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
