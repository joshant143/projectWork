import { FieldConfig } from '../../../models/region.model';

const YES_NO_OPTIONS = [
  { value: 'YES', label: 'Yes' },
  { value: 'NO', label: 'No' },
];

export const ANZ_MEDICAL_FIELDS: FieldConfig[] = [
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

export const ANZ_CARD_MISUSE_FIELDS: FieldConfig[] = [
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

export const ANZ_BAGGAGE_FIELDS: FieldConfig[] = [
  {
    name: 'isBaggageDelayed',
    label: 'Was your baggage delayed? / ANZ',
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
    name: 'baggageIncidentDate',
    label: 'Date of baggage incident',
    type: 'date',
  },
  {
    name: 'werePoliceInformed',
    label: 'Were the police informed?',
    type: 'radio',
    options: YES_NO_OPTIONS,
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
    name: 'totalAmountClaimed',
    label: 'Total amount claimed',
    type: 'text',
  },
  {
    name: 'additionalInformation',
    label: 'Additional information that may help us review your claim',
    type: 'textarea',
  },
];

export const ANZ_CORP_TRIP_CANCEL_FIELDS: FieldConfig[] = [
  {
    name: 'dateTravelDisruptedOrCancelled',
    label: 'Date Travel Disrupted or Cancelled',
    type: 'date',
  },
  {
    name: 'dateYouWereDueToDepart',
    label: 'Date You Were Due to Depart',
    type: 'date',
  },
  {
    name: 'reasonForDisruptionOrCancellation',
    label: 'Reason for Disruption or Cancellation',
    type: 'text',
  },
  {
    name: 'detailsOfChangedItinerary',
    label: 'Details of the Changed Itinerary',
    type: 'text',
  },
];

export const ANZ_CORP_RENTAL_VEHICLE_FIELDS: FieldConfig[] = [
  {
    name: 'vehicleType',
    label: 'Is this claim related to a personal or a rental vehicle?',
    type: 'select',
    options: [
      { value: 'PERSONAL', label: 'Personal Vehicle' },
      { value: 'RENTAL', label: 'Rental Vehicle' },
    ],
  },
  {
    name: 'isLicensedRentalAgency',
    label: 'Was this vehicle rented from a licensed rental agency?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'accidentDamageTheftDetails',
    label: 'Details of the accident, damage, or theft',
    type: 'text',
  },
  {
    name: 'werePoliceInformedForVehicleIncident',
    label: 'Were the police informed?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'hasAdditionalRentalCover',
    label: 'Did you take out additional insurance covering loss or damage to the rental vehicle?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'rentalVehicleExcessWaiverAmount',
    label:
      'Rental Vehicle Excess Waiver amount you are liable to pay the rental agency or your personal insurance provider.',
    type: 'text',
  },
  {
    name: 'areTowingFeesCovered',
    label:
      'Are the towage fees covered under a roadside assistance agreement, motor policy, or your rental agreement?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'towingFeesIncurred',
    label: 'Towage fees incurred (if applicable)',
    type: 'text',
  },
  {
    name: 'totalAmountClaimed',
    label: 'Total Amount Claimed',
    type: 'text',
  },
  {
    name: 'claimCurrency',
    label: 'Currency',
    type: 'select',
    options: [
      { value: 'AUD', label: 'AUD' },
      { value: 'NZD', label: 'NZD' },
      { value: 'USD', label: 'USD' },
      { value: 'EUR', label: 'EUR' },
      { value: 'GBP', label: 'GBP' },
    ],
  },
  {
    name: 'additionalInformation',
    label: 'Additional information that may help us review your claim',
    type: 'textarea',
  },
];

export const ANZ_CORP_EVACUATION_FIELDS: FieldConfig[] = [
  {
    name: 'eventLeadingToEvacuation',
    label: 'Describe the event leading to the evacuation',
    type: 'text',
  },
  {
    name: 'additionalInformation',
    label: 'Additional information that may help us review your claim',
    type: 'text',
  },
];

export const ANZ_CORP_PA_WEEKLY_FIELDS: FieldConfig[] = [
  {
    name: 'injuryNatureDescription',
    label: 'Describe the nature of the injury',
    type: 'textarea',
  },
  {
    name: 'accidentNatureDescription',
    label: 'Describe the nature of the accident that led to your injury',
    type: 'textarea',
  },
  {
    name: 'diagnosis',
    label: 'Diagnosis',
    type: 'text',
  },
  {
    name: 'injuryPrognosis',
    label: 'Prognosis of the injury',
    type: 'text',
  },
  {
    name: 'wasMedicalTreatmentProvided',
    label: 'Was medical treatment provided?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'isClaimSubmittedToWorkInjuryOrOtherInsurer',
    label:
      'Are you submitting a claim to a work injury compensation insurer, or any other insurer?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'haveYouRecovered',
    label: 'Are you now recovered?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'isPartiallyDisabledPerPolicy',
    label: 'Are you now partially disabled as defined in the policy?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'isTotallyDisabledPerPolicy',
    label: 'Are you now totally disabled as defined in the policy?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'isSeeingDoctorForCurrentClaimDisability',
    label:
      'Are you currently seeing a doctor in connection with the disability for which claim is being made?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
];

export const ANZ_CORP_PS_WEEKLY_FIELDS: FieldConfig[] = [
  {
    name: 'sicknessCommencedDate',
    label: 'Date and time the sickness commenced',
    type: 'date',
  },
  {
    name: 'sicknessCommencedTime',
    label: 'Time the sickness commenced',
    type: 'text',
    placeholder: 'HH:MM',
  },
  {
    name: 'countryWhereSicknessOccurred',
    label: 'Country in where sickness occurred',
    type: 'text',
  },
  {
    name: 'diagnosis',
    label: 'Diagnosis',
    type: 'text',
  },
  {
    name: 'sicknessNatureDescription',
    label: 'Describe the nature of the sickness',
    type: 'text',
  },
  {
    name: 'sicknessPrognosis',
    label: 'Prognosis of the sickness',
    type: 'text',
  },
  {
    name: 'wasHospitalizationNeeded',
    label: 'Was hospitalization needed?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'hospitalizationStartDate',
    label: 'Dates of hospitalization (From)',
    type: 'date',
  },
  {
    name: 'hospitalizationEndDate',
    label: 'Dates of hospitalization (To)',
    type: 'date',
  },
  {
    name: 'medicalFacilityName',
    label: 'Name of medical facility',
    type: 'text',
  },
  {
    name: 'generalHealthDescription',
    label: 'Describe general health',
    type: 'text',
  },
  {
    name: 'hasBeenPreviouslyTreatedForSickness',
    label: 'Have you previously been treated for the sickness?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'previousTreatmentDetails',
    label: 'Details of previous treatment',
    type: 'text',
  },
  {
    name: 'workStoppedDate',
    label: 'When did you stop work?',
    type: 'date',
  },
];

export const ANZ_CORP_MEDICAL_FIELDS: FieldConfig[] = [
  ...ANZ_MEDICAL_FIELDS,
  {
    name: 'underReciprocalHealthAgreements',
    label: 'Under any Reciprocal Health Agreements?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'underPrivateHealthInsurance',
    label: 'Under any Private Health Insurance?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'tripPaidUsingCreditCard',
    label: 'Was the trip paid for on a Credit Card?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'hasOtherTravelInsurancePolicy',
    label: 'Was any other travel insurance policy purchased for this trip?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'hasHomeAndContentsInsurance',
    label: 'Is there any Home & Contents Insurance?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'hasClaimedInputTaxCreditForPremiumGst',
    label:
      'Have you claimed or intend to claim any input tax credit on the GST component of the premium applicable to the policy?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
  {
    name: 'isEntitledInputTaxCreditForRepairsOrReplacement',
    label:
      'Are you entitled to claim an input tax credit for repairs or replacement of the item that has been lost or damaged?',
    type: 'radio',
    options: YES_NO_OPTIONS,
  },
];

export const ANZ_GENERIC_TRIP_CANCEL_FIELDS: FieldConfig[] = [
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

export const ANZ_GENERIC_EVACUATION_FIELDS: FieldConfig[] = [
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

export const ANZ_GENERIC_PA_WEEKLY_FIELDS: FieldConfig[] = [
  {
    name: 'injuryDescription',
    label: 'Describe the nature of your injury',
    type: 'textarea',
  },
  {
    name: 'accidentDescription',
    label: 'Describe the accident that led to your injury',
    type: 'textarea',
  },
  {
    name: 'workStoppedDate',
    label: 'When did you stop work?',
    type: 'date',
  },
];

export const ANZ_GENERIC_PS_WEEKLY_FIELDS: FieldConfig[] = [
  {
    name: 'sicknessCommencedDate',
    label: 'Date sickness commenced',
    type: 'date',
  },
  {
    name: 'sicknessDescription',
    label: 'Describe the nature of the sickness',
    type: 'textarea',
  },
  {
    name: 'medicalFacilityName',
    label: 'Name of medical facility',
    type: 'text',
  },
];

export const ANZ_GENERIC_RENTAL_VEHICLE_FIELDS: FieldConfig[] = [
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

export const ANZ_OTHERS_FIELDS: FieldConfig[] = [
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
