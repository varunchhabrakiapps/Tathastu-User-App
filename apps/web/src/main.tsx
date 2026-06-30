import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  BadgeCheck,
  Bell,
  Briefcase,
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  Flame,
  Heart,
  HelpCircle,
  Home,
  Landmark,
  Loader2,
  Lock,
  MapPin,
  Play,
  Search,
  Shield,
  Sparkles,
  Star,
  UserRound,
  WalletCards,
} from 'lucide-react';

import { supabase } from './supabase';
import './styles.css';

type Step = 'home' | 'ritual' | 'time' | 'phone' | 'otp' | 'payment' | 'confirm' | 'status';

type Ritual = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  short_description: string | null;
  description: string | null;
  duration_minutes: number | null;
  starting_price_minor: number | null;
  currency: string | null;
};

type HomeBanner = {
  id: string;
  ritual_id: string | null;
  badge: string;
  title: string;
  subtitle: string;
  visual_tone: string;
};

type UseCase = {
  id: string;
  ritual_id: string;
  group_label: string;
  icon_name: string;
  title: string;
  subtitle: string;
  price_minor: number;
  currency: string;
  is_popular: boolean;
};

type TimeSlot = {
  id: string;
  ritual_id: string | null;
  slot_date: string;
  slot_time: string;
  label: string | null;
  is_auspicious: boolean;
};

type Faq = {
  id: string;
  question: string;
  answer: string;
};

type Catalog = {
  rituals: Ritual[];
  banners: HomeBanner[];
  useCases: UseCase[];
  slots: TimeSlot[];
  faqs: Faq[];
};

type Challenge = {
  challenge_id: string;
  phone: string;
  expires_at: string;
  dev_otp: string;
};

type Lead = {
  lead_id: string;
  phone: string;
  verified_at: string;
};

type Booking = {
  booking_id: string;
  booking_number: string;
  status: string;
};

type BookingReadback = {
  booking_id: string;
  booking_number: string;
  ritual_title: string;
  use_case_title: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  amount_minor: number;
  currency: string;
  status: string;
  created_at: string;
};

const fallbackCatalog: Catalog = {
  rituals: [],
  banners: [],
  useCases: [],
  slots: [],
  faqs: [],
};

const iconMap = {
  briefcase: Briefcase,
  car: Car,
  flame: Flame,
  heart: Heart,
  home: Home,
  shield: Shield,
  sparkles: Sparkles,
  video: Play,
  eyeoff: Shield,
  trenddown: Sparkles,
  baby: Heart,
  door: Landmark,
  pencil: BadgeCheck,
  chat: HelpCircle,
};

function formatMoney(minor?: number | null, currency = 'INR') {
  const value = Math.round((minor ?? 0) / 100);
  if (currency === 'INR') return `Rs ${value}`;
  return `${currency} ${value}`;
}

function formatDate(date?: string | null) {
  if (!date) return 'Flexible';
  return new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }).format(
    new Date(`${date}T00:00:00`),
  );
}

function formatTime(time?: string | null) {
  if (!time) return 'Anytime';
  const [hour, minute] = time.split(':');
  const date = new Date();
  date.setHours(Number(hour), Number(minute), 0, 0);
  return new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' }).format(date);
}

function iconFor(name: string) {
  return iconMap[name as keyof typeof iconMap] ?? Sparkles;
}

function App() {
  const [step, setStep] = useState<Step>('home');
  const [catalog, setCatalog] = useState<Catalog>(fallbackCatalog);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUseCaseId, setSelectedUseCaseId] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [lead, setLead] = useState<Lead | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [readback, setReadback] = useState<BookingReadback | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    loadCatalog()
      .then((nextCatalog) => {
        if (!alive) return;
        setCatalog(nextCatalog);
        setSelectedUseCaseId(nextCatalog.useCases[0]?.id ?? null);
        setSelectedSlotId(nextCatalog.slots[0]?.id ?? null);
      })
      .catch((err: unknown) => {
        if (!alive) return;
        setError(err instanceof Error ? err.message : 'Could not load Sankalp');
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const selectedUseCase = useMemo(
    () => catalog.useCases.find((item) => item.id === selectedUseCaseId) ?? catalog.useCases[0] ?? null,
    [catalog.useCases, selectedUseCaseId],
  );

  const selectedRitual = useMemo(() => {
    if (!selectedUseCase) return catalog.rituals[0] ?? null;
    return catalog.rituals.find((ritual) => ritual.id === selectedUseCase.ritual_id) ?? catalog.rituals[0] ?? null;
  }, [catalog.rituals, selectedUseCase]);

  const selectedSlot = useMemo(
    () =>
      catalog.slots.find((slot) => slot.id === selectedSlotId) ??
      catalog.slots.find((slot) => slot.ritual_id === selectedRitual?.id) ??
      catalog.slots[0] ??
      null,
    [catalog.slots, selectedRitual?.id, selectedSlotId],
  );

  const slotsForRitual = useMemo(() => {
    const filtered = catalog.slots.filter((slot) => slot.ritual_id === selectedRitual?.id || slot.ritual_id === null);
    return filtered.length ? filtered : catalog.slots;
  }, [catalog.slots, selectedRitual?.id]);

  const groupedUseCases = useMemo(() => {
    return catalog.useCases.reduce<Record<string, UseCase[]>>((groups, item) => {
      groups[item.group_label] = [...(groups[item.group_label] ?? []), item];
      return groups;
    }, {});
  }, [catalog.useCases]);

  function chooseUseCase(useCase: UseCase) {
    setSelectedUseCaseId(useCase.id);
    const ritualSlot = catalog.slots.find((slot) => slot.ritual_id === useCase.ritual_id);
    setSelectedSlotId(ritualSlot?.id ?? catalog.slots[0]?.id ?? null);
    setBooking(null);
    setReadback(null);
    setStep('ritual');
  }

  function chooseBanner(banner: HomeBanner) {
    const useCase =
      catalog.useCases.find((item) => item.ritual_id === banner.ritual_id && item.is_popular) ??
      catalog.useCases.find((item) => item.ritual_id === banner.ritual_id) ??
      catalog.useCases[0];
    if (useCase) chooseUseCase(useCase);
  }

  async function requestOtp() {
    setBusy(true);
    setError(null);
    const { data, error: rpcError } = await supabase.rpc('request_mweb_otp', { raw_phone: phone });
    setBusy(false);
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    setChallenge(data?.[0] as Challenge);
    setOtp('');
    setStep('otp');
  }

  async function verifyOtp() {
    if (!challenge) return;
    setBusy(true);
    setError(null);
    const { data, error: rpcError } = await supabase.rpc('verify_mweb_otp', {
      challenge_id: challenge.challenge_id,
      raw_phone: phone,
      code: otp,
      lead_name: name || null,
    });
    setBusy(false);
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    setLead(data?.[0] as Lead);
    setStep('payment');
  }

  async function createBookingAndPay() {
    if (!lead || !selectedRitual) return;
    setBusy(true);
    setError(null);

    const bookingResult = await supabase.rpc('create_mweb_booking', {
      p_lead_id: lead.lead_id,
      p_ritual_id: selectedRitual.id,
      p_use_case_id: selectedUseCase?.id ?? null,
      p_slot_id: selectedSlot?.id ?? null,
      p_customer_name: name || 'Sankalp customer',
      p_intent_note: selectedUseCase?.title ?? null,
    });

    if (bookingResult.error) {
      setBusy(false);
      setError(bookingResult.error.message);
      return;
    }

    const nextBooking = bookingResult.data?.[0] as Booking;
    setBooking(nextBooking);

    const paymentResult = await supabase.rpc('mock_pay_mweb_booking', {
      p_lead_id: lead.lead_id,
      p_booking_id: nextBooking.booking_id,
    });

    if (paymentResult.error) {
      setBusy(false);
      setError(paymentResult.error.message);
      return;
    }

    const readResult = await supabase.rpc('get_mweb_booking', {
      p_lead_id: lead.lead_id,
      p_booking_id: nextBooking.booking_id,
    });

    setBusy(false);
    if (readResult.error) {
      setError(readResult.error.message);
      return;
    }

    setReadback(readResult.data?.[0] as BookingReadback);
    setStep('confirm');
  }

  const canContinueToPhone = Boolean(selectedUseCase && selectedSlot);
  const canRequestOtp = phone.replace(/\D/g, '').length >= 10 && name.trim().length > 1;
  const canVerify = otp.trim().length >= 4;

  return (
    <main className="page">
      <section className="mweb-shell">
        {step !== 'home' && (
          <Nav
            title={navTitle(step)}
            onBack={() => setStep(previousStep(step))}
            muted={step === 'confirm' || step === 'status'}
          />
        )}

        {loading && <LoadingView />}
        {!loading && step === 'home' && (
          <HomeScreen
            banners={catalog.banners}
            groupedUseCases={groupedUseCases}
            faqs={catalog.faqs}
            error={error}
            onBanner={chooseBanner}
            onUseCase={chooseUseCase}
            onPrimary={() => catalog.useCases[0] && chooseUseCase(catalog.useCases[0])}
          />
        )}
        {!loading && step === 'ritual' && selectedRitual && selectedUseCase && (
          <RitualScreen
            ritual={selectedRitual}
            selectedUseCase={selectedUseCase}
            relatedUseCases={catalog.useCases.filter((item) => item.ritual_id === selectedRitual.id)}
            onUseCase={chooseUseCase}
            onContinue={() => setStep('time')}
          />
        )}
        {!loading && step === 'time' && selectedRitual && selectedUseCase && (
          <TimeScreen
            ritual={selectedRitual}
            useCase={selectedUseCase}
            slots={slotsForRitual}
            selectedSlotId={selectedSlotId}
            onSlot={setSelectedSlotId}
            onContinue={() => canContinueToPhone && setStep('phone')}
          />
        )}
        {!loading && step === 'phone' && selectedUseCase && selectedSlot && (
          <PhoneScreen
            phone={phone}
            name={name}
            error={error}
            busy={busy}
            useCase={selectedUseCase}
            slot={selectedSlot}
            onName={setName}
            onPhone={setPhone}
            onContinue={requestOtp}
            canContinue={canRequestOtp}
          />
        )}
        {!loading && step === 'otp' && challenge && (
          <OtpScreen
            challenge={challenge}
            otp={otp}
            busy={busy}
            error={error}
            onOtp={setOtp}
            onVerify={verifyOtp}
            canVerify={canVerify}
          />
        )}
        {!loading && step === 'payment' && selectedRitual && selectedUseCase && selectedSlot && (
          <PaymentScreen
            ritual={selectedRitual}
            useCase={selectedUseCase}
            slot={selectedSlot}
            busy={busy}
            error={error}
            onPay={createBookingAndPay}
          />
        )}
        {!loading && step === 'confirm' && readback && (
          <ConfirmScreen booking={readback} onStatus={() => setStep('status')} onHome={() => setStep('home')} />
        )}
        {!loading && step === 'status' && readback && (
          <StatusScreen booking={readback} onHome={() => setStep('home')} />
        )}
      </section>
    </main>
  );
}

async function loadCatalog(): Promise<Catalog> {
  const [rituals, banners, useCases, slots, faqs] = await Promise.all([
    supabase
      .from('rituals')
      .select('id,slug,title,subtitle,short_description,description,duration_minutes,starting_price_minor,currency')
      .eq('status', 'active')
      .order('trending_rank', { ascending: true, nullsFirst: false }),
    supabase
      .from('mweb_home_banners')
      .select('id,ritual_id,badge,title,subtitle,visual_tone')
      .eq('status', 'active')
      .order('display_order'),
    supabase
      .from('mweb_ritual_use_cases')
      .select('id,ritual_id,group_label,icon_name,title,subtitle,price_minor,currency,is_popular')
      .eq('status', 'active')
      .order('display_order'),
    supabase
      .from('mweb_time_slots')
      .select('id,ritual_id,slot_date,slot_time,label,is_auspicious')
      .eq('status', 'open')
      .order('slot_date')
      .order('slot_time'),
    supabase.from('faqs').select('id,question,answer').eq('status', 'active').eq('category', 'mweb').order('display_order'),
  ]);

  for (const result of [rituals, banners, useCases, slots, faqs]) {
    if (result.error) throw result.error;
  }

  return {
    rituals: (rituals.data ?? []) as Ritual[],
    banners: (banners.data ?? []) as HomeBanner[],
    useCases: (useCases.data ?? []) as UseCase[],
    slots: (slots.data ?? []) as TimeSlot[],
    faqs: (faqs.data ?? []) as Faq[],
  };
}

function navTitle(step: Step) {
  const titles: Record<Step, string> = {
    home: 'Sankalp',
    ritual: 'Ritual details',
    time: 'Choose time',
    phone: 'Verify phone',
    otp: 'Enter OTP',
    payment: 'Payment',
    confirm: 'Confirmed',
    status: 'Booking status',
  };
  return titles[step];
}

function previousStep(step: Step): Step {
  const previous: Record<Step, Step> = {
    home: 'home',
    ritual: 'home',
    time: 'ritual',
    phone: 'time',
    otp: 'phone',
    payment: 'otp',
    confirm: 'home',
    status: 'confirm',
  };
  return previous[step];
}

function Nav({ title, onBack, muted = false }: { title: string; onBack: () => void; muted?: boolean }) {
  return (
    <header className="nav">
      <button className="icon-button" onClick={onBack} aria-label="Go back" disabled={muted}>
        <ArrowLeft />
      </button>
      <strong>{title}</strong>
      <button className="icon-button" aria-label="Notifications">
        <Bell />
      </button>
    </header>
  );
}

function LoadingView() {
  return (
    <div className="center-state">
      <Loader2 className="spin" />
      <p>Preparing your Sankalp...</p>
    </div>
  );
}

function HomeScreen({
  banners,
  groupedUseCases,
  faqs,
  error,
  onBanner,
  onUseCase,
  onPrimary,
}: {
  banners: HomeBanner[];
  groupedUseCases: Record<string, UseCase[]>;
  faqs: Faq[];
  error: string | null;
  onBanner: (banner: HomeBanner) => void;
  onUseCase: (useCase: UseCase) => void;
  onPrimary: () => void;
}) {
  const firstGroup = Object.entries(groupedUseCases)[0];
  return (
    <>
      <div className="scroll-area with-home-cta">
        <div className="home-top">
          <div className="location-pill">
            <MapPin />
            Mumbai
          </div>
          <button className="icon-button" aria-label="Search">
            <Search />
          </button>
        </div>

        <section className="greeting">
          <span>Sankalp</span>
          <h1>Choose the moment. We handle the ritual.</h1>
          <p>Verified pandits, dummy OTP for now, and booking status powered by Supabase.</p>
        </section>

        {error && <InlineError message={error} />}

        <section className="banner-track" aria-label="Featured rituals">
          {banners.map((banner) => (
            <button
              key={banner.id}
              className={`hero-card tone-${banner.visual_tone}`}
              onClick={() => onBanner(banner)}
            >
              <div className="hero-art">
                <Mandala />
                <span>{banner.badge}</span>
              </div>
              <div className="hero-copy">
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
              </div>
            </button>
          ))}
        </section>

        <SectionTitle eyebrow="Browse by moment" title="What is happening right now?" />
        {Object.entries(groupedUseCases).map(([group, items]) => (
          <section key={group} className="moment-group">
            <h3>{group}</h3>
            {items.slice(0, group === firstGroup?.[0] ? 4 : 3).map((item) => (
              <UseCaseRow key={item.id} item={item} onClick={() => onUseCase(item)} />
            ))}
          </section>
        ))}

        <section className="trust-card">
          <div>
            <Shield />
            <strong>How it works</strong>
          </div>
          <ol>
            <li>Pick a moment and muhurat.</li>
            <li>Verify phone with OTP 1234.</li>
            <li>Pay and track the ritual status.</li>
          </ol>
        </section>

        <SectionTitle eyebrow="Questions" title="Before you book" />
        <section className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.id}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>
      </div>

      <footer className="home-cta">
        <div>
          <span>Ready in 2 minutes</span>
          <strong>Start with Raksha Kavach</strong>
        </div>
        <button className="primary-button" onClick={onPrimary}>
          Begin
          <ChevronRight />
        </button>
      </footer>
    </>
  );
}

function RitualScreen({
  ritual,
  selectedUseCase,
  relatedUseCases,
  onUseCase,
  onContinue,
}: {
  ritual: Ritual;
  selectedUseCase: UseCase;
  relatedUseCases: UseCase[];
  onUseCase: (useCase: UseCase) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <div className="scroll-area with-bar">
        <section className="ritual-hero">
          <Mandala />
          <span>{selectedUseCase.group_label}</span>
          <h1>{ritual.title}</h1>
          <p>{ritual.short_description ?? ritual.description}</p>
        </section>

        <section className="selected-card">
          <div className="mini-icon">
            {React.createElement(iconFor(selectedUseCase.icon_name))}
          </div>
          <div>
            <span>Selected sankalp</span>
            <h2>{selectedUseCase.title}</h2>
            <p>{selectedUseCase.subtitle}</p>
          </div>
          <strong>{formatMoney(selectedUseCase.price_minor, selectedUseCase.currency)}</strong>
        </section>

        <SectionTitle eyebrow="Includes" title="Built for low-friction booking" />
        <section className="info-grid">
          <InfoTile icon={<BadgeCheck />} title="Verified pandit" text="Manual assignment in Phase 1." />
          <InfoTile icon={<Clock3 />} title="Status tracking" text="Booking moves from paid to assignment." />
          <InfoTile icon={<Lock />} title="Phone verified" text="Dummy OTP now, Twilio later." />
        </section>

        {relatedUseCases.length > 1 && (
          <>
            <SectionTitle eyebrow="Similar moments" title="Tune the intent" />
            <section className="compact-list">
              {relatedUseCases.map((item) => (
                <UseCaseRow
                  key={item.id}
                  item={item}
                  active={item.id === selectedUseCase.id}
                  onClick={() => onUseCase(item)}
                />
              ))}
            </section>
          </>
        )}
      </div>
      <BottomBar
        label="Starts at"
        value={formatMoney(selectedUseCase.price_minor, selectedUseCase.currency)}
        action="Choose time"
        onAction={onContinue}
      />
    </>
  );
}

function TimeScreen({
  ritual,
  useCase,
  slots,
  selectedSlotId,
  onSlot,
  onContinue,
}: {
  ritual: Ritual;
  useCase: UseCase;
  slots: TimeSlot[];
  selectedSlotId: string | null;
  onSlot: (id: string) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <div className="scroll-area with-bar">
        <section className="time-summary">
          <span>{ritual.title}</span>
          <h1>{useCase.title}</h1>
          <p>Choose a slot. The backend reserves capacity when your booking is created after OTP.</p>
        </section>

        <section className="slot-list">
          {slots.map((slot) => (
            <button
              key={slot.id}
              className={`slot-card ${slot.id === selectedSlotId ? 'active' : ''}`}
              onClick={() => onSlot(slot.id)}
            >
              <CalendarDays />
              <div>
                <strong>{formatDate(slot.slot_date)}</strong>
                <span>{slot.label ?? 'Open slot'}</span>
              </div>
              <em>{formatTime(slot.slot_time)}</em>
              {slot.is_auspicious && <small>Auspicious</small>}
            </button>
          ))}
        </section>
      </div>
      <BottomBar
        label="For"
        value={formatMoney(useCase.price_minor, useCase.currency)}
        action="Verify phone"
        onAction={onContinue}
      />
    </>
  );
}

function PhoneScreen({
  phone,
  name,
  error,
  busy,
  useCase,
  slot,
  onName,
  onPhone,
  onContinue,
  canContinue,
}: {
  phone: string;
  name: string;
  error: string | null;
  busy: boolean;
  useCase: UseCase;
  slot: TimeSlot;
  onName: (value: string) => void;
  onPhone: (value: string) => void;
  onContinue: () => void;
  canContinue: boolean;
}) {
  return (
    <div className="form-screen">
      <section className="form-card">
        <span>Phone verification</span>
        <h1>Where should we send the OTP?</h1>
        <p>
          Booking {useCase.title} for {formatDate(slot.slot_date)} at {formatTime(slot.slot_time)}.
        </p>
        <label>
          Name
          <input value={name} onChange={(event) => onName(event.target.value)} placeholder="Your name" />
        </label>
        <label>
          Mobile number
          <input
            value={phone}
            onChange={(event) => onPhone(event.target.value)}
            inputMode="tel"
            placeholder="98765 43210"
          />
        </label>
        {error && <InlineError message={error} />}
        <button className="primary-button full" onClick={onContinue} disabled={!canContinue || busy}>
          {busy ? <Loader2 className="spin" /> : <Lock />}
          Send OTP
        </button>
      </section>
    </div>
  );
}

function OtpScreen({
  challenge,
  otp,
  busy,
  error,
  onOtp,
  onVerify,
  canVerify,
}: {
  challenge: Challenge;
  otp: string;
  busy: boolean;
  error: string | null;
  onOtp: (value: string) => void;
  onVerify: () => void;
  canVerify: boolean;
}) {
  return (
    <div className="form-screen">
      <section className="form-card">
        <span>OTP sent</span>
        <h1>Enter the verification code</h1>
        <p>
          Development OTP for {challenge.phone}: <strong>{challenge.dev_otp}</strong>
        </p>
        <label>
          OTP
          <input
            value={otp}
            onChange={(event) => onOtp(event.target.value)}
            inputMode="numeric"
            maxLength={6}
            placeholder="1234"
          />
        </label>
        {error && <InlineError message={error} />}
        <button className="primary-button full" onClick={onVerify} disabled={!canVerify || busy}>
          {busy ? <Loader2 className="spin" /> : <Check />}
          Verify
        </button>
      </section>
    </div>
  );
}

function PaymentScreen({
  ritual,
  useCase,
  slot,
  busy,
  error,
  onPay,
}: {
  ritual: Ritual;
  useCase: UseCase;
  slot: TimeSlot;
  busy: boolean;
  error: string | null;
  onPay: () => void;
}) {
  return (
    <>
      <div className="scroll-area with-bar">
        <section className="payment-card">
          <WalletCards />
          <span>Secure checkout</span>
          <h1>{formatMoney(useCase.price_minor, useCase.currency)}</h1>
          <p>Mock payment for Phase 1. Razorpay/Cashfree can replace this provider later.</p>
        </section>
        <section className="receipt">
          <LineItem label="Ritual" value={ritual.title} />
          <LineItem label="Intent" value={useCase.title} />
          <LineItem label="Date" value={formatDate(slot.slot_date)} />
          <LineItem label="Time" value={formatTime(slot.slot_time)} />
          <LineItem label="Total" value={formatMoney(useCase.price_minor, useCase.currency)} strong />
        </section>
        {error && <InlineError message={error} />}
      </div>
      <BottomBar
        label="Pay now"
        value={formatMoney(useCase.price_minor, useCase.currency)}
        action={busy ? 'Processing' : 'Mock pay'}
        onAction={onPay}
        disabled={busy}
      />
    </>
  );
}

function ConfirmScreen({
  booking,
  onStatus,
  onHome,
}: {
  booking: BookingReadback;
  onStatus: () => void;
  onHome: () => void;
}) {
  return (
    <div className="success-screen">
      <div className="success-orb">
        <Check />
      </div>
      <span>Booking confirmed</span>
      <h1>{booking.booking_number}</h1>
      <p>
        Your {booking.ritual_title} booking is now <strong>{booking.status.replaceAll('_', ' ')}</strong>.
      </p>
      <section className="receipt">
        <LineItem label="Intent" value={booking.use_case_title ?? 'Sankalp'} />
        <LineItem label="Date" value={formatDate(booking.preferred_date)} />
        <LineItem label="Time" value={formatTime(booking.preferred_time)} />
        <LineItem label="Amount" value={formatMoney(booking.amount_minor, booking.currency)} />
      </section>
      <div className="action-row">
        <button className="secondary-button" onClick={onHome}>
          Home
        </button>
        <button className="primary-button" onClick={onStatus}>
          Track status
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function StatusScreen({ booking, onHome }: { booking: BookingReadback; onHome: () => void }) {
  const steps = ['pending payment', 'pending assignment', 'pandit assigned', 'ritual scheduled', 'completed'];
  return (
    <div className="scroll-area status-view">
      <section className="status-card">
        <span>{booking.booking_number}</span>
        <h1>{booking.ritual_title}</h1>
        <p>Current status: {booking.status.replaceAll('_', ' ')}</p>
      </section>
      <section className="timeline">
        {steps.map((item, index) => (
          <div key={item} className={index < 2 ? 'done' : ''}>
            <i>{index < 2 ? <Check /> : index + 1}</i>
            <span>{item}</span>
          </div>
        ))}
      </section>
      <button className="primary-button full" onClick={onHome}>
        Back home
      </button>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </header>
  );
}

function UseCaseRow({ item, onClick, active = false }: { item: UseCase; onClick: () => void; active?: boolean }) {
  const Icon = iconFor(item.icon_name);
  return (
    <button className={`use-case-row ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="mini-icon">
        <Icon />
      </span>
      <span className="use-case-copy">
        <strong>
          {item.title}
          {item.is_popular && <em>Popular</em>}
        </strong>
        <small>{item.subtitle}</small>
      </span>
      <span className="row-price">{formatMoney(item.price_minor, item.currency)}</span>
      <ChevronRight />
    </button>
  );
}

function InfoTile({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <article className="info-tile">
      {icon}
      <strong>{title}</strong>
      <span>{text}</span>
    </article>
  );
}

function LineItem({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? 'strong' : ''}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function InlineError({ message }: { message: string }) {
  return <div className="inline-error">{message}</div>;
}

function BottomBar({
  label,
  value,
  action,
  onAction,
  disabled = false,
}: {
  label: string;
  value: string;
  action: string;
  onAction: () => void;
  disabled?: boolean;
}) {
  return (
    <footer className="bottom-bar">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <button className="primary-button" onClick={onAction} disabled={disabled}>
        {action}
        <ChevronRight />
      </button>
    </footer>
  );
}

function Mandala() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true" focusable="false">
      <circle cx="120" cy="78" r="58" />
      <circle cx="120" cy="78" r="34" />
      <path d="M31 98c25-30 48-45 69-45 18 0 31 9 39 26 12-24 31-34 56-29 14 3 27 11 40 24" />
      <path d="M120 18v18M84 29l10 16M156 29l-10 16M70 78h100" />
    </svg>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
