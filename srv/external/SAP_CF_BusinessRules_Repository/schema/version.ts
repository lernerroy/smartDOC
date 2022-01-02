/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'Version' schema.
     */
    export type Version = {
      /**
       * ID of the Version
       * Max Length: 18.
       * Pattern: "[0-9]".
       */
      'Id'?: string;
      /**
       * description of the revision
       */
      'Description'?: string;
      /**
       * revision name of the version
       */
      'Revision'?: string;
      /**
       * Id of the parent version
       * Max Length: 18.
       * Pattern: "[0-9]".
       */
      'ParentId'?: string;
      /**
       * The last updated time of the version
       * Format: "date-time".
       */
      'ChangedOn'?: string;
      /**
       * The id of the user who performed the last update
       */
      'ChangedBy'?: string;
      /**
       * Project Id
       */
      'Project'?: string;
    } | Record<string, any>;
