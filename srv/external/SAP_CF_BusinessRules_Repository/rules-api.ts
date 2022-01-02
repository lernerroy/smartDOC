/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { RuleObject } from './schema';
/**
 * Representation of the 'RulesApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
export const RulesApi = {
  /**
   * Retrieves the rules of a project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param queryParameters - Object containing the following keys: Name, $skip, $top.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readRules: (id: string, queryParameters?: {'Name'?: string[],
  '$skip'?: number,
  '$top'?: number}) => new OpenApiRequestBuilder<RuleObject[]>(
    'get',
    '/v1/projects/{id}/rules',
    {
          pathParameters: { id },
          queryParameters
        }
  ),
  /**
   * Creates a rule for the project with the specified project ID.
   * @param id - The project ID to which the rule should be added. The ID is 32 characters long.
   * @param body - A rule can be of type decision table(DT) or text rule(TR). At a time, only one type of rule can be created based on the 'type' property in the json. If the type is provided as 'DT' in the json, it will refer to the 'DecisionTable' property in the payload and a rule of type 'DecisionTable' will be created. Similarly, if the 'type' is changed to 'TR', it refers to the 'Text' property for creating a rule of type 'TextRule'. This example contains both 'DecisionTable' and 'Text' properties for syntax references .
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  addRule: (id: string, body: RuleObject) => new OpenApiRequestBuilder<RuleObject>(
    'post',
    '/v1/projects/{id}/rules',
    {
          pathParameters: { id },
          body
        }
  ),
  /**
   * Retrieves the rule of the project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param objectId - ID of the rule. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readRule: (id: string, objectId: string) => new OpenApiRequestBuilder<RuleObject>(
    'get',
    '/v1/projects/{id}/rules/{objectId}',
    {
          pathParameters: { id, objectId }
        }
  ),
  /**
   * Updates the rule with the specified rule ID of the project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param objectId - ID of the rule. The ID is 32 characters long.
   * @param body - JSON payload of the rule.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateRule: (id: string, objectId: string, body: RuleObject | undefined) => new OpenApiRequestBuilder<RuleObject>(
    'put',
    '/v1/projects/{id}/rules/{objectId}',
    {
          pathParameters: { id, objectId },
          body
        }
  ),
  /**
   * Deletes the rule with the specified rule ID of the project with the specified project ID.
   * @param id - ID of the project from which the rule should be deleted. The ID is 32 characters long.
   * @param objectId - ID of the data object. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteRule: (id: string, objectId: string) => new OpenApiRequestBuilder<any>(
    'delete',
    '/v1/projects/{id}/rules/{objectId}',
    {
          pathParameters: { id, objectId }
        }
  ),
  /**
   * Retrieves all the rules given version id with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param version - Version ID of the project. The ID is 18 digits long.
   * @param queryParameters - Object containing the following keys: Name.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readVersionedRules: (id: string, version: string, queryParameters?: {'Name'?: string[]}) => new OpenApiRequestBuilder<RuleObject>(
    'get',
    '/v1/projects/{id}/versions/{version}/rules',
    {
          pathParameters: { id, version },
          queryParameters
        }
  ),
  /**
   * Retrieves all the rules of the highest semantic version of a project for a given revision.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param revision - Revision of the project.
   * @param queryParameters - Object containing the following keys: Name.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readRevisionedRules: (id: string, revision: string, queryParameters?: {'Name'?: string[]}) => new OpenApiRequestBuilder<RuleObject>(
    'get',
    '/v1/projects/{id}/revisions/{revision}/rules',
    {
          pathParameters: { id, revision },
          queryParameters
        }
  )
};
