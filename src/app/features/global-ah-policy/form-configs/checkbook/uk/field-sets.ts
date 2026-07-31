import { FieldConfig } from '../../../models/region.model';

const YES_NO_OPTIONS = [
  { value: 'YES', label: 'Yes' },
  { value: 'NO', label: 'No' },
];

export const UK_MEDICAL_FIELDS: FieldConfig[] = [
  {
    name: 'injuryIllnessDescription',
    label: 'Describe the nature of your injury, illness and/or sickness',
    type: 'text',
  },
  {
    name: 'accidentDescription',
    label: 'Describe the nature of the accident that led to your injury',
    type: 'text',
  },
  {
    name: 'firstOccurrenceDate',
    label:
      'When and where did the injury, illness and/or sickness first occur and/or manifest itself?',
    type: 'date',
  },
  {
    name: 'firstOccurrenceLocation',
    label: 'Where did it first occur and/or manifest itself?',
    type: 'text',
  },
  {
    name: 'hasOngoingMedicalExpenses',
    label: 'Are you incurring ongoing medical expenses?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'isSportsRelatedInjury',
    label:
      'Is the injury related to one of the following sports: Netball, Pickleball, or Volleyball?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'additionalInformation',
    label: 'Additional information that may help us review your claim',
    type: 'textarea',
  },
];

export const UK_CARD_MISUSE_FIELDS: FieldConfig[] = [
  {
    name: 'issueDetails',
    label: 'Details of the issue',
    type: 'text',
  },
  {
    name: 'bankOrCardProvider',
    label: 'Bank/Card Provider',
    type: 'text',
  },
  {
    name: 'totalClaimValue',
    label: 'Total value of the claim',
    type: 'text',
  },
];

export const UK_TRIP_CANCEL_FIELDS: FieldConfig[] = [
  {
    name: 'tripDisruptionDate',
    label: 'Date travel was disrupted or cancelled',
    type: 'date',
  },
  {
    name: 'tripDisruptionReason',
    label: 'Reason for trip disruption or cancellation',
    type: 'text',
  },
  {
    name: 'tripDisruptionDetails',
    label: 'Details of the changed itinerary',
    type: 'textarea',
  },
];

export const UK_BAGGAGE_FIELDS: FieldConfig[] = [
  {
    name: 'isBaggageDelayed',
    label: 'Was your baggage delayed? / UK',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'isBaggageLostOrDamaged',
    label: 'Was your baggage or personal effects lost, stolen, or damaged?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'policeReferenceNumber',
    label: 'Police reference number (if applicable)',
    type: 'text',
  },
  {
    name: 'hasSubmittedTransportCompensationClaim',
    label: 'Have you submitted a compensation claim with your transport provider?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'hasReceivedTransportCompensation',
    label: 'Have you received compensation from your transport provider?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'additionalInformation',
    label: 'Additional information that may help us review your claim',
    type: 'textarea',
  },
];

export const UK_RENTAL_VEHICLE_FIELDS: FieldConfig[] = [
  {
    name: 'vehicleIncidentDate',
    label: 'Date of accident, damage, or theft',
    type: 'date',
  },
  {
    name: 'vehicleIncidentDetails',
    label: 'Details of accident, damage, or theft',
    type: 'textarea',
  },
  {
    name: 'vehicleClaimAmount',
    label: 'Total amount claimed',
    type: 'text',
  },
];

export const UK_EVACUATION_FIELDS: FieldConfig[] = [
  {
    name: 'evacuationEventDetails',
    label: 'Describe the event leading to evacuation',
    type: 'textarea',
  },
  {
    name: 'evacuationDate',
    label: 'Date of evacuation',
    type: 'date',
  },
  {
    name: 'additionalInformation',
    label: 'Additional information that may help us review your claim',
    type: 'textarea',
  },
];

export const UK_OTHERS_FIELDS: FieldConfig[] = [
  {
    name: 'otherClaimIncidentDate',
    label: 'Incident date',
    type: 'date',
  },
  {
    name: 'otherClaimSummary',
    label: 'Please describe your claim',
    type: 'textarea',
  },
  {
    name: 'additionalInformation',
    label: 'Additional information that may help us review your claim',
    type: 'textarea',
  },
];
