import type { CrudConfig } from '@/lib/adminCrud';

export const compositionsConfig: CrudConfig = {
  table: 'compositions',
  orderBy: 'rowid',
  columns: [
    { column: 'title', field: 'title', default: '' },
    { column: 'description', field: 'description', default: null },
    { column: 'lyrics', field: 'lyrics', default: null },
    { column: 'voice_parts', field: 'voice_parts', default: null, json: true },
    { column: 'pdf_path', field: 'pdf_path', default: null, file: true },
    { column: 'pdf_path_2', field: 'pdf_path_2', default: null, file: true },
    { column: 'pdf_path_3', field: 'pdf_path_3', default: null, file: true },
    { column: 'video_url', field: 'video_url', default: null },
    { column: 'audio_url', field: 'audio_url', default: null, file: true },
  ],
};

export const arrangementsConfig: CrudConfig = {
  table: 'arrangements',
  orderBy: 'rowid',
  columns: [
    { column: 'title', field: 'title', default: '' },
    { column: 'original_composer', field: 'original_composer', default: null },
    { column: 'description', field: 'description', default: null },
    { column: 'lyrics', field: 'lyrics', default: null },
    { column: 'voice_parts', field: 'voice_parts', default: null, json: true },
    { column: 'pdf_path', field: 'pdf_path', default: null, file: true },
    { column: 'pdf_path_2', field: 'pdf_path_2', default: null, file: true },
    { column: 'pdf_path_3', field: 'pdf_path_3', default: null, file: true },
    { column: 'video_url', field: 'video_url', default: null },
    { column: 'audio_url', field: 'audio_url', default: null, file: true },
  ],
};

export const eventsConfig: CrudConfig = {
  table: 'events',
  orderBy: 'start_date ASC',
  columns: [
    { column: 'title', field: 'title', default: '' },
    { column: 'description', field: 'description', default: null },
    { column: 'start_date', field: 'start_date', default: '' },
    { column: 'end_date', field: 'end_date', default: '' },
    { column: 'location', field: 'location', default: null },
    { column: 'event_details_url', field: 'event_details_url', default: null },
  ],
};

export const vocalistAppearancesConfig: CrudConfig = {
  table: 'vocalist_appearances',
  orderBy: 'date ASC',
  columns: [
    { column: 'title', field: 'title', default: '' },
    { column: 'description', field: 'description', default: null },
    { column: 'date', field: 'date', default: '' },
    { column: 'ticket_url', field: 'ticket_url', default: null },
  ],
};

export const gigsConfig: CrudConfig = {
  table: 'gigs',
  orderBy: 'start_date DESC',
  columns: [
    { column: 'choir_name', field: 'choir_name', default: '' },
    { column: 'start_date', field: 'start_date', default: '' },
    { column: 'end_date', field: 'end_date', default: '' },
    { column: 'summary', field: 'summary', default: null },
    { column: 'video_url', field: 'video_url', default: null },
  ],
};
