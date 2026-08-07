import { inject } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats, NativeDateAdapter } from '@angular/material/core';
import { RegionDateService } from './region-date.service';

const REGION_DATE_INPUT_FORMAT = { regionDateInput: true } as const;

function isRegionDateInputFormat(displayFormat: unknown): boolean {
  return (
    typeof displayFormat === 'object' &&
    displayFormat !== null &&
    'regionDateInput' in displayFormat
  );
}

export const REGION_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: REGION_DATE_INPUT_FORMAT,
  },
  display: {
    dateInput: REGION_DATE_INPUT_FORMAT,
    monthYearLabel: { month: 'short', year: 'numeric' },
    dateA11yLabel: { day: 'numeric', month: 'long', year: 'numeric' },
    monthYearA11yLabel: { month: 'long', year: 'numeric' },
  },
};

export class RegionDateAdapter extends NativeDateAdapter {
  private readonly regionDateService = inject(RegionDateService);

  override parse(value: unknown): Date | null {
    return this.regionDateService.parseDate(value);
  }

  override deserialize(value: unknown): Date | null {
    return this.regionDateService.parseDate(value);
  }

  override format(date: Date, displayFormat: object): string {
    if (!this.isValid(date)) {
      return '';
    }

    if (isRegionDateInputFormat(displayFormat)) {
      return this.regionDateService.formatDate(date);
    }

    return super.format(date, displayFormat);
  }
}

export const REGION_DATE_PROVIDERS = [
  { provide: DateAdapter, useClass: RegionDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: REGION_DATE_FORMATS },
];