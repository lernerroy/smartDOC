import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { ProjectVersionObject, RecoverVersion, CreateVersionInput, CopyProjectInput, CopyProject, MigrateProject } from './schema';
/**
 * Representation of the 'ProjectsApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
export declare const ProjectsApi: {
    /**
     * Retrieves all projects and its versions, including the working set projects.
     * @param queryParameters - Object containing the following keys: Name, Version, $skip, $top.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readProjects: (queryParameters?: {
        Name?: string[] | undefined;
        Version?: string[] | undefined;
        $skip?: number | undefined;
        $top?: number | undefined;
    } | undefined) => OpenApiRequestBuilder<ProjectVersionObject[]>;
    /**
     * Creates a new business rule project.
     * @param body - JSON payload of the project.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    addProject: (body: ProjectVersionObject) => OpenApiRequestBuilder<ProjectVersionObject>;
    /**
     * Retrieves the working set project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readProject: (id: string) => OpenApiRequestBuilder<ProjectVersionObject>;
    /**
     * Updates a working set project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param body - JSON payload of the project.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateProject: (id: string, body: ProjectVersionObject | undefined) => OpenApiRequestBuilder<ProjectVersionObject>;
    /**
     * Deletes a project and all its versions with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteProject: (id: string) => OpenApiRequestBuilder<any>;
    /**
     * Update a working set project and all its entities like data objects, rules, rule services, rulesets with a specified version of the same project. This API overwrites the content of both active and inactive project.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param body - JSON payload of the version in source project.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    recoverVersion: (id: string, body: RecoverVersion) => OpenApiRequestBuilder<any>;
    /**
     * Retrieves the content of all versions of the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readProjectVersions: (id: string) => OpenApiRequestBuilder<ProjectVersionObject[]>;
    /**
     * Creates a version of the active working set project with the specifed project ID. Project should be activated before creating a version. Maximum of 10 versions can be created.
     * @param id - ID of the project for which the version is created. The ID is 32 characters long.
     * @param body - JSON payload of the version.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    createVersion: (id: string, body: CreateVersionInput) => OpenApiRequestBuilder<ProjectVersionObject>;
    /**
     * Retrieves the content of the project for the specified version.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param version - Version ID of the project. The ID is 18 digits long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readVersionedProject: (id: string, version: string) => OpenApiRequestBuilder<ProjectVersionObject>;
    /**
     * Deletes a project version with the specfied version ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param version - Version ID of the project. The ID is 18 digits long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteSpecificProjectVersion: (id: string, version: string) => OpenApiRequestBuilder<any>;
    /**
     * Retrieves the content of the highest semantic version of a project for a given revision.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param revision - Revision of the project.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readRevisionedProject: (id: string, revision: string) => OpenApiRequestBuilder<ProjectVersionObject>;
    /**
     * Returns a copy of the project with all the entities like data objects, rules, rule services and rulesets with new IDs. It also returns the list of mappings of source project's entity id to the new project's entity id.
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    copyProject: (body: CopyProjectInput) => OpenApiRequestBuilder<CopyProject>;
    /**
     * Migrates rule expressions(conditions and result expressions) from expression language 1.0 to 2.0 of the specified version of the specified project. A project and all its entities like data objects, rules, rule services, rulesets must be in active state. It is recommended to activate the project using project activation API(see resource '/v1/projects/{id}/activation') before migrating the workingset project
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    migration: (body: MigrateProject) => OpenApiRequestBuilder<ProjectVersionObject>;
};
//# sourceMappingURL=projects-api.d.ts.map