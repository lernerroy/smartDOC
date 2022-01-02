"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleServicesApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
/**
 * Representation of the 'RuleServicesApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
exports.RuleServicesApi = {
    /**
     * Retrieves all the rule services of a project with specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param queryParameters - Object containing the following keys: Name, $skip, $top.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readRuleservices: function (id, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/ruleservices', {
        pathParameters: { id: id },
        queryParameters: queryParameters
    }); },
    /**
     * Creates a rule service for the project with the specified project ID.
     * @param id - The project ID to which the rule service should be added. The ID is 32 characters long.
     * @param body - JSON payload of the rule service.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    addRuleService: function (id, body) { return new core_1.OpenApiRequestBuilder('post', '/v1/projects/{id}/ruleservices', {
        pathParameters: { id: id },
        body: body
    }); },
    /**
     * Retrieves a rule service with the specified rule service ID of the project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param objectId - ID of the rule service. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readRuleService: function (id, objectId) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/ruleservices/{objectId}', {
        pathParameters: { id: id, objectId: objectId }
    }); },
    /**
     * Updates a rule service with the specified rule service ID of the project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param objectId - ID of the rule service. The ID is 32 characters long.
     * @param body - JSON payload of the rule service.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateRuleService: function (id, objectId, body) { return new core_1.OpenApiRequestBuilder('put', '/v1/projects/{id}/ruleservices/{objectId}', {
        pathParameters: { id: id, objectId: objectId },
        body: body
    }); },
    /**
     * Deletes a rule service with the specified rule service ID of the project with the specified project ID.
     * @param id - ID of the project from which the rule service should be deleted. The ID is 32 characters long.
     * @param objectId - ID of the data object. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteRuleService: function (id, objectId) { return new core_1.OpenApiRequestBuilder('delete', '/v1/projects/{id}/ruleservices/{objectId}', {
        pathParameters: { id: id, objectId: objectId }
    }); },
    /**
     * Retrieves all the rule services given version id with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param version - Version ID of the project. The ID is 18 digits long.
     * @param queryParameters - Object containing the following keys: Name.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readVersionedRuleServices: function (id, version, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/versions/{version}/ruleservices', {
        pathParameters: { id: id, version: version },
        queryParameters: queryParameters
    }); },
    /**
     * Retrieves all the rule services of the highest semantic version of a project for a given revision.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param revision - Revision of the project.
     * @param queryParameters - Object containing the following keys: Name.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readRevisionedRuleServices: function (id, revision, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/revisions/{revision}/ruleservices', {
        pathParameters: { id: id, revision: revision },
        queryParameters: queryParameters
    }); }
};
//# sourceMappingURL=rule-services-api.js.map