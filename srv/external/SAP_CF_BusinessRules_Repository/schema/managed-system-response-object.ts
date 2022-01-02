/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { ManagedSystemObject } from './managed-system-object';
    /**
     * Representation of the 'ManagedSystemResponseObject' schema.
     */
    export type ManagedSystemResponseObject = ManagedSystemObject & {
      /**
       * date system was updated.
       * Format: "date-time".
       */
      'ChangedOn'?: string;
      /**
       * system updated by.
       */
      'ChangedBy'?: string;
    } | Record<string, any>;
