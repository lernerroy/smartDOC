/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { AdminData } from './admin-data';
    import type { Vocabulary } from './vocabulary';
    import type { Annotations } from './annotations';
    /**
     * Representation of the 'RuleService' schema.
     * @example {
     *   "Id": "g36sft45ya57454gdu63vs700hw67eh7h",
     *   "Project": "439afea5aef1422681f78cce66c9aa90",
     *   "Name": "DetermineEquipmentsrs",
     *   "Description": [
     *     {
     *       "Language": "en",
     *       "Text": "Rule service to determine equipments to be issued to the employee"
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
     *       "Key": "com.sap.hana.hdi.source.container",
     *       "Value": "z_hybris_gen"
     *     }
     *   ],
     *   "Vocabulary": {
     *     "Input": [
     *       {
     *         "ObjectId": "a55b061c2a57454ea6a28fa0022f1f37"
     *       }
     *     ],
     *     "Result": [
     *       {
     *         "ObjectId": "s23ug27838etgditg82dg8282iug3231"
     *       }
     *     ],
     *     "Reference": [
     *       {
     *         "ObjectId": "r2425ug27838etgditg82dg8282iug2928"
     *       }
     *     ]
     *   }
     * }
     */
    export type RuleService = AdminData & {
      'Vocabulary'?: Vocabulary;
      'Annotations'?: Annotations;
    } | Record<string, any>;
