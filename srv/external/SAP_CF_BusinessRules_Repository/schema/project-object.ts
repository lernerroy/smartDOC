/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { Description } from './description';
    import type { Label } from './label';
    import type { Annotations } from './annotations';
    import type { IncludedInterface } from './included-interface';
    import type { Interface } from './interface';
    /**
     * Representation of the 'ProjectObject' schema.
     * @example {
     *   "Id": "439afea5aef1422681f78cce66c9aa90",
     *   "Name": "DetermineEquipments",
     *   "Description": [
     *     {
     *       "Language": "en",
     *       "Text": "Project to determine Equipments to be issued to the employee"
     *     }
     *   ],
     *   "ChangedOn": "2017-12-19T06:40:17.839Z",
     *   "ChangedBy": "LORIN",
     *   "Label": [
     *     {
     *       "Language": "en",
     *       "Text": "Determine Equipment"
     *     },
     *     {
     *       "Language": "",
     *       "Text": "Determine Equipment"
     *     }
     *   ],
     *   "Annotations": [
     *     {
     *       "Key": "com.sap.rules.expression.language",
     *       "Value": "2.0"
     *     }
     *   ],
     *   "IncludedInterface": [
     *     {
     *       "Project": "1234fea5aef1422681f78cce66c9aa90",
     *       "InterfaceId": "7777fe44aef1422681f78cce66c9aa90",
     *       "Revision": "ApiRevision1"
     *     }
     *   ],
     *   "Interface": [
     *     {
     *       "Id": "7777fe44aef1422681f78cce66c9aa90",
     *       "Name": "InterfaceApi",
     *       "ObjectId": [
     *         "a55b061c2a57454ea6a28fa0022f1f37",
     *         "34f484820a3a4f6584fb5a73b37b6e02"
     *       ]
     *     }
     *   ]
     * }
     */
    export type ProjectObject = {
      /**
       * ID of the entity(UUID)
       */
      'Id'?: string;
      /**
       * Name of the entity
       */
      'Name'?: string;
      'Description'?: Description;
      /**
       * The last updated time of the project
       * Format: "date-time".
       */
      'ChangedOn'?: string;
      /**
       * The id of the user who performed the last update of the project
       */
      'ChangedBy'?: string;
      'Label'?: Label;
      'Annotations'?: Annotations;
      'IncludedInterface'?: IncludedInterface;
      'Interface'?: Interface;
    } | Record<string, any>;
