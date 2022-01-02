import type { Description } from './description';
import type { Label } from './label';
import type { Annotations } from './annotations';
/**
 * Representation of the 'AdminData' schema.
 */
export declare type AdminData = {
    /**
     * ID of the entity(UUID)
     */
    'Id'?: string;
    /**
     * ID of the Project(UUID) that this entity belongs to
     */
    'Project'?: string;
    /**
     * Name of the entity
     */
    'Name'?: string;
    'Description'?: Description;
    /**
     * The last updated time of the version
     * Format: "date-time".
     */
    'ChangedOn'?: string;
    /**
     * The id of the user who performed the last update
     */
    'ChangedBy'?: string;
    'Label'?: Label;
    'Annotations'?: Annotations;
} | Record<string, any>;
//# sourceMappingURL=admin-data.d.ts.map