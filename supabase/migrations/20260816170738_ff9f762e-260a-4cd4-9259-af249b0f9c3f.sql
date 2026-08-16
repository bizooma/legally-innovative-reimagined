-- 1. Clean orphans
DELETE FROM public.acc_organization_members m
WHERE NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = m.user_id);

ALTER TABLE public.acc_organizations ALTER COLUMN created_by DROP NOT NULL;

UPDATE public.acc_organizations o
SET created_by = NULL
WHERE o.created_by IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = o.created_by);

-- 2. Constraints
ALTER TABLE public.acc_organization_members
  ADD CONSTRAINT acc_organization_members_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.acc_organizations
  ADD CONSTRAINT acc_organizations_created_by_fkey
  FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL;