/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { AdminData } from './admin-data';
    /**
     * Representation of the 'Ruleset' schema.
     * @example {
     *   "Id": "b85a3620bfd911e7abc4cec278b6b50a",
     *   "Project": "439afea5aef1422681f78cce66c9aa90",
     *   "Name": "DetermineMobileRuleset",
     *   "Description": [
     *     {
     *       "Language": "en",
     *       "Text": "Ruleset for issuing mobile to an employee"
     *     }
     *   ],
     *   "ChangedOn": "2017-12-19T06:40:17.839Z",
     *   "ChangedBy": "LORIN",
     *   "Label": [
     *     {
     *       "Language": "en",
     *       "Text": "Issue Mobile"
     *     },
     *     {
     *       "Language": "",
     *       "Text": "Issue Mobile"
     *     }
     *   ],
     *   "RuleService": {
     *     "ObjectId": "a55b061c2a57454ea6a28fa0022f1f37"
     *   },
     *   "Rule": [
     *     {
     *       "ObjectId": "34f484820a3a4f6584fb5a73b37b6e02",
     *       "SequenceNumber": 1
     *     }
     *   ],
     *   "Vocabulary": {
     *     "Inclusion": [
     *       {
     *         "ObjectId": "15ebcc8afdd24101a2c23cad1afa4324"
     *       },
     *       {
     *         "ObjectId": "1137c674cb2040e1804c1c0d794b4e54"
     *       }
     *     ],
     *     "Exclusion": [
     *       {
     *         "ObjectId": "a55b061c2a57454ea6a28fa0022f1f37"
     *       }
     *     ]
     *   },
     *   "Priority": 50,
     *   "Policy": "A"
     * }
     */
    export type Ruleset = AdminData & {
      'RuleService'?: {
            'ObjectId'?: string;
          } | Record<string, any>;
      'Rule'?: {
            'ObjectId'?: string;
            /**
             * Sequence of the Rule
             */
            'SequenceNumber'?: number;
          } | Record<string, any>[];
      'Vocabulary'?: {
            'Inclusion'?: {
                  'ObjectId'?: string;
                } | Record<string, any>[];
            'Exclusion'?: {
                  'ObjectId'?: string;
                } | Record<string, any>[];
          } | Record<string, any>;
      /**
       * Priority of the Ruleset. The default value is 50.00 and influences the order of execution of Ruleset in a RuleService. Lower values means higher priority
       * Format: "double".
       * Maximum: 99.
       * Minimum: 1.
       */
      'Priority'?: number;
      /**
       * Execution policy of the Ruleset. Aggregation (A) or Orchestration (O)
       */
      'Policy'?: 'A' | 'O';
    } | Record<string, any>;
