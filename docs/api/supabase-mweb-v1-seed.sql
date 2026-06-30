-- Tathastu / Sankalp mweb V1 seed data
-- Run this after docs/api/supabase-mweb-v1-schema.sql.

-- Align existing catalog with Mohit/Sankalp positioning.
update public.rituals
set
  title = case slug
    when 'nazarUttaro' then 'Nazar Badha'
    when 'examBlessings' then 'Raksha Kavach'
    when 'videoBlessing' then 'Live Sankalp Blessing'
    else title
  end,
  subtitle = case slug
    when 'nazarUttaro' then 'Clear the evil eye'
    when 'examBlessings' then 'Protection shield'
    when 'videoBlessing' then 'Live video ritual'
    else subtitle
  end,
  short_description = case slug
    when 'nazarUttaro' then 'Clear heavy energy, bad luck streaks, or the evil eye after a good run.'
    when 'examBlessings' then 'Protect your focus before an exam, interview, first day, or big meeting.'
    when 'videoBlessing' then 'Join pandit ji live when you want to participate directly from home.'
    else short_description
  end,
  starting_price_minor = case slug
    when 'nazarUttaro' then 19900
    when 'examBlessings' then 19900
    when 'videoBlessing' then 25100
    else starting_price_minor
  end
where slug in ('nazarUttaro', 'examBlessings', 'videoBlessing');

insert into public.mweb_home_banners (
  ritual_id,
  badge,
  title,
  subtitle,
  visual_tone,
  display_order,
  status
)
values
  (
    (select id from public.rituals where slug = 'examBlessings'),
    'RAKSHA KAVACH',
    'Big exam or interview coming up?',
    'A verified pandit performs Raksha Kavach in your name, so you walk in calm and shielded.',
    'clay',
    1,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'grihaPravesh'),
    'GHAR AUR VYAPAR',
    'New home, shop, or vehicle?',
    'Bless new beginnings with a verified pandit, clear preparation steps, and status tracking.',
    'gold',
    2,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'videoBlessing'),
    'LIVE SANKALP',
    'Need pandit ji on video?',
    'Join a short guided blessing from home with a preparation checklist and live support.',
    'green',
    3,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'nazarUttaro'),
    'NAZAR BADHA',
    'Good run suddenly going off?',
    'A pandit performs Nazar Badha to clear the evil eye and help your luck get back on track.',
    'blue',
    4,
    'active'
  )
on conflict (badge) do update set
  ritual_id = excluded.ritual_id,
  title = excluded.title,
  subtitle = excluded.subtitle,
  visual_tone = excluded.visual_tone,
  display_order = excluded.display_order,
  status = excluded.status;

insert into public.mweb_ritual_use_cases (
  ritual_id,
  group_label,
  icon_name,
  title,
  subtitle,
  price_minor,
  currency,
  is_popular,
  display_order,
  status
)
values
  (
    (select id from public.rituals where slug = 'examBlessings'),
    'Career & money',
    'briefcase',
    'New job',
    'Start the new chapter protected',
    25100,
    'INR',
    false,
    1,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'examBlessings'),
    'Career & money',
    'door',
    'First day at work',
    'Walk in on the right foot',
    25100,
    'INR',
    true,
    2,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'examBlessings'),
    'Exams & study',
    'pencil',
    'Exam day',
    'Calm focus when it counts',
    25100,
    'INR',
    true,
    3,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'examBlessings'),
    'Career & money',
    'chat',
    'Job interview',
    'Steady nerves, clear head',
    35100,
    'INR',
    true,
    4,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'nazarUttaro'),
    'When it feels off',
    'eyeoff',
    'Feeling off lately',
    'Clear the heavy energy',
    19900,
    'INR',
    true,
    5,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'nazarUttaro'),
    'When it feels off',
    'trenddown',
    'A losing streak',
    'Break the run of bad luck',
    19900,
    'INR',
    true,
    6,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'nazarUttaro'),
    'Home & family',
    'baby',
    'New baby at home',
    'Shield the little one',
    29900,
    'INR',
    false,
    7,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'nazarUttaro'),
    'Home & family',
    'car',
    'New vehicle',
    'Remove envy before the first drive',
    19900,
    'INR',
    false,
    8,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'grihaPravesh'),
    'Home & business',
    'home',
    'New home / griha pravesh',
    'Clear and bless the space before you move in',
    35100,
    'INR',
    true,
    9,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'newCarBlessing'),
    'Home & business',
    'car',
    'New vehicle',
    'Auspicious first drive',
    45100,
    'INR',
    false,
    10,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'videoBlessing'),
    'Remote rituals',
    'video',
    'Live video blessing',
    'Join pandit ji from home',
    25100,
    'INR',
    true,
    11,
    'active'
  ),
  (
    (select id from public.rituals where slug = 'homeHavan'),
    'Remote rituals',
    'flame',
    'Guided home havan',
    'Sacred fire ritual with preparation support',
    55100,
    'INR',
    false,
    12,
    'active'
  )
on conflict (ritual_id, title) do update set
  group_label = excluded.group_label,
  icon_name = excluded.icon_name,
  subtitle = excluded.subtitle,
  price_minor = excluded.price_minor,
  currency = excluded.currency,
  is_popular = excluded.is_popular,
  display_order = excluded.display_order,
  status = excluded.status;

insert into public.mweb_time_slots (
  ritual_id,
  slot_date,
  slot_time,
  label,
  is_auspicious,
  capacity,
  booked_count,
  status
)
select
  r.id,
  slot_date,
  slot_time,
  label,
  is_auspicious,
  50,
  0,
  'open'
from public.rituals r
cross join (
  values
    ('2026-07-03'::date, '08:12'::time, 'Morning', false),
    ('2026-07-03'::date, '11:54'::time, 'Abhijit Muhurat', true),
    ('2026-07-03'::date, '16:21'::time, 'Evening', false),
    ('2026-07-04'::date, '11:54'::time, 'Abhijit Muhurat', true),
    ('2026-07-07'::date, '10:30'::time, 'Auspicious', true),
    ('2026-07-11'::date, '11:54'::time, 'Abhijit Muhurat', true),
    ('2026-07-18'::date, '18:08'::time, 'Evening', false),
    ('2026-07-27'::date, '11:54'::time, 'Abhijit Muhurat', true)
) as slots(slot_date, slot_time, label, is_auspicious)
where r.slug in ('nazarUttaro', 'examBlessings', 'videoBlessing', 'grihaPravesh', 'homeHavan', 'newCarBlessing')
on conflict (ritual_id, slot_date, slot_time) do update set
  label = excluded.label,
  is_auspicious = excluded.is_auspicious,
  capacity = excluded.capacity,
  status = excluded.status;

insert into public.faqs (question, answer, category, display_order, status)
values
  (
    'So, how does this actually work?',
    'A verified pandit performs your chosen ritual in your name at a good time. You get booking status and video/certificate delivery when the ritual is complete.',
    'mweb',
    10,
    'active'
  ),
  (
    'What do I have to do?',
    'Choose a moment, pick a time, verify your phone with OTP, and complete payment. We handle pandit assignment and ritual tracking.',
    'mweb',
    11,
    'active'
  ),
  (
    'What is the OTP for dev?',
    'For this development build, the OTP is 1234. Later this same flow will use Twilio.',
    'mweb',
    12,
    'active'
  )
on conflict do nothing;
