import type { Rule } from './rule';
import type { DecisionTable } from './decision-table';
import type { Text } from './text';
/**
 * Representation of the 'RuleObject' schema.
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
 *   "ExpressionLanguageVersion": "2.0.0",
 *   "ChangedOn": "2017-12-19T06:40:17.839Z",
 *   "ChangedBy": "LORIN",
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
 *         "Label": [
 *           {
 *             "Language": "en",
 *             "Text": "Date of joining"
 *           },
 *           {
 *             "Language": "",
 *             "Text": "Date of joining"
 *           }
 *         ],
 *         "Type": "C",
 *         "Condition": {
 *           "Expression": "DOJ of the Employee",
 *           "ValueOnly": false,
 *           "FixedOperator": "is greater than",
 *           "AST": [
 *             {
 *               "Id": "1",
 *               "Root": true,
 *               "Reference": "/fd55f01892874abe851922b51bc04d7d/7b49f5626a6245fc888efe01924ff942"
 *             }
 *           ]
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
 *         "Label": [
 *           {
 *             "Language": "en",
 *             "Text": "Work experience"
 *           },
 *           {
 *             "Language": "",
 *             "Text": "Work experience"
 *           }
 *         ],
 *         "Type": "C",
 *         "Condition": {
 *           "Expression": "WorkExperience of the Employee",
 *           "ValueOnly": false,
 *           "FixedOperator": "is greater than",
 *           "AST": [
 *             {
 *               "Id": "1",
 *               "Root": true,
 *               "Reference": "/fd55f01892874abe851922b51bc04d7d/c5c8b39b49ee4bedbef3feb72e31fb85"
 *             }
 *           ]
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
 *         "Label": [
 *           {
 *             "Language": "en",
 *             "Text": "Mobile model"
 *           },
 *           {
 *             "Language": "",
 *             "Text": "Mobile model"
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
 *         "Expression": "'2009-09-09'",
 *         "AST": [
 *           {
 *             "Id": "1",
 *             "Root": true,
 *             "Placeholder": true,
 *             "Children": [
 *               {
 *                 "Id": "2",
 *                 "SequenceNumber": 1
 *               },
 *               {
 *                 "Id": "3",
 *                 "SequenceNumber": 2
 *               }
 *             ]
 *           },
 *           {
 *             "Id": "2",
 *             "Placeholder": true
 *           },
 *           {
 *             "Id": "3",
 *             "Value": "2009-09-09",
 *             "Output": {
 *               "BusinessDataType": "D",
 *               "DataObjectType": "E"
 *             }
 *           }
 *         ]
 *       },
 *       {
 *         "ColumnId": "1",
 *         "RowId": "2",
 *         "Expression": "'2010-10-10'",
 *         "AST": [
 *           {
 *             "Id": "1",
 *             "Root": true,
 *             "Placeholder": true,
 *             "Children": [
 *               {
 *                 "Id": "2",
 *                 "SequenceNumber": 1
 *               },
 *               {
 *                 "Id": "3",
 *                 "SequenceNumber": 2
 *               }
 *             ]
 *           },
 *           {
 *             "Id": "2",
 *             "Placeholder": true
 *           },
 *           {
 *             "Id": "3",
 *             "Value": "2010-10-10",
 *             "Output": {
 *               "BusinessDataType": "D",
 *               "DataObjectType": "E"
 *             }
 *           }
 *         ]
 *       },
 *       {
 *         "ColumnId": "1",
 *         "RowId": "3",
 *         "Expression": "'2011-11-11'",
 *         "AST": [
 *           {
 *             "Id": "1",
 *             "Root": true,
 *             "Placeholder": true,
 *             "Children": [
 *               {
 *                 "Id": "2",
 *                 "SequenceNumber": 1
 *               },
 *               {
 *                 "Id": "3",
 *                 "SequenceNumber": 2
 *               }
 *             ]
 *           },
 *           {
 *             "Id": "2",
 *             "Placeholder": true
 *           },
 *           {
 *             "Id": "3",
 *             "Value": "2011-11-11",
 *             "Output": {
 *               "BusinessDataType": "D",
 *               "DataObjectType": "E"
 *             }
 *           }
 *         ]
 *       },
 *       {
 *         "ColumnId": "2",
 *         "RowId": "1",
 *         "Expression": "9",
 *         "AST": [
 *           {
 *             "Id": "1",
 *             "Root": true,
 *             "Placeholder": true,
 *             "Children": [
 *               {
 *                 "Id": "2",
 *                 "SequenceNumber": 1
 *               },
 *               {
 *                 "Id": "3",
 *                 "SequenceNumber": 2
 *               }
 *             ]
 *           },
 *           {
 *             "Id": "2",
 *             "Placeholder": true
 *           },
 *           {
 *             "Id": "3",
 *             "Value": "9",
 *             "Output": {
 *               "BusinessDataType": "N",
 *               "DataObjectType": "E"
 *             }
 *           }
 *         ]
 *       },
 *       {
 *         "ColumnId": "2",
 *         "RowId": "2",
 *         "Expression": "10",
 *         "AST": [
 *           {
 *             "Id": "1",
 *             "Root": true,
 *             "Placeholder": true,
 *             "Children": [
 *               {
 *                 "Id": "2",
 *                 "SequenceNumber": 1
 *               },
 *               {
 *                 "Id": "3",
 *                 "SequenceNumber": 2
 *               }
 *             ]
 *           },
 *           {
 *             "Id": "2",
 *             "Placeholder": true
 *           },
 *           {
 *             "Id": "3",
 *             "Value": "10",
 *             "Output": {
 *               "BusinessDataType": "N",
 *               "DataObjectType": "E"
 *             }
 *           }
 *         ]
 *       },
 *       {
 *         "ColumnId": "2",
 *         "RowId": "3",
 *         "Expression": "11",
 *         "AST": [
 *           {
 *             "Id": "1",
 *             "Root": true,
 *             "Placeholder": true,
 *             "Children": [
 *               {
 *                 "Id": "2",
 *                 "SequenceNumber": 1
 *               },
 *               {
 *                 "Id": "3",
 *                 "SequenceNumber": 2
 *               }
 *             ]
 *           },
 *           {
 *             "Id": "2",
 *             "Placeholder": true
 *           },
 *           {
 *             "Id": "3",
 *             "Value": "11",
 *             "Output": {
 *               "BusinessDataType": "N",
 *               "DataObjectType": "E"
 *             }
 *           }
 *         ]
 *       },
 *       {
 *         "ColumnId": "3",
 *         "RowId": "1",
 *         "Expression": "'oneplus'",
 *         "AST": [
 *           {
 *             "Id": "1",
 *             "Root": true,
 *             "Value": "oneplus",
 *             "Output": {
 *               "BusinessDataType": "S",
 *               "DataObjectType": "E"
 *             }
 *           }
 *         ]
 *       },
 *       {
 *         "ColumnId": "3",
 *         "RowId": "2",
 *         "Expression": "'google pixel 2'",
 *         "AST": [
 *           {
 *             "Id": "1",
 *             "Root": true,
 *             "Value": "google pixel 2",
 *             "Output": {
 *               "BusinessDataType": "S",
 *               "DataObjectType": "E"
 *             }
 *           }
 *         ]
 *       },
 *       {
 *         "ColumnId": "3",
 *         "RowId": "3",
 *         "Expression": "'iphone x'",
 *         "AST": [
 *           {
 *             "Id": "1",
 *             "Root": true,
 *             "Value": "iphone x",
 *             "Output": {
 *               "BusinessDataType": "S",
 *               "DataObjectType": "E"
 *             }
 *           }
 *         ]
 *       }
 *     ]
 *   },
 *   "Text": {
 *     "Predefined": [
 *       {
 *         "Id": "cad632ba27814cd0b2ebfa8cdf634a3f",
 *         "SequenceNumber": 1,
 *         "Mode": "E",
 *         "Segment": "114ddd069ea84ff5a05626bf81705e83",
 *         "Expression": "'Lenovo Thinkpad 550'",
 *         "AST": [
 *           {
 *             "Id": "1",
 *             "Root": true,
 *             "Value": "Lenovo Thinkpad 550",
 *             "Output": {
 *               "BusinessDataType": "S",
 *               "DataObjectType": "E"
 *             }
 *           }
 *         ]
 *       }
 *     ],
 *     "Branches": [
 *       {
 *         "Id": "7f893680f1434b8fba1e02e0181dbef6",
 *         "SequenceNumber": 1,
 *         "Condition": {
 *           "Expression": "Position of the Employee is equal to 'Manager' and Employee is not RemoteLocated",
 *           "AST": [
 *             {
 *               "Id": "1",
 *               "Function": "And",
 *               "Root": true,
 *               "Children": [
 *                 {
 *                   "Id": "2",
 *                   "SequenceNumber": 1
 *                 },
 *                 {
 *                   "Id": "3",
 *                   "SequenceNumber": 2
 *                 }
 *               ]
 *             },
 *             {
 *               "Id": "2",
 *               "Function": "IsEqual",
 *               "Children": [
 *                 {
 *                   "Id": "4",
 *                   "SequenceNumber": 1
 *                 },
 *                 {
 *                   "Id": "5",
 *                   "SequenceNumber": 2
 *                 }
 *               ]
 *             },
 *             {
 *               "Id": "4",
 *               "Reference": "/fd55f01892874abe851922b51bc04d7d/9c52bfcca528470b9af7c37ec80a70d8"
 *             },
 *             {
 *               "Id": "5",
 *               "Output": {
 *                 "BusinessDataType": "S",
 *                 "DataObjectType": "E"
 *               },
 *               "Value": "Manager"
 *             },
 *             {
 *               "Id": "3",
 *               "Function": "Not",
 *               "Children": [
 *                 {
 *                   "Id": "6",
 *                   "SequenceNumber": 1
 *                 }
 *               ]
 *             },
 *             {
 *               "Id": "6",
 *               "Reference": "/fd55f01892874abe851922b51bc04d7d/be9bb585bb8545f7b16d16ef9b9d755e"
 *             }
 *           ]
 *         },
 *         "Operation": [
 *           {
 *             "Id": "cad632ba27814cd0b2ebfa8cdf634a3f",
 *             "SequenceNumber": 1,
 *             "Segment": "114ddd069ea84ff5a05626bf81705e83",
 *             "Expression": "'Lenovo Yoga X1'",
 *             "AST": [
 *               {
 *                 "Id": "1",
 *                 "Root": true,
 *                 "Value": "Lenovo Yoga X1",
 *                 "Output": {
 *                   "BusinessDataType": "S",
 *                   "DataObjectType": "E"
 *                 }
 *               }
 *             ]
 *           }
 *         ]
 *       },
 *       {
 *         "Id": "72b065f14b8d4a509fabe042cec272a0",
 *         "SequenceNumber": 2,
 *         "Condition": {
 *           "Expression": "Designation_Attr of the Employee contains 'Developer'",
 *           "AST": [
 *             {
 *               "Id": "1",
 *               "Function": "ContainsString",
 *               "Root": true,
 *               "Children": [
 *                 {
 *                   "Id": "2",
 *                   "SequenceNumber": 1
 *                 },
 *                 {
 *                   "Id": "3",
 *                   "SequenceNumber": 2
 *                 }
 *               ]
 *             },
 *             {
 *               "Id": "2",
 *               "Reference": "/fd55f01892874abe851922b51bc04d7d/c65d726c2ba74f72863232344ccf5352"
 *             },
 *             {
 *               "Id": "3",
 *               "Output": {
 *                 "BusinessDataType": "S",
 *                 "DataObjectType": "E"
 *               },
 *               "Value": "Developer"
 *             }
 *           ]
 *         },
 *         "Operation": [
 *           {
 *             "Id": "cad632ba27814cd0b2ebfa8cdf634a3f",
 *             "SequenceNumber": 1,
 *             "Segment": "114ddd069ea84ff5a05626bf81705e83",
 *             "Expression": "'Mac'",
 *             "AST": [
 *               {
 *                 "Id": "1",
 *                 "Root": true,
 *                 "Value": "Mac",
 *                 "Output": {
 *                   "BusinessDataType": "S",
 *                   "DataObjectType": "E"
 *                 }
 *               }
 *             ]
 *           }
 *         ]
 *       }
 *     ],
 *     "Default": {
 *       "Id": "7fe05d5fff664e6f85bd4859454efae0",
 *       "Operation": [
 *         {
 *           "Id": "cad632ba27814cd0b2ebfa8cdf634a3f",
 *           "SequenceNumber": 1,
 *           "Segment": "114ddd069ea84ff5a05626bf81705e83",
 *           "Expression": "'Lenovo T 520'",
 *           "AST": [
 *             {
 *               "Id": "1",
 *               "Root": true,
 *               "Value": "Lenovo T 520",
 *               "Output": {
 *                 "BusinessDataType": "S",
 *                 "DataObjectType": "E"
 *               }
 *             }
 *           ]
 *         }
 *       ]
 *     }
 *   }
 * }
 */
export declare type RuleObject = Rule & {
    'DecisionTable'?: DecisionTable;
    'Text'?: Text;
} | Record<string, any>;
//# sourceMappingURL=rule-object.d.ts.map