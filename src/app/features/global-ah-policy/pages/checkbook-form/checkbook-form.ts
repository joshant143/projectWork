import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { materialImports } from '../../../../shared/materials/material-imports';
import { FieldConfig } from '../../models/region.model';
import { REGION_DATE_PROVIDERS } from '../../services/region-date-adapter';
import { RegionDateService } from '../../services/region-date.service';

@Component({
  selector: 'app-checkbook-form',
  standalone: true,
  imports: [CommonModule, ...materialImports, ReactiveFormsModule],
  providers: REGION_DATE_PROVIDERS,
  templateUrl: './checkbook-form.html',
  styleUrls: ['./checkbook-form.css'],
})
export class CheckbookForm {
  readonly regionDateService = inject(RegionDateService);

  @Input({ required: true }) group!: FormGroup;
  @Input({ required: true }) config: FieldConfig[] = [];
  @Input() title = 'Claim Details';
}
