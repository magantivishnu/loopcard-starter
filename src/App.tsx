import React, { useEffect } from 'react';
import AuthGate from './components/AuthGate';
import { logEvent } from './lib/analytics';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabaseClient';

export default function App() {
  const { user, signOut } = useAuth();

  // Replace this with a real card id from your Supabase table when ready
  const demoCardId = '00000000-0000-0000-0000-000000000000';

  useEffect(() => {
    logEvent({ cardId: demoCardId, type: 'view' });
  }, []);

  async function handleClick() {
    await logEvent({ cardId: demoCardId, type: 'click', path: '/cta' });
    alert('Click event logged to Supabase');
  }

  async function handleCreateCard() {
    if (!user) return;
    const { data, error } = await supabase
      .from('cards')
      .insert({
        owner_id: user.id,
        business_name: 'My Demo Card',
        card_slug: `demo-${user.id.slice(0, 6)}`
      })
      .select();
    if (error) console.error(error.message);
    else alert(`Card created with slug: ${data?.[0]?.card_slug}`);
  }

  return (
    <AuthGate>
      <div style={{ fontFamily: 'sans-serif', padding: '24px' }}>
        <h1>LoopCard Dashboard</h1>
        <p>Authenticated as: {user?.email ?? 'No user'}</p>

        <button
          style={{
            padding: '8px 16px',
            marginRight: 8,
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
          onClick={handleClick}
        >
          Log Click Event
        </button>

        <button
          style={{
            padding: '8px 16px',
            marginRight: 8,
            background: '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
          onClick={handleCreateCard}
        >
          Create Demo Card
        </button>

        <button
          style={{
            padding: '8px 16px',
            background: '#dc2626',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
          onClick={signOut}
        >
          Sign Out
        </button>

        <p style={{ marginTop: 24, color: '#555' }}>
          Each page load automatically logs a <strong>view</strong> event.  
          Clicking “Log Click Event” inserts a <strong>click</strong> event.
        </p>
      </div>
    </AuthGate>
  );
}
