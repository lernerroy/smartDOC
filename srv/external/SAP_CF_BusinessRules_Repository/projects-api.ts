/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { ProjectVersionObject, RecoverVersion, CreateVersionInput, CopyProjectInput, CopyProject, MigrateProject } from './schema';
/**
 * Representation of the 'ProjectsApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
export const ProjectsApi = {
  /**
   * Retrieves all projects and its versions, including the working set projects.
   * @param queryParameters - Object containing the following keys: Name, Version, $skip, $top.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readProjects: (queryParameters?: {'Name'?: string[],
  'Version'?: string[],
  '$skip'?: number,
  '$top'?: number}) => new OpenApiRequestBuilder<ProjectVersionObject[]>(
    'get',
    '/v1/projects',
    {
          queryParameters
        }
  ),
  /**
   * Creates a new business rule project.
   * @param body - JSON payload of the project.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  addProject: (body: ProjectVersionObject) => new OpenApiRequestBuilder<ProjectVersionObject>(
    'post',
    '/v1/projects',
    {
          body
        }
  ),
  /**
   * Retrieves the working set project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readProject: (id: string) => new OpenApiRequestBuilder<ProjectVersionObject>(
    'get',
    '/v1/projects/{id}',
    {
          pathParameters: { id }
        }
  ),
  /**
   * Updates a working set project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param body - JSON payload of the project.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateProject: (id: string, body: ProjectVersionObject | undefined) => new OpenApiRequestBuilder<ProjectVersionObject>(
    'put',
    '/v1/projects/{id}',
    {
          pathParameters: { id },
          body
        }
  ),
  /**
   * Deletes a project and all its versions with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteProject: (id: string) => new OpenApiRequestBuilder<any>(
    'delete',
    '/v1/projects/{id}',
    {
          pathParameters: { id }
        }
  ),
  /**
   * Update a working set project and all its entities like data objects, rules, rule services, rulesets with a specified version of the same project. This API overwrites the content of both active and inactive project.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param body - JSON payload of the version in source project.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  recoverVersion: (id: string, body: RecoverVersion) => new OpenApiRequestBuilder<any>(
    'put',
    '/v1/projects/{id}/workingset',
    {
          pathParameters: { id },
          body
        }
  ),
  /**
   * Retrieves the content of all versions of the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readProjectVersions: (id: string) => new OpenApiRequestBuilder<ProjectVersionObject[]>(
    'get',
    '/v1/projects/{id}/versions',
    {
          pathParameters: { id }
        }
  ),
  /**
   * Creates a version of the active working set project with the specifed project ID. Project should be activated before creating a version. Maximum of 10 versions can be created.
   * @param id - ID of the project for which the version is created. The ID is 32 characters long.
   * @param body - JSON payload of the version.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createVersion: (id: string, body: CreateVersionInput) => new OpenApiRequestBuilder<ProjectVersionObject>(
    'post',
    '/v1/projects/{id}/versions',
    {
          pathParameters: { id },
          body
        }
  ),
  /**
   * Retrieves the content of the project for the specified version.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param version - Version ID of the project. The ID is 18 digits long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readVersionedProject: (id: string, version: string) => new OpenApiRequestBuilder<ProjectVersionObject>(
    'get',
    '/v1/projects/{id}/versions/{version}',
    {
          pathParameters: { id, version }
        }
  ),
  /**
   * Deletes a project version with the specfied version ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param version - Version ID of the project. The ID is 18 digits long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteSpecificProjectVersion: (id: string, version: string) => new OpenApiRequestBuilder<any>(
    'delete',
    '/v1/projects/{id}/versions/{version}',
    {
          pathParameters: { id, version }
        }
  ),
  /**
   * Retrieves the content of the highest semantic version of a project for a given revision.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param revision - Revision of the project.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readRevisionedProject: (id: string, revision: string) => new OpenApiRequestBuilder<ProjectVersionObject>(
    'get',
    '/v1/projects/{id}/revisions/{revision}',
    {
          pathParameters: { id, revision }
        }
  ),
  /**
   * Returns a copy of the project with all the entities like data objects, rules, rule services and rulesets with new IDs. It also returns the list of mappings of source project's entity id to the new project's entity id.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  copyProject: (body: CopyProjectInput) => new OpenApiRequestBuilder<CopyProject>(
    'post',
    '/v1/copy/projects',
    {
          body
        }
  ),
  /**
   * Migrates rule expressions(conditions and result expressions) from expression language 1.0 to 2.0 of the specified version of the specified project. A project and all its entities like data objects, rules, rule services, rulesets must be in active state. It is recommended to activate the project using project activation API(see resource '/v1/projects/{id}/activation') before migrating the workingset project
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  migration: (body: MigrateProject) => new OpenApiRequestBuilder<ProjectVersionObject>(
    'post',
    '/v1/migrations',
    {
          body
        }
  )
};
