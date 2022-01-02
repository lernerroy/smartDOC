/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { DataObject } from './data-object';
    import type { Structure } from './structure';
    import type { Table } from './table';
    import type { Element } from './element';
    /**
     * Representation of the 'DataObjectObject' schema.
     * @example {
     *   "Id": "a55b061c2a57454ea6a28fa0022f1f37",
     *   "Project": "439afea5aef1422681f78cce66c9aa90",
     *   "Name": "EquipmentDetails",
     *   "Description": [
     *     {
     *       "Language": "en",
     *       "Text": "Details of Equipment to be issued to the employee"
     *     }
     *   ],
     *   "ChangedOn": "2017-12-19T06:40:17.839Z",
     *   "ChangedBy": "LORIN",
     *   "Label": [
     *     {
     *       "Language": "en",
     *       "Text": "Equipment Details"
     *     },
     *     {
     *       "Language": "",
     *       "Text": "Equipment Details"
     *     }
     *   ],
     *   "Annotations": [
     *     {
     *       "Key": "com.sap.hana.cds.context",
     *       "Value": "iot"
     *     }
     *   ],
     *   "Type": "S",
     *   "Extensible": false,
     *   "Extension": {
     *     "ObjectId": "defb93619df94a68aa9ee616f732be40"
     *   },
     *   "Structure": {
     *     "Component": [
     *       {
     *         "Id": "1fa07350f8f343e4b3ab8ee98f4b44b7",
     *         "Name": "Quantity",
     *         "Description": [
     *           {
     *             "Language": "en",
     *             "Text": "Number of equipment"
     *           }
     *         ],
     *         "Label": [
     *           {
     *             "Language": "en",
     *             "Text": "Equipment Number"
     *           },
     *           {
     *             "Language": "",
     *             "Text": "Equipment Number"
     *           }
     *         ],
     *         "Type": "I",
     *         "Element": {
     *           "BusinessDataType": "N",
     *           "Values": {
     *             "Type": "O",
     *             "Url": "/sap/c4c/odata/v1/c4codata/AccountABCClassification",
     *             "Fields": {
     *               "Key": "ClassificationCode",
     *               "Language": "Regions",
     *               "Text": "ClassificationDescription"
     *             }
     *           }
     *         },
     *         "Annotations": [
     *           {
     *             "Key": "com.sap.abap.cds.column.name",
     *             "Value": "ID"
     *           }
     *         ]
     *       },
     *       {
     *         "Id": "1fa07350f8f343e4b3ab8ee98f4b6789",
     *         "Name": "EquipmentId",
     *         "Description": [
     *           {
     *             "Language": "en",
     *             "Text": "Id of equipment"
     *           }
     *         ],
     *         "Label": [
     *           {
     *             "Language": "en",
     *             "Text": "Equipment ID"
     *           },
     *           {
     *             "Language": "",
     *             "Text": "Equipment ID"
     *           }
     *         ],
     *         "Type": "I",
     *         "Element": {
     *           "BusinessDataType": "S",
     *           "Values": {
     *             "Type": "U",
     *             "Enumeration": [
     *               {
     *                 "Value": "HP200",
     *                 "Description": [
     *                   {
     *                     "Language": "en",
     *                     "Text": "HP 200 series model"
     *                   }
     *                 ]
     *               },
     *               {
     *                 "Value": "HP220",
     *                 "Description": [
     *                   {
     *                     "Language": "en",
     *                     "Text": "HP 200 series model"
     *                   }
     *                 ]
     *               }
     *             ]
     *           }
     *         },
     *         "Annotations": [
     *           {
     *             "Key": "com.sap.abap.cds.column.name",
     *             "Value": "ID"
     *           }
     *         ]
     *       },
     *       {
     *         "Id": "fdf02eb6dd22495ba4659ce709663c17",
     *         "Name": "EquipmentAllocation",
     *         "Description": [
     *           {
     *             "Language": "en",
     *             "Text": "Allocation of Equipment model to Employer"
     *           }
     *         ],
     *         "Label": [
     *           {
     *             "Language": "en",
     *             "Text": "Equipment Allocation"
     *           },
     *           {
     *             "Language": "",
     *             "Text": "Equipment Allocation"
     *           }
     *         ],
     *         "Type": "A",
     *         "Association": {
     *           "ObjectId": "71e40e28ab164635a2771371084d6c18",
     *           "Cardinality": "1..1",
     *           "Condition": [
     *             {
     *               "Source": {
     *                 "Segment": "1fa07350f8f343e4b3ab8ee98f4b44b7"
     *               },
     *               "Target": {
     *                 "Segment": "671bdbcf060c4d67822c015847902c3b"
     *               }
     *             }
     *           ]
     *         }
     *       }
     *     ]
     *   }
     * }
     */
    export type DataObjectObject = DataObject & {
      'Structure'?: Structure;
      'Table'?: Table;
      'Element'?: Element;
    } | Record<string, any>;
