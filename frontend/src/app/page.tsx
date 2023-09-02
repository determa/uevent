import Link from 'next/link';

export default function Home() {
    return (
        <div className='flex flex-col gap-3'>
            <Link href="/accounts/login">Login</Link>
            <Link href="/accounts/register">Register</Link>
        </div>
    );
}
