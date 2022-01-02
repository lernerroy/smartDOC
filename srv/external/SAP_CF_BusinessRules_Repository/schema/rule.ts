/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { AdminData } from './admin-data';
    /**
     * Representation of the 'Rule' schema.
     */
    export type Rule = AdminData & {
      /**
       * It represents 1.0 or 2.0 expression language based Rule. It defaults to the expression language of the project
       */
      'ExpressionLanguageVersion'?: '1.0.0' | '2.0.0';
      /**
       * Type of the rule. Rules can be of two types namely Decision Table(DT) and Text Rule(TR).
       */
      'Type'?: 'DT' | 'TR';
      'Result'?: {
            /**
             * ID of the result data object
             */
            'ObjectId'?: string;
          } | Record<string, any>;
    } | Record<string, any>;
