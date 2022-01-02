import type { Version } from './version';
/**
 * Representation of the 'VersionObject' schema.
 * @example {
 *   "Id": "000000000000000000",
 *   "Description": "Initial",
 *   "Revision": "000000000000000000",
 *   "ParentId": "000000000000000000",
 *   "ChangedOn": "2017-12-19T06:40:17.839Z",
 *   "ChangedBy": "LORIN",
 *   "Project": "439afea5aef1422681f78cce66c9aa90"
 * }
 */
export declare type VersionObject = Version & {
    /**
     * Id of the project
     */
    'Project'?: string;
} | Record<string, any>;
//# sourceMappingURL=version-object.d.ts.map