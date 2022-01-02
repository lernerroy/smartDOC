/**
 * Representation of the 'ManagedSystemObject' schema.
 * @example {
 *   "Name": "UIA",
 *   "Description": "System description",
 *   "DestinationName": "UIADestinationName"
 * }
 */
export declare type ManagedSystemObject = {
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
//# sourceMappingURL=managed-system-object.d.ts.map