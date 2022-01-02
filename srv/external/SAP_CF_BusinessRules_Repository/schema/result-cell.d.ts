import type { AST } from './ast';
/**
 * Representation of the 'ResultCell' schema.
 */
export declare type ResultCell = {
    /**
     * Mode is used if the given segment is allowed to be updated in any of the branches. Can have a value of Hidden(H) and Editable(E).
     */
    'Mode'?: 'H' | 'E';
    'FixedExpression'?: string;
    'AST'?: AST;
} | Record<string, any>;
//# sourceMappingURL=result-cell.d.ts.map