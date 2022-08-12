import { IContentItem, Elements } from '@kontent-ai/delivery-sdk';
import { TourOperator } from '../taxonomies/tour_operator';
import { Season } from '../taxonomies/season';
import { Country } from './country';
import { RoomGroup } from './room_group';

/**
 * Generated by '@kontent-ai/model-generator@5.4.1'
 *
 * Hotel
 * Id: 2f502723-1b50-47fc-a0d7-b89c29193758
 * Codename: hotel
 */
export type Hotel = IContentItem<{
  /**
   * Catalog name (text)
   * Required: true
   * Id: 12fa24f2-6f04-4758-8d99-c3a277632058
   * Codename: catalog_name
   */
  catalog_name: Elements.TextElement;

  /**
   * Tour operator (taxonomy)
   * Required: true
   * Id: 1b62fbb4-730f-4761-be14-59a8b356ac8f
   * Codename: tour_operator
   */
  tour_operator: Elements.TaxonomyElement<TourOperator>;

  /**
   * Season (taxonomy)
   * Required: true
   * Id: bf9b532c-d58a-4156-a8f2-c30b0a9f572c
   * Codename: season
   */
  season: Elements.TaxonomyElement<Season>;

  /**
   * Country (modular_content)
   * Required: true
   * Id: 5f4e6bf0-0557-4324-b093-c4fdfbc2667b
   * Codename: country
   */
  country: Elements.LinkedItemsElement<Country>;

  /**
   * City name (text)
   * Required: true
   * Id: ac27c519-4fde-41fa-bb94-538d1bceddaa
   * Codename: city
   */
  city: Elements.TextElement;

  /**
   * Destination name (text)
   * Required: true
   * Id: 6b1caad3-75a7-469d-86e9-34724aee07b7
   * Codename: destination_name
   */
  destination_name: Elements.TextElement;

  /**
   * Lng (number)
   * Required: true
   * Id: 21d39055-4789-42d1-9016-9a258b50a9e6
   * Codename: lng
   */
  lng: Elements.NumberElement;

  /**
   * Lat (number)
   * Required: true
   * Id: 6215887a-69aa-47f2-a6fc-831968c6f2f6
   * Codename: lat
   */
  lat: Elements.NumberElement;

  /**
   * Airport parking included (multiple_choice)
   * Required: true
   * Id: 3077bee5-2bba-47ff-8432-4fa9d17334f3
   * Codename: airport_parking_included
   */
  airport_parking_included: Elements.MultipleChoiceElement;

  /**
   * Images (asset)
   * Required: true
   * Id: 7eeda343-1770-46f9-bd62-e7987dd99637
   * Codename: images
   */
  images: Elements.AssetsElement;

  /**
   * Highlights (rich_text)
   * Required: false
   * Id: 49ce03b4-6551-4a66-9330-9dc3a694fe9a
   * Codename: highlights
   */
  highlights: Elements.RichTextElement;

  /**
   * Location (rich_text)
   * Required: false
   * Id: 3407179b-517c-40e2-a656-69f19d5cb628
   * Codename: location
   */
  location: Elements.RichTextElement;

  /**
   * Food & Beverage (rich_text)
   * Required: false
   * Id: fdc08dee-cc9b-44b6-b04a-af4f9b4b5936
   * Codename: food___beverage
   */
  food___beverage: Elements.RichTextElement;

  /**
   * Sports (rich_text)
   * Required: false
   * Id: 27852f83-d581-495d-b082-aedb4805f214
   * Codename: sports
   */
  sports: Elements.RichTextElement;

  /**
   * Pool (rich_text)
   * Required: false
   * Id: 284e69fe-576a-4945-98fc-e2615263b489
   * Codename: pool
   */
  pool: Elements.RichTextElement;

  /**
   * Children (rich_text)
   * Required: false
   * Id: 8f3d6b3c-9442-43be-babd-136b96a45264
   * Codename: children
   */
  children: Elements.RichTextElement;

  /**
   * Pool (rich_text)
   * Required: false
   * Id: 99ab29c4-7643-429f-bcbc-d7c287cf1577
   * Codename: untitled_rich_text
   */
  untitled_rich_text: Elements.RichTextElement;

  /**
   * Additional info (rich_text)
   * Required: false
   * Id: c89ca177-64ff-40ea-9f12-0c270a66ed3a
   * Codename: additional_info
   */
  additional_info: Elements.RichTextElement;

  /**
   * Included in package (rich_text)
   * Required: false
   * Id: c97b6cf5-5c14-47d6-8e7b-037a2e45a8d0
   * Codename: included_in_package
   */
  included_in_package: Elements.RichTextElement;

  /**
   * Room groups (modular_content)
   * Required: false
   * Id: 656c3e81-2b35-4cc2-bd58-86e1334f4985
   * Codename: room_groups
   */
  room_groups: Elements.LinkedItemsElement<RoomGroup>;

  /**
   * Product Code (text)
   * Required: true
   * Id: bda2a072-f7a2-4faa-8a7e-ebfca5d52c77
   * Codename: productcode
   */
  productcode: Elements.TextElement;

  /**
   * GiataId (number)
   * Required: true
   * Id: 4a6a0d13-02ab-422f-aa2f-e165e111bfa4
   * Codename: giataid
   */
  giataid: Elements.NumberElement;

  /**
   * Giata city id (number)
   * Required: true
   * Id: c895e265-93c7-4319-ba28-0de1a2e0df50
   * Codename: giata_city_id
   */
  giata_city_id: Elements.NumberElement;

  /**
   * Giata destination id (number)
   * Required: true
   * Id: 53229b49-63d2-4ed6-a2b4-bbd3cadacfc1
   * Codename: giata_destination_id
   */
  giata_destination_id: Elements.NumberElement;

  /**
   * Giata catalog hotel id (number)
   * Required: true
   * Id: 98b41bff-0bed-4b04-925c-4b2599863b73
   * Codename: giata_catalog_hotel_id
   */
  giata_catalog_hotel_id: Elements.NumberElement;
}>;
