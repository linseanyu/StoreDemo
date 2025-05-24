import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-sm text-gray-900">{session.user?.name || 'Not provided'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{session.user?.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 text-sm text-gray-900">{(session.user as { role?: string })?.role || 'USER'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">User ID</label>
              <p className="mt-1 text-sm text-gray-900 font-mono">{session.user?.id}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Protected Content</h3>
          <p className="text-gray-600">
            This page is only accessible to authenticated users. The middleware automatically 
            redirects unauthenticated users to the login page.
          </p>
        </div>
      </div>
    </div>
  )
} 