

# Chatbot History & Training Management for Admin Dashboard

## Overview
Add two capabilities to the admin dashboard:
1. **Conversation History** — Log all Biz chatbot interactions to a database table and display them in a browsable/searchable admin panel.
2. **Training Fine-Tuning** — Allow admins to manage custom knowledge entries and system prompt overrides that get injected into the chatbot's context, without touching code.

## Database Changes

<lov-plan>

# Chatbot History & Training Management for Admin Dashboard

## Overview
Add two capabilities to the admin dashboard:
1. **Conversation History** — Log all Biz chatbot interactions to a database table and display them in a browsable/searchable admin panel.
2. **Training Fine-Tuning** — Allow admins to manage custom knowledge entries that get injected into the chatbot's system prompt dynamically, without touching code.

## Database Changes

Two new tables:

**`chatbot_conversations`** — stores each chat session with all messages
- `id` (uuid, PK)
- `messages` (jsonb) — full array of `{role, content}` messages
- `visitor_section` (text) — page section where chat started
- `message_count` (integer)
- `created_at`, `updated_at` (timestamptz)
- RLS: admin-only access

**`chatbot_training_entries`** — custom knowledge/instructions admins can add
- `id` (uuid, PK)
- `title` (text) — short label like "Holiday Hours" or "New Service Pricing"
- `content` (text) — the knowledge or instruction text
- `category` (text) — e.g. "knowledge", "instruction", "correction"
- `is_active` (boolean, default true)
- `created_by` (uuid)
- `created_at`, `updated_at` (timestamptz)
- RLS: admin-only access

## Edge Function Changes

**`site-chatbot/index.ts`**:
- After receiving a message, save/update the conversation to `chatbot_conversations` using the service role key (fire-and-forget, non-blocking to streaming)
- On each request, fetch active `chatbot_training_entries` and append them to the system prompt as an "Additional Knowledge & Instructions" section
- Use Supabase service role client created within the edge function

## New Admin Components

**`ChatbotConversations.tsx`** — conversation history viewer
- Table listing conversations: date, message count, first user message preview
- Click to expand and read full conversation thread
- Search/filter by date range
- Delete individual conversations

**`ChatbotTrainingManager.tsx`** — training entries CRUD
- List all training entries with active/inactive toggle
- Add new entry form: title, content, category dropdown
- Edit/delete existing entries
- Preview of what gets injected into the system prompt

## Admin Dashboard Integration

Add a new collapsible "Chatbot Management" section to `AdminDashboard.tsx` (admin-only), containing both components in tabs:
- Tab 1: "Conversation History"
- Tab 2: "Training & Knowledge"

## Technical Notes
- Conversations are logged asynchronously so streaming latency is unaffected
- Training entries are fetched fresh on each chat request to ensure real-time updates
- No changes to the frontend chatbot UI — logging is transparent to visitors

