"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataObjectsApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
/**
 * Representation of the 'DataObjectsApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
exports.DataObjectsApi = {
    /**
     * Retrieves all the data objects of the project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param queryParameters - Object containing the following keys: Name, $skip, $top.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readDataObjects: function (id, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/dataobjects', {
        pathParameters: { id: id },
        queryParameters: queryParameters
    }); },
    /**
     * Creates a data object for the project with the specified project ID.
     * @param id - ID of the project to which the data object should be added. The ID is 32 characters long.
     * @param body - JSON payload of the data object.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    addDataObject: function (id, body) { return new core_1.OpenApiRequestBuilder('post', '/v1/projects/{id}/dataobjects', {
        pathParameters: { id: id },
        body: body
    }); },
    /**
     * Retrieves the data object with specified data object ID of the project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param objectId - ID of the data object. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readDataObject: function (id, objectId) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/dataobjects/{objectId}', {
        pathParameters: { id: id, objectId: objectId }
    }); },
    /**
     * Updates the data object with the specified data object ID of the project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param objectId - ID of the data object. The ID is 32 characters long.
     * @param body - JSON payload of the data object.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateDataObject: function (id, objectId, body) { return new core_1.OpenApiRequestBuilder('put', '/v1/projects/{id}/dataobjects/{objectId}', {
        pathParameters: { id: id, objectId: objectId },
        body: body
    }); },
    /**
     * Deletes the data object with the specified data object ID of the project with the specified project ID.
     * @param id - ID of the project from which the data object should be deleted. The ID is 32 characters long.
     * @param objectId - Id of the data object.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteDataObject: function (id, objectId) { return new core_1.OpenApiRequestBuilder('delete', '/v1/projects/{id}/dataobjects/{objectId}', {
        pathParameters: { id: id, objectId: objectId }
    }); },
    /**
     * Retrieves all the data objects given version id with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param version - Version ID of the project. The ID is 18 digits long.
     * @param queryParameters - Object containing the following keys: Name.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readVersionedDataObjects: function (id, version, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/versions/{version}/dataobjects', {
        pathParameters: { id: id, version: version },
        queryParameters: queryParameters
    }); },
    /**
     * Retrieves all the data objects of the highest semantic version of a project for a given revision.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param revision - Revision of the project.
     * @param queryParameters - Object containing the following keys: Name.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readRevisionedDataObjects: function (id, revision, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/revisions/{revision}/dataobjects', {
        pathParameters: { id: id, revision: revision },
        queryParameters: queryParameters
    }); }
};
//# sourceMappingURL=data-objects-api.js.map