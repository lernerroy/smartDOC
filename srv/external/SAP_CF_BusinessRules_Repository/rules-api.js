"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
/**
 * Representation of the 'RulesApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
exports.RulesApi = {
    /**
     * Retrieves the rules of a project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param queryParameters - Object containing the following keys: Name, $skip, $top.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readRules: function (id, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/rules', {
        pathParameters: { id: id },
        queryParameters: queryParameters
    }); },
    /**
     * Creates a rule for the project with the specified project ID.
     * @param id - The project ID to which the rule should be added. The ID is 32 characters long.
     * @param body - A rule can be of type decision table(DT) or text rule(TR). At a time, only one type of rule can be created based on the 'type' property in the json. If the type is provided as 'DT' in the json, it will refer to the 'DecisionTable' property in the payload and a rule of type 'DecisionTable' will be created. Similarly, if the 'type' is changed to 'TR', it refers to the 'Text' property for creating a rule of type 'TextRule'. This example contains both 'DecisionTable' and 'Text' properties for syntax references .
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    addRule: function (id, body) { return new core_1.OpenApiRequestBuilder('post', '/v1/projects/{id}/rules', {
        pathParameters: { id: id },
        body: body
    }); },
    /**
     * Retrieves the rule of the project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param objectId - ID of the rule. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readRule: function (id, objectId) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/rules/{objectId}', {
        pathParameters: { id: id, objectId: objectId }
    }); },
    /**
     * Updates the rule with the specified rule ID of the project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param objectId - ID of the rule. The ID is 32 characters long.
     * @param body - JSON payload of the rule.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateRule: function (id, objectId, body) { return new core_1.OpenApiRequestBuilder('put', '/v1/projects/{id}/rules/{objectId}', {
        pathParameters: { id: id, objectId: objectId },
        body: body
    }); },
    /**
     * Deletes the rule with the specified rule ID of the project with the specified project ID.
     * @param id - ID of the project from which the rule should be deleted. The ID is 32 characters long.
     * @param objectId - ID of the data object. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteRule: function (id, objectId) { return new core_1.OpenApiRequestBuilder('delete', '/v1/projects/{id}/rules/{objectId}', {
        pathParameters: { id: id, objectId: objectId }
    }); },
    /**
     * Retrieves all the rules given version id with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param version - Version ID of the project. The ID is 18 digits long.
     * @param queryParameters - Object containing the following keys: Name.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readVersionedRules: function (id, version, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/versions/{version}/rules', {
        pathParameters: { id: id, version: version },
        queryParameters: queryParameters
    }); },
    /**
     * Retrieves all the rules of the highest semantic version of a project for a given revision.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param revision - Revision of the project.
     * @param queryParameters - Object containing the following keys: Name.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readRevisionedRules: function (id, revision, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/revisions/{revision}/rules', {
        pathParameters: { id: id, revision: revision },
        queryParameters: queryParameters
    }); }
};
//# sourceMappingURL=rules-api.js.map