"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesetsApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
/**
 * Representation of the 'RulesetsApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
exports.RulesetsApi = {
    /**
     * Retrieves all the rulesets of the project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param queryParameters - Object containing the following keys: Name, $skip, $top.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readRulesets: function (id, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/rulesets', {
        pathParameters: { id: id },
        queryParameters: queryParameters
    }); },
    /**
     * Creates a ruleset for the project with the specified project ID.
     * @param id - ID of the project to which the ruleset should be added. The ID is 32 characters long.
     * @param body - JSON payload of the ruleset.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    addRuleSet: function (id, body) { return new core_1.OpenApiRequestBuilder('post', '/v1/projects/{id}/rulesets', {
        pathParameters: { id: id },
        body: body
    }); },
    /**
     * Retrieves a ruleset with the specified rule set ID  of the project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param objectId - ID of the ruleset. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readRuleSet: function (id, objectId) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/rulesets/{objectId}', {
        pathParameters: { id: id, objectId: objectId }
    }); },
    /**
     * Updates a ruleset with the specified rule set ID of the project with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param objectId - ID of the ruleset. The ID is 32 characters long.
     * @param body - JSON payload of the ruleset.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateRuleset: function (id, objectId, body) { return new core_1.OpenApiRequestBuilder('put', '/v1/projects/{id}/rulesets/{objectId}', {
        pathParameters: { id: id, objectId: objectId },
        body: body
    }); },
    /**
     * Deletes a ruleset with the specified rule set ID of the project with the specified project ID.
     * @param id - ID of the project from which the ruleset should be deleted. The ID is 32 characters long.
     * @param objectId - ID of the ruleset. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteRuleSet: function (id, objectId) { return new core_1.OpenApiRequestBuilder('delete', '/v1/projects/{id}/rulesets/{objectId}', {
        pathParameters: { id: id, objectId: objectId }
    }); },
    /**
     * Retrieves all the rulesets given version id with the specified project ID.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param version - Version ID of the project. The ID is 18 digits long.
     * @param queryParameters - Object containing the following keys: Name.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readVersionedRuleset: function (id, version, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/versions/{version}/rulesets', {
        pathParameters: { id: id, version: version },
        queryParameters: queryParameters
    }); },
    /**
     * Retrieves all the rulesets of the highest semantic version of a project for a given revision.
     * @param id - ID of the project. The ID is 32 characters long.
     * @param revision - Revision of the project.
     * @param queryParameters - Object containing the following keys: Name.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    readRevisionedRuleset: function (id, revision, queryParameters) { return new core_1.OpenApiRequestBuilder('get', '/v1/projects/{id}/revisions/{revision}/rulesets', {
        pathParameters: { id: id, revision: revision },
        queryParameters: queryParameters
    }); }
};
//# sourceMappingURL=rulesets-api.js.map