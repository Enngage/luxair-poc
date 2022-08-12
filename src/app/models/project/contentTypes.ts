/**
 * Generated by '@kontent-ai/model-generator@5.4.1'
 *
 * Project name: LuxAir
 * Environment: Production
 * Project Id: 4aa67922-1f3b-017c-68ee-b6ab41480239
 */
export const contentTypes = {
  /**
   * Country
   * Last modified: Fri Aug 12 2022 08:36:39 GMT+0200 (Central European Summer Time)
   */
  country: {
    codename: 'country',
    id: '699e98e5-583e-4fb0-8c6a-2d033118b681',
    externalId: undefined,
    name: 'Country',
    elements: {
      /**
       * Code (text)
       */
      code: {
        codename: 'code',
        id: 'c1be40d0-ad48-4e31-ba5b-d490a6e00fb5',
        externalId: undefined,
        name: 'Code',
        required: true,
        type: 'text',
        snippetCodename: undefined,
      },
    },
  },

  /**
   * Room Group
   * Last modified: Fri Aug 12 2022 10:53:32 GMT+0200 (Central European Summer Time)
   */
  room_group: {
    codename: 'room_group',
    id: '9c4e528e-6074-4470-82d4-2613f5548bbb',
    externalId: undefined,
    name: 'Room Group',
    elements: {
      /**
       * Accommodation Type (taxonomy)
       */
      accommodation_type: {
        codename: 'accommodation_type',
        id: '38dab755-2b40-4174-90c7-4d1176494c7f',
        externalId: undefined,
        name: 'Accommodation Type',
        required: true,
        type: 'taxonomy',
        snippetCodename: undefined,
      },

      /**
       * Description (text)
       */
      description: {
        codename: 'description',
        id: 'fe0e62f5-2513-4065-b8f0-af5ff3cb5be3',
        externalId: undefined,
        name: 'Description',
        required: true,
        type: 'text',
        snippetCodename: undefined,
      },

      /**
       * Rooms (modular_content)
       */
      rooms: {
        codename: 'rooms',
        id: 'a8a8292d-e0dd-42d2-9879-859e8be397e7',
        externalId: undefined,
        name: 'Rooms',
        required: true,
        type: 'modular_content',
        snippetCodename: undefined,
      },
    },
  },

  /**
   * Hotel
   * Last modified: Fri Aug 12 2022 10:53:03 GMT+0200 (Central European Summer Time)
   */
  hotel: {
    codename: 'hotel',
    id: '2f502723-1b50-47fc-a0d7-b89c29193758',
    externalId: undefined,
    name: 'Hotel',
    elements: {
      /**
       * Catalog name (text)
       */
      catalog_name: {
        codename: 'catalog_name',
        id: '12fa24f2-6f04-4758-8d99-c3a277632058',
        externalId: undefined,
        name: 'Catalog name',
        required: true,
        type: 'text',
        snippetCodename: undefined,
      },

      /**
       * Tour operator (taxonomy)
       */
      tour_operator: {
        codename: 'tour_operator',
        id: '1b62fbb4-730f-4761-be14-59a8b356ac8f',
        externalId: undefined,
        name: 'Tour operator',
        required: true,
        type: 'taxonomy',
        snippetCodename: undefined,
      },

      /**
       * Season (taxonomy)
       */
      season: {
        codename: 'season',
        id: 'bf9b532c-d58a-4156-a8f2-c30b0a9f572c',
        externalId: undefined,
        name: 'Season',
        required: true,
        type: 'taxonomy',
        snippetCodename: undefined,
      },

      /**
       * Country (modular_content)
       */
      country: {
        codename: 'country',
        id: '5f4e6bf0-0557-4324-b093-c4fdfbc2667b',
        externalId: undefined,
        name: 'Country',
        required: true,
        type: 'modular_content',
        snippetCodename: undefined,
      },

      /**
       * City name (text)
       */
      city: {
        codename: 'city',
        id: 'ac27c519-4fde-41fa-bb94-538d1bceddaa',
        externalId: undefined,
        name: 'City name',
        required: true,
        type: 'text',
        snippetCodename: undefined,
      },

      /**
       * Destination name (text)
       */
      destination_name: {
        codename: 'destination_name',
        id: '6b1caad3-75a7-469d-86e9-34724aee07b7',
        externalId: undefined,
        name: 'Destination name',
        required: true,
        type: 'text',
        snippetCodename: undefined,
      },

      /**
       * Lng (number)
       */
      lng: {
        codename: 'lng',
        id: '21d39055-4789-42d1-9016-9a258b50a9e6',
        externalId: undefined,
        name: 'Lng',
        required: true,
        type: 'number',
        snippetCodename: undefined,
      },

      /**
       * Lat (number)
       */
      lat: {
        codename: 'lat',
        id: '6215887a-69aa-47f2-a6fc-831968c6f2f6',
        externalId: undefined,
        name: 'Lat',
        required: true,
        type: 'number',
        snippetCodename: undefined,
      },

      /**
       * Airport parking included (multiple_choice)
       */
      airport_parking_included: {
        codename: 'airport_parking_included',
        id: '3077bee5-2bba-47ff-8432-4fa9d17334f3',
        externalId: undefined,
        name: 'Airport parking included',
        required: true,
        type: 'multiple_choice',
        snippetCodename: undefined,
      },

      /**
       * Images (asset)
       */
      untitled_asset: {
        codename: 'untitled_asset',
        id: '7eeda343-1770-46f9-bd62-e7987dd99637',
        externalId: undefined,
        name: 'Images',
        required: true,
        type: 'asset',
        snippetCodename: undefined,
      },

      /**
       * Highlights (rich_text)
       */
      highlights: {
        codename: 'highlights',
        id: '49ce03b4-6551-4a66-9330-9dc3a694fe9a',
        externalId: undefined,
        name: 'Highlights',
        required: false,
        type: 'rich_text',
        snippetCodename: undefined,
      },

      /**
       * Location (rich_text)
       */
      location: {
        codename: 'location',
        id: '3407179b-517c-40e2-a656-69f19d5cb628',
        externalId: undefined,
        name: 'Location',
        required: false,
        type: 'rich_text',
        snippetCodename: undefined,
      },

      /**
       * Food & Beverage (rich_text)
       */
      food___beverage: {
        codename: 'food___beverage',
        id: 'fdc08dee-cc9b-44b6-b04a-af4f9b4b5936',
        externalId: undefined,
        name: 'Food & Beverage',
        required: false,
        type: 'rich_text',
        snippetCodename: undefined,
      },

      /**
       * Sports (rich_text)
       */
      sports: {
        codename: 'sports',
        id: '27852f83-d581-495d-b082-aedb4805f214',
        externalId: undefined,
        name: 'Sports',
        required: false,
        type: 'rich_text',
        snippetCodename: undefined,
      },

      /**
       * Pool (rich_text)
       */
      pool: {
        codename: 'pool',
        id: '284e69fe-576a-4945-98fc-e2615263b489',
        externalId: undefined,
        name: 'Pool',
        required: false,
        type: 'rich_text',
        snippetCodename: undefined,
      },

      /**
       * Children (rich_text)
       */
      children: {
        codename: 'children',
        id: '8f3d6b3c-9442-43be-babd-136b96a45264',
        externalId: undefined,
        name: 'Children',
        required: false,
        type: 'rich_text',
        snippetCodename: undefined,
      },

      /**
       * Untitled rich text (rich_text)
       */
      untitled_rich_text: {
        codename: 'untitled_rich_text',
        id: '99ab29c4-7643-429f-bcbc-d7c287cf1577',
        externalId: undefined,
        name: 'Untitled rich text',
        required: false,
        type: 'rich_text',
        snippetCodename: undefined,
      },

      /**
       * Included in package (rich_text)
       */
      included_in_package: {
        codename: 'included_in_package',
        id: 'c97b6cf5-5c14-47d6-8e7b-037a2e45a8d0',
        externalId: undefined,
        name: 'Included in package',
        required: false,
        type: 'rich_text',
        snippetCodename: undefined,
      },

      /**
       * Room groups (modular_content)
       */
      room_groups: {
        codename: 'room_groups',
        id: '656c3e81-2b35-4cc2-bd58-86e1334f4985',
        externalId: undefined,
        name: 'Room groups',
        required: false,
        type: 'modular_content',
        snippetCodename: undefined,
      },

      /**
       * Product Code (text)
       */
      productcode: {
        codename: 'productcode',
        id: 'bda2a072-f7a2-4faa-8a7e-ebfca5d52c77',
        externalId: undefined,
        name: 'Product Code',
        required: true,
        type: 'text',
        snippetCodename: undefined,
      },

      /**
       * GiataId (number)
       */
      giataid: {
        codename: 'giataid',
        id: '4a6a0d13-02ab-422f-aa2f-e165e111bfa4',
        externalId: undefined,
        name: 'GiataId',
        required: true,
        type: 'number',
        snippetCodename: undefined,
      },

      /**
       * Giata city id (number)
       */
      giata_city_id: {
        codename: 'giata_city_id',
        id: 'c895e265-93c7-4319-ba28-0de1a2e0df50',
        externalId: undefined,
        name: 'Giata city id',
        required: true,
        type: 'number',
        snippetCodename: undefined,
      },

      /**
       * Giata destination id (number)
       */
      giata_destination_id: {
        codename: 'giata_destination_id',
        id: '53229b49-63d2-4ed6-a2b4-bbd3cadacfc1',
        externalId: undefined,
        name: 'Giata destination id',
        required: true,
        type: 'number',
        snippetCodename: undefined,
      },

      /**
       * Giata catalog hotel id (number)
       */
      giata_catalog_hotel_id: {
        codename: 'giata_catalog_hotel_id',
        id: '98b41bff-0bed-4b04-925c-4b2599863b73',
        externalId: undefined,
        name: 'Giata catalog hotel id',
        required: true,
        type: 'number',
        snippetCodename: undefined,
      },
    },
  },

  /**
   * Room
   * Last modified: Fri Aug 12 2022 08:26:05 GMT+0200 (Central European Summer Time)
   */
  room: {
    codename: 'room',
    id: '95184000-049b-42e5-8f8e-ea27cf289851',
    externalId: undefined,
    name: 'Room',
    elements: {
      /**
       * Code (text)
       */
      code: {
        codename: 'code',
        id: '6316821a-e215-4de1-ad40-2aa86015c9e5',
        externalId: undefined,
        name: 'Code',
        required: true,
        type: 'text',
        snippetCodename: undefined,
      },

      /**
       * Long description (text)
       */
      long_description: {
        codename: 'long_description',
        id: '40e81b00-cda8-4701-a428-61e096a33d22',
        externalId: undefined,
        name: 'Long description',
        required: true,
        type: 'text',
        snippetCodename: undefined,
      },

      /**
       * Short description (text)
       */
      short_description: {
        codename: 'short_description',
        id: '9c7d915b-ac3b-412d-bbdb-300656498832',
        externalId: undefined,
        name: 'Short description',
        required: false,
        type: 'text',
        snippetCodename: undefined,
      },
    },
  },
};