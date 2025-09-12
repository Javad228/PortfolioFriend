import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default function Dashboard({ user }) {

  return (
    <div className="min-h-screen bg-pixel-bg text-pixel-text p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-pixel-primary mb-4">
          🎮 PORTFOLIO DASHBOARD
        </h1>
        <p className="text-pixel-text/80 mb-8">
          Welcome back, {user.name}!
        </p>
        
        <div className="bg-pixel-bg/50 border-2 border-pixel-border p-6">
          <h2 className="text-2xl font-bold text-pixel-primary mb-4">
            Coming Soon!
          </h2>
          <p className="text-pixel-text/80">
            The portfolio management interface will be available here once fully configured.
          </p>
          
          <div className="mt-6">
            <Link href="/api/auth/logout" className="pixel-btn bg-pixel-secondary border-pixel-secondary hover:bg-pixel-bg hover:text-pixel-secondary">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
