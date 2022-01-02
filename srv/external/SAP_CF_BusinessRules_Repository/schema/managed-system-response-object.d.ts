import type { ManagedSystemObject } from './managed-system-object';
/**
 * Representation of the 'ManagedSystemResponseObject' schema.
 */
export declare type ManagedSystemResponseObject = ManagedSystemObject & {
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
//# sourceMappingURL=managed-system-response-object.d.ts.map