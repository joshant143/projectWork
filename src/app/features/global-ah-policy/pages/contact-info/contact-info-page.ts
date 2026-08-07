import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FieldConfig } from '../../models/region.model';
import { REGION_DATE_PROVIDERS } from '../../services/region-date-adapter';
import { RegionDateService } from '../../services/region-date.service';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: REGION_DATE_PROVIDERS,
  templateUrl: './contact-info-page.html',
  styleUrls: ['./contact-info-page.css'],
})
export class ContactInfoPage {
  readonly regionDateService = inject(RegionDateService);

  @Input() group!: FormGroup;

  @Input({ required: true })
  config: FieldConfig[] = [];
}
