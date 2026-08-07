import { Injectable, signal } from '@angular/core';
import { RegionName } from '../models/region.model';

const MONTH_INDEX_BY_NAME: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

@Injectable({
  providedIn: 'root',
})
export class RegionDateService {
  private readonly activeRegionSignal = signal<RegionName | null>(null);

  setActiveRegion(region: RegionName | null): void {
    this.activeRegionSignal.set(region);
  }

  getActiveRegion(): RegionName | null {
    return this.activeRegionSignal();
  }

  getDatePlaceholder(region: RegionName | null = this.getActiveRegion()): string {
    return region === 'AME' ? 'DD Month YYYY' : 'Month DD, YYYY';
  }

  formatDate(date: Date, region: RegionName | null = this.getActiveRegion()): string {
    const normalizedRegion = region ?? 'ANZ';
    const locale = normalizedRegion === 'AME' ? 'en-GB' : 'en-US';
    const options: Intl.DateTimeFormatOptions =
      normalizedRegion === 'AME'
        ? { day: '2-digit', month: 'long', year: 'numeric' }
        : { month: 'long', day: '2-digit', year: 'numeric' };

    return new Intl.DateTimeFormat(locale, options).format(date);
  }

  parseDate(value: unknown, region: RegionName | null = this.getActiveRegion()): Date | null {
    if (value == null || value === '') {
      return null;
    }

    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value;
    }

    if (typeof value === 'number') {
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? null : date;
    }

    if (typeof value !== 'string') {
      return null;
    }

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return null;
    }

    const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmedValue);

    if (isoMatch) {
      const [, year, month, day] = isoMatch;
      return this.createDate(Number(year), Number(month) - 1, Number(day));
    }

    const preferredNamedDate =
      region === 'AME'
        ? this.parseDayMonthYear(trimmedValue)
        : this.parseMonthDayYear(trimmedValue);

    if (preferredNamedDate) {
      return preferredNamedDate;
    }

    const alternateNamedDate =
      region === 'AME'
        ? this.parseMonthDayYear(trimmedValue)
        : this.parseDayMonthYear(trimmedValue);

    if (alternateNamedDate) {
      return alternateNamedDate;
    }

    const parsedTimestamp = Date.parse(trimmedValue);

    if (Number.isNaN(parsedTimestamp)) {
      return null;
    }

    const parsedDate = new Date(parsedTimestamp);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  private parseMonthDayYear(value: string): Date | null {
    const match = /^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/.exec(value);

    if (!match) {
      return null;
    }

    const [, monthName, day, year] = match;
    const monthIndex = MONTH_INDEX_BY_NAME[monthName.toLowerCase()];

    if (monthIndex == null) {
      return null;
    }

    return this.createDate(Number(year), monthIndex, Number(day));
  }

  private parseDayMonthYear(value: string): Date | null {
    const match = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(value);

    if (!match) {
      return null;
    }

    const [, day, monthName, year] = match;
    const monthIndex = MONTH_INDEX_BY_NAME[monthName.toLowerCase()];

    if (monthIndex == null) {
      return null;
    }

    return this.createDate(Number(year), monthIndex, Number(day));
  }

  private createDate(year: number, monthIndex: number, day: number): Date | null {
    const date = new Date(year, monthIndex, day);

    if (
      Number.isNaN(date.getTime()) ||
      date.getFullYear() !== year ||
      date.getMonth() !== monthIndex ||
      date.getDate() !== day
    ) {
      return null;
    }

    return date;
  }
}