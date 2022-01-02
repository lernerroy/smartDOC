/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { Annotations } from './annotations';
    /**
     * Representation of the 'Table' schema.
     */
    export type Table = {
      /**
       * Any other data object may be used as LineType, also structures and tables
       */
      'LineType'?: {
            /**
             * ID of the data object used as line type
             */
            'ObjectId'?: string;
          } | Record<string, any>;
      'Parameter'?: {
            /**
             * ID of the Parameter
             * @example "b85a3620bfd911e7abc4cec278b6b59b"
             */
            'Id'?: string;
            /**
             * Name of the Parameter
             */
            'Name'?: string;
            /**
             * ID of the Data Object of type Element used as Parameter
             * @example "b85a3620bfd911e7abc4cec278b6b59b"
             */
            'ObjectId'?: string;
            'Annotations'?: Annotations;
          } | Record<string, any>[];
    } | Record<string, any>;
