/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { ManagedSystemResponseObject, ManagedSystemObject } from './schema';
/**
 * Representation of the 'ManagedSystemsApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
export const ManagedSystemsApi = {
  /**
   * Retrieves all the managed system. A system represents a remote system where a rule service can be deployed. It contains information about target system in the form of destination and context path.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getManagedSystems: () => new OpenApiRequestBuilder<ManagedSystemResponseObject[]>(
    'get',
    '/v1/managed-systems'
  ),
  /**
   * Creates a managed system. A system represents a remote system where a rule service can be deployed. It contains information about target system in the form of destination and context path.
   * @param body - JSON payload of the system.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  addManagedSystem: (body: ManagedSystemObject) => new OpenApiRequestBuilder<ManagedSystemResponseObject>(
    'post',
    '/v1/managed-systems',
    {
          body
        }
  ),
  /**
   * Retrieves all the meta data of a managed system with the specified managed system name.
   * @param managedsystemName - name of the system.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getManagedSystem: (managedsystemName: string) => new OpenApiRequestBuilder<ManagedSystemResponseObject>(
    'get',
    '/v1/managed-systems/{managedsystemName}',
    {
          pathParameters: { managedsystemName }
        }
  ),
  /**
   * Updates the metadata of the managed system with the specified managed system name.
   * @param managedsystemName - name of the system.
   * @param body - JSON payload of the system.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateManagedSystem: (managedsystemName: string, body: ManagedSystemObject | undefined) => new OpenApiRequestBuilder<ManagedSystemObject>(
    'put',
    '/v1/managed-systems/{managedsystemName}',
    {
          pathParameters: { managedsystemName },
          body
        }
  ),
  /**
   * Deletes a managed system with the specified managed system name.
   * @param managedsystemName - name of the system that should be deleted.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteManagedSystem: (managedsystemName: string) => new OpenApiRequestBuilder<any>(
    'delete',
    '/v1/managed-systems/{managedsystemName}',
    {
          pathParameters: { managedsystemName }
        }
  )
};
