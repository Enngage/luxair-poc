import { Injectable } from '@angular/core';
import {
  createDeliveryClient,
  IDeliveryClient,
} from '@kontent-ai/delivery-sdk';
import {
  AssetResponses,
  ContentItemModels,
  ContentItemResponses,
  createManagementClient,
  IManagementClient,
  LanguageVariantResponses,
  WorkflowContracts,
} from '@kontent-ai/management-sdk';
import { from, map, Observable, switchMap } from 'rxjs';
import {
  contentTypes,
  Hotel,
  languages,
  RoomGroup,
  taxonomies,
  workflows,
} from '../models';
import { RawJson } from './json.model';

@Injectable({
  providedIn: 'root',
})
export class KontentAiService {
  private readonly projectId: string = '4aa67922-1f3b-017c-68ee-b6ab41480239';
  private readonly apiKey: string =
    'ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAianRpIjogIjk0ZjRkYzA5ZDYwODRiNGRiOWZiY2E1NzExNWIxYjZlIiwNCiAgImlhdCI6ICIxNjYwMjg5MDg5IiwNCiAgImV4cCI6ICIyMDA1ODg5MDg5IiwNCiAgInZlciI6ICIyLjEuMCIsDQogICJ1aWQiOiAidXNyXzB2UVlCQ3FBdnJubzVyaWZIbmlZRUciLA0KICAicHJvamVjdF9pZCI6ICI0YWE2NzkyMjFmM2IwMTdjNjhlZWI2YWI0MTQ4MDIzOSIsDQogICJhdWQiOiAibWFuYWdlLmtlbnRpY29jbG91ZC5jb20iDQp9.kxJPDQvP3hrXB4AYs6Evupp7dpeDrNgh3OYg4nZUTi8';

  private readonly deliveryClient: IDeliveryClient;
  private readonly managementClient: IManagementClient<any>;

  private readonly multipleChoiceValues = {
    yes: 'yes',
    no: 'no',
  };

  constructor() {
    this.deliveryClient = createDeliveryClient({
      projectId: this.projectId,
    });
    this.managementClient = createManagementClient({
      apiKey: this.apiKey,
      projectId: this.projectId,
    });
  }

  getHotels(): Observable<Hotel[]> {
    return from(
      this.deliveryClient
        .items<Hotel>()
        .orderByDescending('elements.created')
        .toAllPromise()
    ).pipe(
      map((response) => {
        return response.data.items;
      })
    );
  }

  async importFromJson(
    json: RawJson.RootObject
  ): Promise<LanguageVariantResponses.UpsertLanguageVariantResponse> {
    const hotel = json.hotel;

    const hotelElements = contentTypes.hotel.elements;

    // prepare data
    const publishedWorkflowStep = await this.getPublishedWorkflowStep();
    await this.ensureTourOperatorTaxonomy(hotel.tourOperator);
    await this.ensureSeasonTaxonomy(hotel.season);
    const roomGroupIds = await this.getOrCreateRoomGroups(
      hotel,
      publishedWorkflowStep
    );
    const countryId = await this.getOrCreateCountry(
      hotel.accommodation.countryName,
      hotel.accommodation.countryCode,
      publishedWorkflowStep
    );

    const imageAssetExternalIds = await this.getOrCreateImages(hotel);

    let createNewVariant = false;
    let publish = false;
    try {
      var existingHotel = await this.managementClient
        .viewLanguageVariant()
        .byItemExternalId(hotel.giataId)
        .byLanguageCodename(languages.default.codename)
        .toPromise();

      createNewVariant =
        existingHotel.data.workflowStep.id === publishedWorkflowStep.id;
      publish = true;
    } catch (error) {
      // group might not exist
      publish = true;
    }

    const hotelContentItem = await this.managementClient
      .upsertContentItem()
      .byItemExternalId(hotel.giataId)
      .withData({
        name: hotel.accommodation.hotelName,
        type: {
          codename: contentTypes.hotel.codename,
        },
      })
      .toPromise();

    if (createNewVariant) {
      await this.managementClient
        .createNewVersionOfLanguageVariant()
        .byItemId(hotelContentItem.data.id)
        .byLanguageCodename(languages.default.codename)
        .toPromise();
    }

    const hotelLanguageVariant = await this.managementClient
      .upsertLanguageVariant()
      .byItemId(hotelContentItem.data.id)
      .byLanguageCodename(languages.default.codename)
      .withData((builder) => [
        builder.textElement({
          element: {
            codename: hotelElements.catalog_name.codename,
          },
          value: hotel.accommodation.catalog.name,
        }),
        builder.assetElement({
          element: {
            codename: hotelElements.images.codename,
          },
          value: imageAssetExternalIds.map((externalId) => {
            return {
              external_id: externalId,
            };
          }),
        }),
        builder.taxonomyElement({
          element: {
            codename: hotelElements.tour_operator.codename,
          },
          value: [
            {
              codename: hotel.tourOperator.toLowerCase(),
            },
          ],
        }),
        builder.taxonomyElement({
          element: {
            codename: hotelElements.season.codename,
          },
          value: [
            {
              codename: hotel.season.toLowerCase(),
            },
          ],
        }),
        builder.linkedItemsElement({
          element: {
            codename: hotelElements.country.codename,
          },
          value: [
            {
              id: countryId,
            },
          ],
        }),
        builder.linkedItemsElement({
          element: {
            codename: hotelElements.room_groups.codename,
          },
          value: roomGroupIds.map((id) => {
            return {
              id: id,
            };
          }),
        }),
        builder.textElement({
          element: {
            codename: hotelElements.city.codename,
          },
          value: hotel.accommodation.cityName,
        }),
        builder.textElement({
          element: {
            codename: hotelElements.destination_name.codename,
          },
          value: hotel.accommodation.destinationName,
        }),
        builder.numberElement({
          element: {
            codename: hotelElements.lng.codename,
          },
          value: hotel.location.coordinates.longitude,
        }),
        builder.numberElement({
          element: {
            codename: hotelElements.lat.codename,
          },
          value: hotel.location.coordinates.latitude,
        }),
        builder.multipleChoiceElement({
          element: {
            codename: hotelElements.airport_parking_included.codename,
          },
          value: [
            {
              codename: hotel.parking.AirportParkingIncluded
                ? this.multipleChoiceValues.yes
                : this.multipleChoiceValues.no,
            },
          ],
        }),
        builder.textElement({
          element: {
            codename: hotelElements.productcode.codename,
          },
          value: hotel.productCode,
        }),
        builder.textElement({
          element: {
            codename: hotelElements.giataid.codename,
          },
          value: hotel.giataId,
        }),
        builder.textElement({
          element: {
            codename: hotelElements.giata_city_id.codename,
          },
          value: hotel.accommodation.giataCityId,
        }),
        builder.textElement({
          element: {
            codename: hotelElements.giata_destination_id.codename,
          },
          value: hotel.accommodation.giataDestinationId,
        }),
        builder.textElement({
          element: {
            codename: hotelElements.giata_catalog_hotel_id.codename,
          },
          value: hotel.accommodation.giataCatalogHotelId,
        }),
        builder.richTextElement({
          element: {
            codename: hotelElements.highlights.codename,
          },
          value: this.convertStringArrayToRichTextElementValue(
            hotel.accommodation.descriptions.highlights
          ),
        }),
        builder.richTextElement({
          element: {
            codename: hotelElements.location.codename,
          },
          value: this.convertStringArrayToRichTextElementValue(
            hotel.accommodation.descriptions.location.description
          ),
        }),
        builder.richTextElement({
          element: {
            codename: hotelElements.food___beverage.codename,
          },
          value: this.convertStringArrayToRichTextElementValue(
            hotel.accommodation.descriptions.foodBeverage.description
          ),
        }),
        builder.richTextElement({
          element: {
            codename: hotelElements.sports.codename,
          },
          value: this.convertStringArrayToRichTextElementValue(
            hotel.accommodation.descriptions.sports.description
          ),
        }),
        builder.richTextElement({
          element: {
            codename: hotelElements.children.codename,
          },
          value: this.convertStringArrayToRichTextElementValue(
            hotel.accommodation.descriptions.children.description
          ),
        }),
        builder.richTextElement({
          element: {
            codename: hotelElements.pool.codename,
          },
          value: this.convertStringArrayToRichTextElementValue(
            hotel.accommodation.descriptions.pool.description
          ),
        }),
        builder.richTextElement({
          element: {
            codename: hotelElements.additional_info.codename,
          },
          value: this.convertStringArrayToRichTextElementValue(
            hotel.accommodation.descriptions.additionalInfo.description
          ),
        }),
        builder.richTextElement({
          element: {
            codename: hotelElements.included_in_package.codename,
          },
          value: this.convertStringArrayToRichTextElementValue(
            hotel.accommodation.descriptions.includedInPackage.description
          ),
        }),
      ])
      .toPromise();

    if (publish) {
      await this.managementClient
        .publishLanguageVariant()
        .byItemId(hotelLanguageVariant.data.item.id as string)
        .byLanguageCodename(languages.default.codename)
        .withoutData()
        .toPromise();
    }

    return hotelLanguageVariant;
  }

  private async getOrCreateImages(hotel: RawJson.Hotel): Promise<string[]> {
    const numberOfImagesToUpload = 5;
    const imagesToUpload: RawJson.Image[] = [];
    const externalIds: string[] = [];

    imagesToUpload.push(...hotel.images.slice(0, numberOfImagesToUpload));

    const responses: AssetResponses.UpsertAssertResponse[] = [];
    let index: number = 0;

    for (const image of imagesToUpload) {
      const externalId: string = `hotel_${hotel.giataId}_${image.large
        .split('/')
        .pop()}`;

      // check if assset with this external id already exists
      let assetExists: boolean = false;

      try {
        index++;

        const existingAsset = await this.managementClient
          .viewAsset()
          .byAssetExternalId(externalId)
          .toPromise();

        assetExists = true;
      } catch (error) {
        console.error(error);
        assetExists = false;
      }

      if (assetExists) {
        externalIds.push(externalId);
      } else {
        const response = await this.managementClient
          .uploadAssetFromUrl()
          .withData({
            asset: {
              external_id: externalId,
              title: `${hotel.accommodation.hotelName} - ${index}`,
            },
            binaryFile: {
              filename: `hotel-${index}.jpg`,
            },
            fileUrl: this.getImageUrlThroughCorsProxy(image.large),
          })
          .toPromise();

        externalIds.push(externalId);
      }
    }

    return externalIds;
  }

  private getImageUrlThroughCorsProxy(imageUrl: string): string {
    return `https://api.allorigins.win/raw?url=${imageUrl}`;
  }

  private convertStringArrayToRichTextElementValue(array: string[]): string {
    if (!array.length) {
      return '<p><p>';
    }
    let html = `<ul>`;

    for (const item of array) {
      html += `<li>${item}</li>`;
    }

    html += '</ul>';
    return html;
  }

  private async ensureTourOperatorTaxonomy(operator: string): Promise<void> {
    const taxonomy = await this.managementClient
      .getTaxonomy()
      .byTaxonomyCodename(taxonomies.tour_operator.codename)
      .toPromise();

    if (
      !taxonomy.data.terms
        .map((m) => m.codename.toLowerCase())
        .includes(operator.toLowerCase())
    ) {
      await this.managementClient
        .modifyTaxonomy()
        .byTaxonomyCodename(taxonomies.tour_operator.codename)
        .withData([
          {
            op: 'addInto',
            value: {
              name: operator,
              codename: operator.toLowerCase(),
              terms: [],
            },
          },
        ])
        .toPromise();
    }
  }

  private async ensureSeasonTaxonomy(season: string): Promise<void> {
    const taxonomy = await this.managementClient
      .getTaxonomy()
      .byTaxonomyCodename(taxonomies.season.codename)
      .toPromise();

    if (
      !taxonomy.data.terms
        .map((m) => m.codename.toLowerCase())
        .includes(season.toLowerCase())
    ) {
      await this.managementClient
        .modifyTaxonomy()
        .byTaxonomyCodename(taxonomies.season.codename)
        .withData([
          {
            op: 'addInto',
            value: {
              name: season,
              codename: season.toLowerCase(),
              terms: [],
            },
          },
        ])
        .toPromise();
    }
  }

  private async getPublishedWorkflowStep(): Promise<WorkflowContracts.IWorkflowPublishedStepContract> {
    const workflows = await this.managementClient.listWorkflows().toPromise();

    const workflow = workflows.data[0];

    return workflow.publishedStep;
  }

  private async getOrCreateRoomGroups(
    hotel: RawJson.Hotel,
    publishedWorkflowStep: WorkflowContracts.IWorkflowPublishedStepContract
  ): Promise<string[]> {
    const result: string[] = [];
    for (const rawRoomGroup of hotel.accommodation.roomGroups) {
      const groupName = `${hotel.accommodation.hotelName} - ${rawRoomGroup.name}`;
      const groupCodename =
        `hotel_${hotel.giataId}_${rawRoomGroup.type}_${rawRoomGroup.name}`.toLowerCase();
      let createNewVariant = false;
      let publish = false;
      try {
        var existingRoomGroup = await this.managementClient
          .viewLanguageVariant()
          .byItemCodename(groupCodename)
          .byLanguageCodename(languages.default.codename)
          .toPromise();

        createNewVariant =
          existingRoomGroup.data.workflowStep.id === publishedWorkflowStep.id;
        publish = true;
      } catch (error) {
        // group might not exist
        publish = true;
      }

      const roomGroup = await this.managementClient
        .upsertContentItem()
        .byItemExternalId(groupCodename)
        .withData({
          name: groupName,
          codename: groupCodename,
          type: {
            codename: contentTypes.room_group.codename,
          },
        })
        .toPromise();

      if (createNewVariant) {
        await this.managementClient
          .createNewVersionOfLanguageVariant()
          .byItemId(roomGroup.data.id)
          .byLanguageCodename(languages.default.codename)
          .toPromise();
      }

      // create rooms
      const roomIds = await this.getOrCreateRooms(
        hotel,
        rawRoomGroup,
        publishedWorkflowStep
      );

      const roomGroupLanguageVariant = await this.managementClient
        .upsertLanguageVariant()
        .byItemId(roomGroup.data.id)
        .byLanguageCodename(languages.default.codename)
        .withData((builder) => {
          return [
            builder.textElement({
              element: {
                codename: contentTypes.room_group.elements.description.codename,
              },
              value: rawRoomGroup.description,
            }),
            builder.linkedItemsElement({
              element: {
                codename: contentTypes.room_group.elements.rooms.codename,
              },
              value: roomIds.map((id) => {
                return {
                  id: id,
                };
              }),
            }),
            builder.taxonomyElement({
              element: {
                codename:
                  contentTypes.room_group.elements.accommodation_type.codename,
              },
              value: [
                {
                  codename: rawRoomGroup.type.toLowerCase(),
                },
              ],
            }),
          ];
        })
        .toPromise();

      if (publish) {
        await this.managementClient
          .publishLanguageVariant()
          .byItemId(roomGroupLanguageVariant.data.item.id as string)
          .byLanguageCodename(languages.default.codename)
          .withoutData()
          .toPromise();
      }

      result.push(roomGroupLanguageVariant.data.item.id as string);
    }

    return result;
  }

  private async getOrCreateRooms(
    hotel: RawJson.Hotel,
    rawRoomGroup: RawJson.RoomGroup,
    publishedWorkflowStep: WorkflowContracts.IWorkflowPublishedStepContract
  ): Promise<string[]> {
    const result: string[] = [];
    for (const rawRoom of rawRoomGroup.items) {
      const roomName = `${rawRoom.name} | ${hotel.accommodation.hotelName}`;
      const roomCodename =
        `hotel_room_${hotel.giataId}_${rawRoomGroup.name}_${rawRoom.code}`.toLowerCase();

      let createNewVariant = false;
      let publish = false;
      try {
        var existingRoom = await this.managementClient
          .viewLanguageVariant()
          .byItemCodename(roomCodename)
          .byLanguageCodename(languages.default.codename)
          .toPromise();

        createNewVariant =
          existingRoom.data.workflowStep.id === publishedWorkflowStep.id;
        publish = true;
      } catch (error) {
        // group might not exist
        publish = true;
      }

      const room = await this.managementClient
        .upsertContentItem()
        .byItemExternalId(roomCodename)
        .withData({
          name: roomName,
          codename: roomCodename,
          type: {
            codename: contentTypes.room.codename,
          },
        })
        .toPromise();

      if (createNewVariant) {
        await this.managementClient
          .createNewVersionOfLanguageVariant()
          .byItemId(room.data.id)
          .byLanguageCodename(languages.default.codename)
          .toPromise();
      }

      const roomLanguageVariant = await this.managementClient
        .upsertLanguageVariant()
        .byItemId(room.data.id)
        .byLanguageCodename(languages.default.codename)
        .withData((builder) => {
          return [
            builder.textElement({
              element: {
                codename: contentTypes.room.elements.code.codename,
              },
              value: rawRoom.code,
            }),
            builder.textElement({
              element: {
                codename: contentTypes.room.elements.long_description.codename,
              },
              value: rawRoom.longDescription,
            }),
            builder.textElement({
              element: {
                codename: contentTypes.room.elements.short_description.codename,
              },
              value: rawRoom.shortDescription,
            }),
          ];
        })
        .toPromise();

      if (publish) {
        await this.managementClient
          .publishLanguageVariant()
          .byItemId(roomLanguageVariant.data.item.id as string)
          .byLanguageCodename(languages.default.codename)
          .withoutData()
          .toPromise();
      }

      result.push(roomLanguageVariant.data.item.id as string);
    }

    return result;
  }

  private async getOrCreateCountry(
    countryName: string,
    countryCode: string,
    publishedWorkflowStep: WorkflowContracts.IWorkflowPublishedStepContract
  ): Promise<string> {
    let createNewVariant = false;
    let publish = false;

    try {
      const existingCountry = await this.managementClient
        .viewLanguageVariant()
        .byItemCodename(countryCode.toLowerCase())
        .byLanguageCodename(languages.default.codename)
        .toPromise();

      createNewVariant =
        existingCountry.data.workflowStep.id === publishedWorkflowStep.id;
      publish = true;
    } catch (error) {
      // country might not exist
      publish = true;
    }

    const country = await this.managementClient
      .upsertContentItem()
      .byItemExternalId(countryCode)
      .withData({
        name: countryName,
        codename: countryCode.toLowerCase(),
        type: {
          codename: contentTypes.country.codename,
        },
      })
      .toPromise();

    if (createNewVariant) {
      await this.managementClient
        .createNewVersionOfLanguageVariant()
        .byItemId(country.data.id)
        .byLanguageCodename(languages.default.codename)
        .toPromise();
    }

    const languageVariant = await this.managementClient
      .upsertLanguageVariant()
      .byItemId(country.data.id)
      .byLanguageCodename(languages.default.codename)
      .withData((builder) => {
        return [
          builder.textElement({
            element: {
              codename: contentTypes.country.elements.code.codename,
            },
            value: countryCode,
          }),
        ];
      })
      .toPromise();

    if (publish) {
      await this.managementClient
        .publishLanguageVariant()
        .byItemId(languageVariant.data.item.id as string)
        .byLanguageCodename(languages.default.codename)
        .withoutData()
        .toPromise();
    }

    return country.data.id;
  }
}
