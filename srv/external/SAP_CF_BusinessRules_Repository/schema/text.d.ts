import type { AST } from './ast';
/**
 * Representation of the 'Text' schema.
 */
export declare type Text = {
    'PredefinedResults'?: {
        /**
         * Id of the Operation
         */
        'Id'?: string;
        /**
         * Sequence number of the Predefined Results.
         * Format: "float".
         */
        'SequenceNumber'?: number;
        /**
         * Mode is used if the given segment is allowed to be updated in any of the branches. Can have a value of Hidden(H), Editable(E), Read Only(R). Mode marked as Hidden/Read Only modifying this segment in any statement in any of branches will be ignored
         */
        'Mode'?: 'H' | 'E' | 'R';
        /**
         * Id of the Result Data Object Attribute
         */
        'Segment'?: string;
        /**
         * Result expression. It must be set only if the expression language is 1.0
         */
        'Expression'?: string;
        'AST'?: AST;
    } | Record<string, any>[];
    /**
     * If, Else-If conditions and associated results of the text rule
     */
    'Branches'?: {
        /**
         * Id of the Branch
         */
        'Id'?: string;
        /**
         * Sequence number of the Branch.
         * Format: "float".
         */
        'SequenceNumber'?: number;
        'Condition'?: {
            /**
             * Expression of the condition. It must be set only if the expression language is 1.0
             */
            'Expression'?: string;
            'AST'?: AST;
        } | Record<string, any>;
        /**
         * Operation to be performed when condition is evaluated
         */
        'Operation'?: {
            /**
             * Id of the Operation
             */
            'Id'?: string;
            /**
             * Sequence number of the Operation.
             * Format: "float".
             */
            'SequenceNumber'?: number;
            /**
             * Id of the Result Data Object Attribute
             */
            'Segment'?: string;
            /**
             * Result expression. It must be set only if the expression language is 1.0
             */
            'Expression'?: string;
            'AST'?: AST;
        } | Record<string, any>[];
    } | Record<string, any>[];
    /**
     * Else condition and associated default result of the text rule
     */
    'Default'?: {
        /**
         * Id of the default operation
         */
        'Id'?: string;
        /**
         * Operation to be performed when condition is evaluated
         */
        'Operation'?: {
            /**
             * Id of the Operation
             */
            'Id'?: string;
            /**
             * Sequence number of the Operation.
             * Format: "float".
             */
            'SequenceNumber'?: number;
            /**
             * Id of the Result Data Object Attribute
             */
            'Segment'?: string;
            /**
             * Result expression. It must be set only if the expression language is 1.0
             */
            'Expression'?: string;
            'AST'?: AST;
        } | Record<string, any>[];
    } | Record<string, any>;
} | Record<string, any>;
//# sourceMappingURL=text.d.ts.map