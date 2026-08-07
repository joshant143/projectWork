import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FieldConfig } from '../../models/region.model';
import { REGION_DATE_PROVIDERS } from '../../services/region-date-adapter';
import { RegionDateService } from '../../services/region-date.service';

@Component({
  selector: 'app-trip-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  providers: REGION_DATE_PROVIDERS,
  templateUrl: './trip-info-page.html',
  styleUrls: ['./trip-info-page.css'],
})
export class TripInfoPage {
  readonly regionDateService = inject(RegionDateService);

  @Input({ required: true })
  group!: FormGroup;

  @Input({ required: true })
  config: FieldConfig[] = [];
}
