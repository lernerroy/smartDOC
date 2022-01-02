import type { Description } from './description';
import type { Label } from './label';
import type { Annotations } from './annotations';
import type { Element } from './element';
/**
 * Object containing properties specific to structure type data object
 */
export declare type Structure = {
    /**
     * Collection of components belonging to this data object. A component can either be an attribute or an association
     */
    'Component'?: {
        /**
         * ID of the component
         */
        'Id'?: string;
        /**
         * Name of the component
         */
        'Name'?: string;
        'Description'?: Description;
        'Label'?: Label;
        /**
         * Type of the Component - Inline (I) or Association (A).
         */
        'Type'?: 'I' | 'A';
        'Annotations'?: Annotations;
        'Element'?: Element;
        /**
         * Object containing properties specific to a data object association. In case of an attribute, value of association will be null.
         */
        'Association'?: {
            /**
             * ID of the target data object
             */
            'ObjectId'?: string;
            /**
             * Cardinality of the association
             */
            'Cardinality'?: '0..1' | '1..0' | '1..1' | '1..n';
            /**
             * Collection of mapping information between target and source data objects' attributes
             */
            'Condition'?: {
                'Source'?: {
                    /**
                     * ID of the source attribute
                     */
                    'Segment'?: string;
                } | Record<string, any>;
                'Target'?: {
                    /**
                     * ID of the target attribute
                     */
                    'Segment'?: string;
                } | Record<string, any>;
            } | Record<string, any>[];
        } | Record<string, any>;
    } | Record<string, any>[];
} | Record<string, any>;
//# sourceMappingURL=structure.d.ts.map