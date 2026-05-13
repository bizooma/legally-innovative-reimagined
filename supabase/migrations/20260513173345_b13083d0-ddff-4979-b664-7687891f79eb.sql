DO $$
DECLARE
  v_user uuid := '3a9da6df-7e8d-4431-9336-b6f67ae49f76';
  v_org uuid;
BEGIN
  INSERT INTO public.acc_organizations (name, slug, created_by, plan, subscription_status)
  VALUES ('Bizooma', 'bizooma', v_user, 'starter', 'active')
  RETURNING id INTO v_org;

  INSERT INTO public.acc_organization_members (organization_id, user_id, role)
  VALUES (v_org, v_user, 'owner');
END $$;