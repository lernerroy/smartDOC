/**
 * Representation of the 'MigrateProject' schema.
 * @example {
 *   "Project": "439afea5aef1422681f78cce66c9aa90",
 *   "Version": "000001000000000001"
 * }
 */
export declare type MigrateProject = {
    /**
     * ID of the project to be migrated(UUID)
     * Pattern: "^[0-9a-fA-F]{32}$".
     */
    'Project'?: string;
    /**
     * version of the project. Default value is 000000000000000000
     * Max Length: 18.
     * Pattern: "[0-9]".
     */
    'Version'?: string;
} | Record<string, any>;
//# sourceMappingURL=migrate-project.d.ts.map