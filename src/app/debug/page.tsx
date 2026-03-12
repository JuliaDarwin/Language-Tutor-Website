'use client'
import { useUser } from "@clerk/nextjs";

export default function DebugPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <div>Not Signed In</div>;

  return (
    <div style={{ padding: 20, background: '#333', color: '#fff' }}>
      <h1>Debug User Data</h1>
      <p><strong>User ID:</strong> {user.id}</p>
      
      <h3>Public Metadata (What the app sees):</h3>
      <pre style={{ background: 'black', padding: 10 }}>
        {JSON.stringify(user.publicMetadata, null, 2)}
      </pre>
    </div>
  );
}