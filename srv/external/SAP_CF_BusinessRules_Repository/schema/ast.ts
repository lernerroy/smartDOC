/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { Children } from './children';
    /**
     * Rule expression in the form of nodes. It must be set only if the expression language is 2.0
     */
    export type AST = {
      /**
       * ID of the node
       * Pattern: "^[0-9a-fA-F]{32}$".
       */
      'Id'?: string;
      /**
       * must be set to true if the node is root. It is false by default.
       */
      'Root'?: boolean;
      /**
       * must be set if the node is a function
       */
      'Function'?: string;
      /**
       * must be set if the node is a literal
       */
      'Value'?: string;
      /**
       * must be set if the node represents dataObjectId or attributeId or associationId
       */
      'Reference'?: string;
      /**
       * must be set if the node is enclosed with in a paranthesis
       */
      'Parentheses'?: boolean;
      /**
       * Placeholder are used for Rule with split expressions like DT(Condition Header and Cell). Placeholder are used to complete split expression. If the fixed operator (while modelling condition expressions in DT settings) is set then two placeholder nodes must be added or if the fixed operator is not set then one placeholder node must be added
       */
      'Placeholder'?: boolean;
      /**
       * can be used to store an incomeplete/invalid expression. Presence of this results in failed compilation
       */
      'IncompleteExpression'?: string;
      /**
       * Must be set for literal nodes. It is optional for function nodes.
       */
      'Output'?: {
            /**
             * dataObjectType of the node. It is optional.
             */
            'DataObjectType'?: string;
            /**
             * the datatype of the node (number(N), string(S), date(D), boolean(B), UTC format timestamp(U), geometry(G)). It is optional.
             */
            'BusinessDataType'?: 'N' | 'S' | 'D' | 'B' | 'U' | 'G';
          } | Record<string, any>;
      'Children'?: Children;
    } | Record<string, any>[];
