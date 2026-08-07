import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialImports } from '../../../../shared/materials/material-imports';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldConfig } from '../../models/region.model';
import { REGION_DATE_PROVIDERS } from '../../services/region-date-adapter';
import { RegionDateService } from '../../services/region-date.service';

@Component({
  selector: 'app-loss-info',
  standalone: true,
  imports: [CommonModule, ...materialImports, ReactiveFormsModule],
  providers: REGION_DATE_PROVIDERS,
  templateUrl: './loss-info-page.html',
  styleUrl: './loss-info-page.css',
})
export class LossInfoPage implements OnInit {
  readonly regionDateService = inject(RegionDateService);

  @Input({ required: true })
  group!: FormGroup;

  @Input({ required: true })
  config: FieldConfig[] = [];

  ngOnInit(): void {
    this.group.get('reportedToBhsi')?.valueChanges.subscribe((value) => {
      const caseNumber = this.group.get('caseNumber');

      if (value === true) {
        caseNumber?.setValidators([Validators.required]);
      } else {
        caseNumber?.clearValidators();
        caseNumber?.reset();
      }

      caseNumber?.updateValueAndValidity();
    });
  }
}
