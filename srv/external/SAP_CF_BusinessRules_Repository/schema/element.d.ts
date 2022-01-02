import type { Description } from './description';
/**
 * Representation of the 'Element' schema.
 */
export declare type Element = {
    /**
     * Business data type of the Element - Boolean (B), Number (N), String (S), Date (D), UTC Timestamp (U), Geometry (G), Amount (A)
     */
    'BusinessDataType'?: 'B' | 'D' | 'N' | 'S' | 'U' | 'G' | 'A';
    'Values'?: {
        /**
         * Value help type of the Element - User defined Static Value list (U), External OData Value Service(O)
         */
        'Type'?: 'U' | 'O';
        /**
         * Relative Service URL to value list on external system. Relevant for value help type O.  If the value help has to be fetched from https://\<host>/sap/c4c/odata/v1/c4codata/AccountABCClassification, a managed system must be created with destination having the url https://\<host> and the relative service url must be set as /sap/c4c/odata/v1/c4codata/AccountABCClassification
         */
        'Url'?: string;
        /**
         * Relevant for value help type 'O'
         */
        'Fields'?: {
            /**
             * Value property path of the external value list
             */
            'Key'?: string;
            /**
             * Language property path of the external value list
             */
            'Language'?: string;
            /**
             * Description property path of the external value list
             */
            'Text'?: string;
        } | Record<string, any>;
        /**
         * List of static value enumerations. Relevant for value help type 'U'
         */
        'Enumeration'?: {
            /**
             * Value code
             * @example "APJ"
             */
            'Value'?: string;
            'Description'?: Description;
        } | Record<string, any>[];
    } | Record<string, any>;
} | Record<string, any>;
//# sourceMappingURL=element.d.ts.map