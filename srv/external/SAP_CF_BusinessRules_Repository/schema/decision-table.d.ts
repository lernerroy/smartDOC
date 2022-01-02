import type { Description } from './description';
import type { Label } from './label';
import type { AST } from './ast';
import type { ResultCell } from './result-cell';
/**
 * Representation of the 'DecisionTable' schema.
 */
export declare type DecisionTable = {
    /**
     * The hit policy of rule, has to be either Single Hit First (SHF) or Mutiple Hit Order (MHO)
     */
    'HitPolicy'?: 'SHF' | 'MHO';
    /**
     * Collection of columns belonging to this decision table
     */
    'Column'?: {
        /**
         * ID of the Column
         */
        'Id'?: string;
        /**
         * Sequence number of the column
         * Format: "float".
         */
        'SequenceNumber'?: number;
        'Description'?: Description;
        'Label'?: Label;
        /**
         * Type of the column, has to be either Condition (C) or Result (R)
         */
        'Type'?: 'C' | 'R';
        'Condition'?: {
            /**
             * Flag to specify the condition is value only
             */
            'ValueOnly'?: boolean;
            /**
             * The operator of the condition
             */
            'FixedOperator'?: string;
            /**
             * The expression of the condition. It must be set only if the expression language is 1.0
             */
            'Expression'?: string;
            'AST'?: AST;
        } | Record<string, any>;
        'Result'?: {
            /**
             * The ID of the result data object attribute
             */
            'Segment'?: string;
            'Cell'?: ResultCell;
        } | Record<string, any>;
    } | Record<string, any>[];
    /**
     * Collection of rows belonging to this decision table
     */
    'Row'?: {
        /**
         * ID of the row
         */
        'Id'?: string;
        /**
         * Sequence number of the row
         * Format: "float".
         */
        'SequenceNumber'?: number;
    } | Record<string, any>[];
    /**
     * Collection of cells belonging to this decision table
     */
    'Cell'?: {
        /**
         * ID of the column
         */
        'ColumnId'?: string;
        /**
         * ID of the row
         */
        'RowId'?: string;
        /**
         * Expression of the row. It must be set only if the expression language is 1.0
         */
        'Expression'?: string;
        'AST'?: AST;
    } | Record<string, any>[];
} | Record<string, any>;
//# sourceMappingURL=decision-table.d.ts.map