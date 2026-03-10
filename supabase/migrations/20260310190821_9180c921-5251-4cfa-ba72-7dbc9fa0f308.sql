
-- Create chatbot_conversations table
CREATE TABLE public.chatbot_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  visitor_section text,
  message_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all chatbot conversations"
  ON public.chatbot_conversations FOR ALL
  USING (get_current_user_admin_status() = true);

-- Create chatbot_training_entries table
CREATE TABLE public.chatbot_training_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'knowledge',
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.chatbot_training_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all training entries"
  ON public.chatbot_training_entries FOR ALL
  USING (get_current_user_admin_status() = true);

-- Update triggers for updated_at
CREATE TRIGGER update_chatbot_conversations_updated_at
  BEFORE UPDATE ON public.chatbot_conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chatbot_training_entries_updated_at
  BEFORE UPDATE ON public.chatbot_training_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
