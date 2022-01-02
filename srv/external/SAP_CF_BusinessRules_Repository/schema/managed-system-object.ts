/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    
    /**
     * Representation of the 'ManagedSystemObject' schema.
     * @example {
     *   "Name": "UIA",
     *   "Description": "System description",
     *   "DestinationName": "UIADestinationName"
     * }
     */
    export type ManagedSystemObject = {
      /**
       * Name of the system.
       */
      'Name'?: string;
      /**
       * Description of the connected system.
       */
      'Description'?: string;
      /**
       * name of the destination configured in SAP BTP for connecting to the external system
       */
      'DestinationName'?: string;
    } | Record<string, any>;
