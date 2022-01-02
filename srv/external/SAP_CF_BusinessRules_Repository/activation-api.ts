/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
/**
 * Representation of the 'ActivationApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
export const ActivationApi = {
  /**
   * Activates a project with the specified project ID and all its entities such as data objects, rules, rulesets and rule services.
   * @param id - ID of the project whose content should be activated. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  activateProject: (id: string) => new OpenApiRequestBuilder<any>(
    'put',
    '/v1/projects/{id}/activation',
    {
          pathParameters: { id }
        }
  ),
  /**
   * Activates a rule service with the specified rule set ID and all its entities such as data objects, rules and rulesets within the project.
   * @param id - ID of the rule service whose content should be activated. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  activateRuleService: (id: string) => new OpenApiRequestBuilder<any>(
    'put',
    '/v1/ruleservices/{id}/activation',
    {
          pathParameters: { id }
        }
  )
};
