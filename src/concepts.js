// src/concepts.js

export const concepts = [
  {
    id: 'venue-teaser',
    name: 'Venue Teaser',
    slides: [
      'sm_lkd_venue_teaser_1.png',
      'sm_lkd_venue_teaser_2.png',
      'sm_lkd_venue_teaser_3.png',
    ],
  },
  {
    id: 'countdown',
    name: 'Countdown',
    slides: [
      'sm_lkd_countdown_2weeks.png',
      'sm_lkd_countdown_6days.png',
      'sm_lkd_countdown_2days.png',
    ],
  },
  {
    id: 'ticket',
    name: 'Ticket Announcement',
    slides: ['sm_lkd_ticket.png'],
  },
  {
    id: 'general-info',
    name: 'General Information',
    slides: ['sm_lkd_announcements.png'],
  },
  {
    id: 'sponsor',
    name: 'Sponsor Announcement',
    slides: ['sm_lkd_sponsor_announcement.png'],
  },
  {
    id: 'tips',
    name: 'Tips',
    slides: ['sm_lkd_tips_c.png'],
  },
  {
    id: 'speaker-a',
    name: 'Speaker Spotlight — Concept A',
    slides: [
      'sm_lkd_speaker_1_A.png',
      'sm_lkd_speaker_2_A.png',
      'sm_lkd_speaker_3_A.png',
    ],
  },
  {
    id: 'speaker-b',
    name: 'Speaker Spotlight — Concept B',
    slides: [
      'sm_lkd_speaker_1_B.png',
      'sm_lkd_speaker_2_B.png',
      'sm_lkd_speaker_3_B.png',
    ],
  },
  {
    id: 'speaker-c',
    name: 'Speaker Spotlight — Concept C',
    slides: [
      'sm_lkd_speaker_1_C.png',
      'sm_lkd_speaker_2_C.png',
      'sm_lkd_speaker_3_C.png',
    ],
  },
  {
    id: 'speaker-batch',
    name: 'Speaker Batch',
    slides: ['sm_lkd_speaker_batch.png'],
  },
]

/**
 * Flat list of all slides across all concepts, in order.
 * Each entry: { conceptId, conceptName, filename, globalIndex }
 */
export const flatSlides = concepts.flatMap((concept) =>
  concept.slides.map((filename) => ({
    conceptId: concept.id,
    conceptName: concept.name,
    filename,
  }))
).map((slide, i) => ({ ...slide, globalIndex: i }))

/**
 * Returns the globalIndex of the first slide of a given conceptId.
 * Returns 0 if not found.
 */
export function firstSlideIndex(conceptId) {
  const idx = flatSlides.findIndex((s) => s.conceptId === conceptId)
  return idx === -1 ? 0 : idx
}
