import Link from 'next/link';

import { LatestPost } from '@/app/_components/post';
import { getServerAuthSession } from '@/server/auth';
import { api, HydrateClient } from '@/trpc/server';
import { Separator } from '@/components/ui/separator';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { cn } from '@/lib/utils';

const navItems: {
  title: string;
  path: string;
}[] = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Community',
    path: '/community',
  },
];

/* 
<body>
<header>
<main>
<footer>
*/

export default async function Home() {
  const hello = await api.post.hello({ text: 'from tRPC' });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <header>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              {navItems.map((navItem) => {
                return (
                  <Link
                    href={navItem.path}
                    legacyBehavior
                    passHref
                    key={navItem.path}
                  >
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle())}
                    >
                      {navItem.title}
                    </NavigationMenuLink>
                  </Link>
                );
              })}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Separator />
      </header>
      <main>
        <div className='grid grid-cols-2 gap-4 xl:grid-cols-4 m-4'>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
        <div className='container flex flex-col items-center justify-center'>
          <h1 className='text-5xl font-extrabold tracking-tight sm:text-[5rem]'>
            Create <span className='text-[hsl(280,100%,70%)]'>T3</span> App
          </h1>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8'>
            <Link
              className='flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20'
              href='https://create.t3.gg/en/usage/first-steps'
              target='_blank'
            >
              <h3 className='text-2xl font-bold'>First Steps →</h3>
              <div className='text-lg'>
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className='flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20'
              href='https://create.t3.gg/en/introduction'
              target='_blank'
            >
              <h3 className='text-2xl font-bold'>Documentation →</h3>
              <div className='text-lg'>
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <p className='text-2xl text-white'>
              {hello ? hello.greeting : 'Loading tRPC query...'}
            </p>
            <div className='flex flex-col items-center justify-center gap-4'>
              <p className='text-center text-2xl text-white'>
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? '/api/auth/signout' : '/api/auth/signin'}
                className='rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20'
              >
                {session ? 'Sign out' : 'Sign in'}
              </Link>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div>
      </main>
      <footer className='mt-auto'>created by Buntin-LArchel</footer>
    </HydrateClient>
  );
}
