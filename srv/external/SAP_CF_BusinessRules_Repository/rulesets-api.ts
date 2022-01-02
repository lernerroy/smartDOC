/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { Ruleset } from './schema';
/**
 * Representation of the 'RulesetsApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
export const RulesetsApi = {
  /**
   * Retrieves all the rulesets of the project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param queryParameters - Object containing the following keys: Name, $skip, $top.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readRulesets: (id: string, queryParameters?: {'Name'?: string[],
  '$skip'?: number,
  '$top'?: number}) => new OpenApiRequestBuilder<Ruleset[]>(
    'get',
    '/v1/projects/{id}/rulesets',
    {
          pathParameters: { id },
          queryParameters
        }
  ),
  /**
   * Creates a ruleset for the project with the specified project ID.
   * @param id - ID of the project to which the ruleset should be added. The ID is 32 characters long.
   * @param body - JSON payload of the ruleset.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  addRuleSet: (id: string, body: Ruleset) => new OpenApiRequestBuilder<Ruleset>(
    'post',
    '/v1/projects/{id}/rulesets',
    {
          pathParameters: { id },
          body
        }
  ),
  /**
   * Retrieves a ruleset with the specified rule set ID  of the project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param objectId - ID of the ruleset. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readRuleSet: (id: string, objectId: string) => new OpenApiRequestBuilder<Ruleset>(
    'get',
    '/v1/projects/{id}/rulesets/{objectId}',
    {
          pathParameters: { id, objectId }
        }
  ),
  /**
   * Updates a ruleset with the specified rule set ID of the project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param objectId - ID of the ruleset. The ID is 32 characters long.
   * @param body - JSON payload of the ruleset.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateRuleset: (id: string, objectId: string, body: Ruleset | undefined) => new OpenApiRequestBuilder<Ruleset>(
    'put',
    '/v1/projects/{id}/rulesets/{objectId}',
    {
          pathParameters: { id, objectId },
          body
        }
  ),
  /**
   * Deletes a ruleset with the specified rule set ID of the project with the specified project ID.
   * @param id - ID of the project from which the ruleset should be deleted. The ID is 32 characters long.
   * @param objectId - ID of the ruleset. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteRuleSet: (id: string, objectId: string) => new OpenApiRequestBuilder<any>(
    'delete',
    '/v1/projects/{id}/rulesets/{objectId}',
    {
          pathParameters: { id, objectId }
        }
  ),
  /**
   * Retrieves all the rulesets given version id with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param version - Version ID of the project. The ID is 18 digits long.
   * @param queryParameters - Object containing the following keys: Name.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readVersionedRuleset: (id: string, version: string, queryParameters?: {'Name'?: string[]}) => new OpenApiRequestBuilder<Ruleset>(
    'get',
    '/v1/projects/{id}/versions/{version}/rulesets',
    {
          pathParameters: { id, version },
          queryParameters
        }
  ),
  /**
   * Retrieves all the rulesets of the highest semantic version of a project for a given revision.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param revision - Revision of the project.
   * @param queryParameters - Object containing the following keys: Name.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readRevisionedRuleset: (id: string, revision: string, queryParameters?: {'Name'?: string[]}) => new OpenApiRequestBuilder<Ruleset>(
    'get',
    '/v1/projects/{id}/revisions/{revision}/rulesets',
    {
          pathParameters: { id, revision },
          queryParameters
        }
  )
};
