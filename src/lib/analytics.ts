import { supabase } from './supabaseClient';

export async function logEvent(params: { cardId: string; type: 'view'|'click'; path?: string; }) {
  if (!supabase) return;
  const referrer = document.referrer || null;
  const ua = navigator.userAgent || null;
  const sessionId = getSessionId();
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from('events').insert({
    card_id: params.cardId,
    user_id: user?.id ?? null,
    event_type: params.type,
    path: params.path ?? window.location.pathname,
    referrer,
    user_agent: ua,
    session_id: sessionId
  });
}

function getSessionId() {
  const k = 'lc_session_id';
  let v = localStorage.getItem(k);
  if (!v) { v = crypto.randomUUID(); localStorage.setItem(k, v); }
  return v;
}
