/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { Rule } from './rule';
    import type { DecisionTable } from './decision-table';
    /**
     * Representation of the 'DecisionTableRule' schema.
     * @example {
     *   "Id": "34f484820a3a4f6584fb5a73b37b6e02",
     *   "Project": "439afea5aef1422681f78cce66c9aa90",
     *   "Name": "DetermineMobile",
     *   "Description": [
     *     {
     *       "Language": "en",
     *       "Text": "Rule for issuing mobile for an employee"
     *     }
     *   ],
     *   "Label": [
     *     {
     *       "Language": "en",
     *       "Text": "Determine Mobile"
     *     },
     *     {
     *       "Language": "",
     *       "Text": "Determine Mobile"
     *     }
     *   ],
     *   "Type": "DT",
     *   "Result": {
     *     "ObjectId": "a55b061c2a57454ea6a28fa0022f1f37"
     *   },
     *   "DecisionTable": {
     *     "HitPolicy": "MHO",
     *     "Column": [
     *       {
     *         "Id": "1",
     *         "SequenceNumber": 1,
     *         "Description": [
     *           {
     *             "Language": "en",
     *             "Text": "DOJ of the Employee"
     *           }
     *         ],
     *         "Type": "C",
     *         "Condition": {
     *           "Expression": "DOJ of the Employee",
     *           "ValueOnly": false,
     *           "FixedOperator": "is greater than"
     *         }
     *       },
     *       {
     *         "Id": "2",
     *         "SequenceNumber": 2,
     *         "Description": [
     *           {
     *             "Language": "en",
     *             "Text": "WorkExperience of the Employee"
     *           }
     *         ],
     *         "Type": "C",
     *         "Condition": {
     *           "Expression": "WorkExperience of the Employee",
     *           "ValueOnly": false,
     *           "FixedOperator": "is greater than"
     *         }
     *       },
     *       {
     *         "Id": "3",
     *         "SequenceNumber": 3,
     *         "Description": [
     *           {
     *             "Language": "en",
     *             "Text": "mobile phone model"
     *           }
     *         ],
     *         "Type": "R",
     *         "Result": {
     *           "Segment": "71e40e28ab164635a2771371084d6c18",
     *           "Cell": {
     *             "Mode": "E",
     *             "FixedExpression": "Lenovo Thinkpad 550",
     *             "AST": [
     *               {
     *                 "Id": "1",
     *                 "Root": true,
     *                 "Value": "Lenovo Thinkpad 550",
     *                 "Output": {
     *                   "BusinessDataType": "S",
     *                   "DataObjectType": "E"
     *                 }
     *               }
     *             ]
     *           }
     *         }
     *       }
     *     ],
     *     "Row": [
     *       {
     *         "Id": "1",
     *         "SequenceNumber": 1
     *       },
     *       {
     *         "Id": "2",
     *         "SequenceNumber": 2
     *       },
     *       {
     *         "Id": "3",
     *         "SequenceNumber": 3
     *       }
     *     ],
     *     "Cell": [
     *       {
     *         "ColumnId": "1",
     *         "RowId": "1",
     *         "Expression": "'2009-09-09'"
     *       },
     *       {
     *         "ColumnId": "1",
     *         "RowId": "2",
     *         "Expression": "'2010-10-10'"
     *       },
     *       {
     *         "ColumnId": "1",
     *         "RowId": "3",
     *         "Expression": "'2011-11-11'"
     *       },
     *       {
     *         "ColumnId": "2",
     *         "RowId": "1",
     *         "Expression": "9"
     *       },
     *       {
     *         "ColumnId": "2",
     *         "RowId": "2",
     *         "Expression": "10"
     *       },
     *       {
     *         "ColumnId": "2",
     *         "RowId": "3",
     *         "Expression": "11"
     *       },
     *       {
     *         "ColumnId": "3",
     *         "RowId": "1",
     *         "Expression": "'oneplus'"
     *       },
     *       {
     *         "ColumnId": "3",
     *         "RowId": "2",
     *         "Expression": "'google pixel 2'"
     *       },
     *       {
     *         "ColumnId": "3",
     *         "RowId": "3",
     *         "Expression": "'iphone x'"
     *       }
     *     ]
     *   }
     * }
     */
    export type DecisionTableRule = Rule & {
      'DecisionTable'?: DecisionTable;
    } | Record<string, any>;
