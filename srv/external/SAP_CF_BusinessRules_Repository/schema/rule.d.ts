import type { AdminData } from './admin-data';
/**
 * Representation of the 'Rule' schema.
 */
export declare type Rule = AdminData & {
    /**
     * It represents 1.0 or 2.0 expression language based Rule. It defaults to the expression language of the project
     */
    'ExpressionLanguageVersion'?: '1.0.0' | '2.0.0';
    /**
     * Type of the rule. Rules can be of two types namely Decision Table(DT) and Text Rule(TR).
     */
    'Type'?: 'DT' | 'TR';
    'Result'?: {
        /**
         * ID of the result data object
         */
        'ObjectId'?: string;
    } | Record<string, any>;
} | Record<string, any>;
//# sourceMappingURL=rule.d.ts.map