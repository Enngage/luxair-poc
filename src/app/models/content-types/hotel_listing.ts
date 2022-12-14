import { IContentItem, Elements } from '@kontent-ai/delivery-sdk';
import { Hotel } from './hotel';

/**
 * Generated by '@kontent-ai/model-generator@5.4.1'
 *
 * Hotel listing
 * Id: b12c495b-d756-4050-85b0-d2bbcedd463e
 * Codename: hotel_listing
 */
export type HotelListing = IContentItem<{
  /**
   * Subpages (subpages)
   * Required: false
   * Id: 1bdf7cda-bb1b-4e02-9a70-06b3c92474fd
   * Codename: subpages
   */
  subpages: Elements.LinkedItemsElement<Hotel>;
}>;
