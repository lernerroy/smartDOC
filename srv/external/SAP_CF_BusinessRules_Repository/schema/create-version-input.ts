/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'CreateVersionInput' schema.
     * @example {
     *   "Id": "000001000000000000",
     *   "Revision": "Tax",
     *   "Description": "First revision for tax calculation"
     * }
     */
    export type CreateVersionInput = {
      /**
       * ID of the Version
       * Max Length: 18.
       * Pattern: "[0-9]".
       */
      'Id'?: string;
      /**
       * Revision name of the released project
       */
      'Revision'?: string;
      /**
       * Description of version
       */
      'Description'?: string;
    } | Record<string, any>;
