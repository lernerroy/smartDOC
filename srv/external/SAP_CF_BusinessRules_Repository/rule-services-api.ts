/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { RuleService } from './schema';
/**
 * Representation of the 'RuleServicesApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
export const RuleServicesApi = {
  /**
   * Retrieves all the rule services of a project with specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param queryParameters - Object containing the following keys: Name, $skip, $top.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readRuleservices: (id: string, queryParameters?: {'Name'?: string[],
  '$skip'?: number,
  '$top'?: number}) => new OpenApiRequestBuilder<RuleService[]>(
    'get',
    '/v1/projects/{id}/ruleservices',
    {
          pathParameters: { id },
          queryParameters
        }
  ),
  /**
   * Creates a rule service for the project with the specified project ID.
   * @param id - The project ID to which the rule service should be added. The ID is 32 characters long.
   * @param body - JSON payload of the rule service.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  addRuleService: (id: string, body: RuleService) => new OpenApiRequestBuilder<RuleService>(
    'post',
    '/v1/projects/{id}/ruleservices',
    {
          pathParameters: { id },
          body
        }
  ),
  /**
   * Retrieves a rule service with the specified rule service ID of the project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param objectId - ID of the rule service. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readRuleService: (id: string, objectId: string) => new OpenApiRequestBuilder<RuleService>(
    'get',
    '/v1/projects/{id}/ruleservices/{objectId}',
    {
          pathParameters: { id, objectId }
        }
  ),
  /**
   * Updates a rule service with the specified rule service ID of the project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param objectId - ID of the rule service. The ID is 32 characters long.
   * @param body - JSON payload of the rule service.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateRuleService: (id: string, objectId: string, body: RuleService | undefined) => new OpenApiRequestBuilder<RuleService>(
    'put',
    '/v1/projects/{id}/ruleservices/{objectId}',
    {
          pathParameters: { id, objectId },
          body
        }
  ),
  /**
   * Deletes a rule service with the specified rule service ID of the project with the specified project ID.
   * @param id - ID of the project from which the rule service should be deleted. The ID is 32 characters long.
   * @param objectId - ID of the data object. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteRuleService: (id: string, objectId: string) => new OpenApiRequestBuilder<any>(
    'delete',
    '/v1/projects/{id}/ruleservices/{objectId}',
    {
          pathParameters: { id, objectId }
        }
  ),
  /**
   * Retrieves all the rule services given version id with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param version - Version ID of the project. The ID is 18 digits long.
   * @param queryParameters - Object containing the following keys: Name.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readVersionedRuleServices: (id: string, version: string, queryParameters?: {'Name'?: string[]}) => new OpenApiRequestBuilder<RuleService>(
    'get',
    '/v1/projects/{id}/versions/{version}/ruleservices',
    {
          pathParameters: { id, version },
          queryParameters
        }
  ),
  /**
   * Retrieves all the rule services of the highest semantic version of a project for a given revision.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param revision - Revision of the project.
   * @param queryParameters - Object containing the following keys: Name.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readRevisionedRuleServices: (id: string, revision: string, queryParameters?: {'Name'?: string[]}) => new OpenApiRequestBuilder<RuleService>(
    'get',
    '/v1/projects/{id}/revisions/{revision}/ruleservices',
    {
          pathParameters: { id, revision },
          queryParameters
        }
  )
};
