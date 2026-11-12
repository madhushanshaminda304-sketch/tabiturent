import { AdmissionsDeadline } from '../types';

const MONTHS_MAP: Record<string, string> = {
  'января': '01',
  'февраля': '02',
  'марта': '03',
  'апреля': '04',
  'мая': '05',
  'июня': '06',
  'июля': '07',
  'августа': '08',
  'сентября': '09',
  'октября': '10',
  'ноября': '11',
  'декабря': '12'
};

/**
 * Parses a Russian date string like "20 июня 2026" or "7 июля 2026" + "18:00 МСК" into ISO and RFC 5545 string.
 */
export function parseDeadlineToIcsDates(dateStr: string, timeStr?: string): { dtstart: string; dtend: string } {
  // Defaults to 2026-07-01T09:00:00Z if parsing fails
  let year = '2026';
  let month = '07';
  let day = '01';
  let hour = '09';
  let minute = '00';

  const parts = dateStr.trim().split(/\s+/);
  if (parts.length >= 3) {
    day = parts[0].padStart(2, '0');
    const monthName = parts[1].toLowerCase();
    month = MONTHS_MAP[monthName] || '07';
    year = parts[2];
  }

  if (timeStr) {
    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      // MSK is UTC+3, so convert to UTC for RFC 5545
      const mskHour = parseInt(timeMatch[1], 10);
      const utcHour = Math.max(0, mskHour - 3);
      hour = utcHour.toString().padStart(2, '0');
      minute = timeMatch[2];
    }
  }

  const dtstart = `${year}${month}${day}T${hour}${minute}00Z`;
  // Default duration of 2 hours for event end
  const endHour = (parseInt(hour, 10) + 2).toString().padStart(2, '0');
  const dtend = `${year}${month}${day}T${endHour}${minute}00Z`;

  return { dtstart, dtend };
}

/**
 * Generates an RFC 5545 compliant VEVENT string with DTSTART, DTEND, DTSTAMP and VALARM.
 */
export function generateIcsVEvent(event: AdmissionsDeadline): string {
  const { dtstart, dtend } = parseDeadlineToIcsDates(event.date, event.time);
  const nowStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return `BEGIN:VEVENT
UID:${event.id}-2026@unipedia-lab.local
DTSTAMP:${nowStamp}
DTSTART:${dtstart}
DTEND:${dtend}
SUMMARY:${event.title}
DESCRIPTION:${event.description}\\nОфициальный документ: ${event.officialDocument}\\nЭтап: ${event.stage}
STATUS:CONFIRMED
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Напоминание: ${event.title}
TRIGGER:-PT24H
END:VALARM
END:VEVENT`;
}

/**
 * Generates full RFC 5545 iCalendar content for single or multiple deadlines.
 */
export function buildIcsCalendar(events: AdmissionsDeadline[], calendarTitle: string): string {
  const vevents = events.map(generateIcsVEvent).join('\n');
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//UniPedia Lab//Admissions Calendar 2026//RU
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${calendarTitle}
${vevents}
END:VCALENDAR`;
}
