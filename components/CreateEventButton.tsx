'use client';

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

type CreateEventButtonProps = {
  connected: boolean;
};

type EventForm = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
};

function formatDateInput(date: Date): string {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(
    2,
    '0'
  );

  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getDefaultForm(): EventForm {
  const now = new Date();

  const start = new Date(now);
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() + 1);

  const end = new Date(start);
  end.setHours(end.getHours() + 1);

  return {
    title: '',
    date: formatDateInput(start),

    startTime: `${String(start.getHours()).padStart(
      2,
      '0'
    )}:00`,

    endTime: `${String(end.getHours()).padStart(
      2,
      '0'
    )}:00`,

    location: '',
    description: '',
  };
}

export default function CreateEventButton({
  connected,
}: CreateEventButtonProps) {
  const router = useRouter();

  const initialForm = useMemo(
    () => getDefaultForm(),
    []
  );

  const [open, setOpen] = useState(false);

  const [form, setForm] =
    useState<EventForm>(initialForm);

  const [saving, setSaving] = useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !saving) {
        setOpen(false);
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );

      document.body.style.overflow = '';
    };
  }, [open, saving]);

  function updateField(
    field: keyof EventForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function closeModal() {
    if (saving) {
      return;
    }

    setOpen(false);
    setError(null);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    if (!form.title.trim()) {
      setError('Add an event title.');
      return;
    }

    const start = new Date(
      `${form.date}T${form.startTime}`
    );

    const end = new Date(
      `${form.date}T${form.endTime}`
    );

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      setError('Choose a valid date and time.');
      return;
    }

    if (end.getTime() <= start.getTime()) {
      setError(
        'The event must end after it starts.'
      );

      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        '/api/calendar/events',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            title: form.title,
            start: start.toISOString(),
            end: end.toISOString(),
            location: form.location,
            description: form.description,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(
          result.error ||
            'The event could not be created.'
        );
      }

      setForm(getDefaultForm());
      setOpen(false);

      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'The event could not be created.'
      );
    } finally {
      setSaving(false);
    }
  }

  if (!connected) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError(null);
          setOpen(true);
        }}
        className="
          group
          relative
          overflow-hidden
          rounded-full
          border
          border-[#ffffff42]
          bg-[#ffffff17]
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          shadow-[inset_0_1px_0_#ffffff3b,0_12px_28px_#00000042]
          backdrop-blur-[22px]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#f5c98a85]
          hover:bg-[#ffffff29]
          hover:shadow-[inset_0_1px_0_#ffffff55,0_18px_38px_#00000059,0_0_26px_#f5bd7a2b]
        "
      >
        <span className="relative flex items-center gap-2">
          <span className="text-lg leading-none transition-transform duration-300 group-hover:rotate-90">
            +
          </span>

          Add to calendar
        </span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-event-title"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#02050c99] p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (
              event.currentTarget === event.target
            ) {
              closeModal();
            }
          }}
        >
          <div className="relative my-auto w-full max-w-[680px] overflow-hidden rounded-[32px] border border-[#ffffff42] bg-[#111827d9] p-6 shadow-[inset_0_1px_0_#ffffff3b,0_28px_90px_#0000008c,0_0_50px_#f5bd7a17] backdrop-blur-[38px] backdrop-saturate-[145%] md:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />

            <div className="relative flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-100/75">
                  Google Calendar
                </p>

                <h2
                  id="create-event-title"
                  className="font-display mt-3 text-4xl leading-none text-white md:text-5xl"
                >
                  Add to your day
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-6 text-sky-100/65">
                  Create it here and Vesta will add
                  it to your primary Google
                  Calendar.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                aria-label="Close event form"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#ffffff30] bg-[#ffffff10] text-xl text-white/75 transition hover:border-[#ffffff59] hover:bg-[#ffffff20] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative mt-8 space-y-5"
            >
              <label className="block">
                <span className="text-sm font-medium text-white">
                  What’s happening?
                </span>

                <input
                  type="text"
                  value={form.title}
                  autoFocus
                  placeholder="Dinner, appointment, school event..."
                  onChange={(event) =>
                    updateField(
                      'title',
                      event.target.value
                    )
                  }
                  className="mt-2 w-full rounded-[20px] border border-[#ffffff2b] bg-[#ffffff0d] px-4 py-3.5 text-base text-white outline-none backdrop-blur-xl transition placeholder:text-white/35 focus:border-[#f5c98a80] focus:bg-[#ffffff17] focus:shadow-[0_0_24px_#f5bd7a1f]"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="block">
                  <span className="text-sm font-medium text-white">
                    Date
                  </span>

                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      updateField(
                        'date',
                        event.target.value
                      )
                    }
                    className="mt-2 w-full rounded-[20px] border border-[#ffffff2b] bg-[#ffffff0d] px-4 py-3.5 text-sm text-white outline-none backdrop-blur-xl transition focus:border-[#f5c98a80] focus:bg-[#ffffff17]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-white">
                    Starts
                  </span>

                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(event) =>
                      updateField(
                        'startTime',
                        event.target.value
                      )
                    }
                    className="mt-2 w-full rounded-[20px] border border-[#ffffff2b] bg-[#ffffff0d] px-4 py-3.5 text-sm text-white outline-none backdrop-blur-xl transition focus:border-[#f5c98a80] focus:bg-[#ffffff17]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-white">
                    Ends
                  </span>

                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(event) =>
                      updateField(
                        'endTime',
                        event.target.value
                      )
                    }
                    className="mt-2 w-full rounded-[20px] border border-[#ffffff2b] bg-[#ffffff0d] px-4 py-3.5 text-sm text-white outline-none backdrop-blur-xl transition focus:border-[#f5c98a80] focus:bg-[#ffffff17]"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-white">
                  Location
                </span>

                <input
                  type="text"
                  value={form.location}
                  placeholder="Optional"
                  onChange={(event) =>
                    updateField(
                      'location',
                      event.target.value
                    )
                  }
                  className="mt-2 w-full rounded-[20px] border border-[#ffffff2b] bg-[#ffffff0d] px-4 py-3.5 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-white/35 focus:border-[#f5c98a80] focus:bg-[#ffffff17]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-white">
                  Notes
                </span>

                <textarea
                  value={form.description}
                  rows={4}
                  placeholder="Anything the household needs to know..."
                  onChange={(event) =>
                    updateField(
                      'description',
                      event.target.value
                    )
                  }
                  className="mt-2 w-full resize-none rounded-[20px] border border-[#ffffff2b] bg-[#ffffff0d] px-4 py-3.5 text-sm leading-6 text-white outline-none backdrop-blur-xl transition placeholder:text-white/35 focus:border-[#f5c98a80] focus:bg-[#ffffff17]"
                />
              </label>

              {error ? (
                <div
                  role="alert"
                  className="rounded-[20px] border border-[#fecaca40] bg-[#450a0a80] px-4 py-3 text-sm leading-6 text-red-100"
                >
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-full border border-[#ffffff30] bg-[#ffffff0b] px-5 py-3 text-sm font-medium text-white/75 transition hover:border-[#ffffff52] hover:bg-[#ffffff17] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full border border-[#f5c98a70] bg-[#f5bd7a26] px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_#ffffff35,0_12px_28px_#00000042,0_0_22px_#f5bd7a1c] transition hover:-translate-y-0.5 hover:border-[#f5c98aa6] hover:bg-[#f5bd7a38] hover:shadow-[inset_0_1px_0_#ffffff52,0_16px_35px_#00000055,0_0_28px_#f5bd7a35] disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {saving
                    ? 'Adding…'
                    : 'Add to Google Calendar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}