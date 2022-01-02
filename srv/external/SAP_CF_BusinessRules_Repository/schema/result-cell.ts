/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { AST } from './ast';
    /**
     * Representation of the 'ResultCell' schema.
     */
    export type ResultCell = {
      /**
       * Mode is used if the given segment is allowed to be updated in any of the branches. Can have a value of Hidden(H) and Editable(E).
       */
      'Mode'?: 'H' | 'E';
      'FixedExpression'?: string;
      'AST'?: AST;
    } | Record<string, any>;
