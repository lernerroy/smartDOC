/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { DataObjectObject } from './schema';
/**
 * Representation of the 'DataObjectsApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
export const DataObjectsApi = {
  /**
   * Retrieves all the data objects of the project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param queryParameters - Object containing the following keys: Name, $skip, $top.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readDataObjects: (id: string, queryParameters?: {'Name'?: string[],
  '$skip'?: number,
  '$top'?: number}) => new OpenApiRequestBuilder<DataObjectObject[]>(
    'get',
    '/v1/projects/{id}/dataobjects',
    {
          pathParameters: { id },
          queryParameters
        }
  ),
  /**
   * Creates a data object for the project with the specified project ID.
   * @param id - ID of the project to which the data object should be added. The ID is 32 characters long.
   * @param body - JSON payload of the data object.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  addDataObject: (id: string, body: DataObjectObject) => new OpenApiRequestBuilder<DataObjectObject>(
    'post',
    '/v1/projects/{id}/dataobjects',
    {
          pathParameters: { id },
          body
        }
  ),
  /**
   * Retrieves the data object with specified data object ID of the project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param objectId - ID of the data object. The ID is 32 characters long.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readDataObject: (id: string, objectId: string) => new OpenApiRequestBuilder<DataObjectObject>(
    'get',
    '/v1/projects/{id}/dataobjects/{objectId}',
    {
          pathParameters: { id, objectId }
        }
  ),
  /**
   * Updates the data object with the specified data object ID of the project with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param objectId - ID of the data object. The ID is 32 characters long.
   * @param body - JSON payload of the data object.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateDataObject: (id: string, objectId: string, body: DataObjectObject | undefined) => new OpenApiRequestBuilder<DataObjectObject>(
    'put',
    '/v1/projects/{id}/dataobjects/{objectId}',
    {
          pathParameters: { id, objectId },
          body
        }
  ),
  /**
   * Deletes the data object with the specified data object ID of the project with the specified project ID.
   * @param id - ID of the project from which the data object should be deleted. The ID is 32 characters long.
   * @param objectId - Id of the data object.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteDataObject: (id: string, objectId: string) => new OpenApiRequestBuilder<any>(
    'delete',
    '/v1/projects/{id}/dataobjects/{objectId}',
    {
          pathParameters: { id, objectId }
        }
  ),
  /**
   * Retrieves all the data objects given version id with the specified project ID.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param version - Version ID of the project. The ID is 18 digits long.
   * @param queryParameters - Object containing the following keys: Name.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readVersionedDataObjects: (id: string, version: string, queryParameters?: {'Name'?: string[]}) => new OpenApiRequestBuilder<DataObjectObject>(
    'get',
    '/v1/projects/{id}/versions/{version}/dataobjects',
    {
          pathParameters: { id, version },
          queryParameters
        }
  ),
  /**
   * Retrieves all the data objects of the highest semantic version of a project for a given revision.
   * @param id - ID of the project. The ID is 32 characters long.
   * @param revision - Revision of the project.
   * @param queryParameters - Object containing the following keys: Name.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readRevisionedDataObjects: (id: string, revision: string, queryParameters?: {'Name'?: string[]}) => new OpenApiRequestBuilder<DataObjectObject>(
    'get',
    '/v1/projects/{id}/revisions/{revision}/dataobjects',
    {
          pathParameters: { id, revision },
          queryParameters
        }
  )
};
