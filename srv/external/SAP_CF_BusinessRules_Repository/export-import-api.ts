/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { Project, ProjectVersionObject, DecisionTableRule } from './schema';
/**
 * Representation of the 'ExportImportApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
export const ExportImportApi = {
  /**
   * Imports a project and all its entities like data objects, rules, rule services, rulesets to the design repository. An existing project is updated or a project is created. A project can have maximum 10 versions excluding working set.
   * @param body - JSON payload of the project with all the relevant entities like data objects, rules, rule services, and rulesets.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  importProject: (body: Project) => new OpenApiRequestBuilder<ProjectVersionObject>(
    'post',
    '/v1/import/projects',
    {
          body
        }
  ),
  /**
   * Export a project and all its entities like data objects, rules, rule services, rulesets from the design repository.
   * @param id - Json payload of the project with all the relevant entities like data objects, rules, rule services, rulesets.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  exportProject: (id: string) => new OpenApiRequestBuilder<Project>(
    'get',
    '/v1/export/projects/{id}',
    {
          pathParameters: { id }
        }
  ),
  /**
   * Exports the specified version of the specified project along with all its entities like data objects, rules, rule services and rulesets from the design time repository.
   * @param id - ID of the project. ID is 32 characters long.
   * @param version - Version ID of the project which is to be exported. ID is 18 digits long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  exportProjectWithVersion: (id: string, version: string) => new OpenApiRequestBuilder<Project>(
    'get',
    '/v1/export/projects/{id}/versions/{version}',
    {
          pathParameters: { id, version }
        }
  ),
  /**
   * Exports the highest semantic version of a project for a given revision from the design-time repository, along with all its entities like data objects, rules, rule services, and rulesets.
   * @param id - ID of the project. ID is 32 characters long.
   * @param revision - Revision of the project which is to be exported.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  exportProjectWithRevision: (id: string, revision: string) => new OpenApiRequestBuilder<Project>(
    'get',
    '/v1/export/projects/{id}/revisions/{revision}',
    {
          pathParameters: { id, revision }
        }
  ),
  /**
   * Imports rule expressions(conditions and result expressions) modeled in Excel into decision table rule. The file should be of type Excel Workbook(.xlsx).<br> It is recommended to use the export API to get the excel file for modeling the rule expressions.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  importRule: (body: any) => new OpenApiRequestBuilder<DecisionTableRule>(
    'post',
    '/v1/import/rules',
    {
          body
        }
  ),
  /**
   * Exports decision table rule expressions(conditions and result expressions) as excel. The file is saved as an Excel Workbook(.xlsx).
   * @param id - The Project ID of the rule which is to be exported. The ID is 32 characters long.
   * @param objectId - The ID of the rule which is to be exported. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  exportRule: (id: string, objectId: string) => new OpenApiRequestBuilder<any>(
    'get',
    '/v1/export/projects/{id}/rules/{objectId}',
    {
          pathParameters: { id, objectId }
        }
  )
};
