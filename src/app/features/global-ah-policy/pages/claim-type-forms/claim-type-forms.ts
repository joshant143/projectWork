import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckbookForm } from '../checkbook-form/checkbook-form';
import { ClaimTypeFormSection } from '../../models/region.model';

@Component({
  selector: 'app-claim-type-forms',
  standalone: true,
  imports: [CommonModule, CheckbookForm],
  templateUrl: './claim-type-forms.html',
})
export class ClaimTypeFormsPage {
  @Input({ required: true }) sections: ClaimTypeFormSection[] = [];

  trackByClaimTypeCode(_index: number, section: ClaimTypeFormSection): string {
    return section.claimTypeCode;
  }
}