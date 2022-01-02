"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedSystemsApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
/**
 * Representation of the 'ManagedSystemsApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
exports.ManagedSystemsApi = {
    /**
     * Retrieves all the managed system. A system represents a remote system where a rule service can be deployed. It contains information about target system in the form of destination and context path.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getManagedSystems: function () { return new core_1.OpenApiRequestBuilder('get', '/v1/managed-systems'); },
    /**
     * Creates a managed system. A system represents a remote system where a rule service can be deployed. It contains information about target system in the form of destination and context path.
     * @param body - JSON payload of the system.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    addManagedSystem: function (body) { return new core_1.OpenApiRequestBuilder('post', '/v1/managed-systems', {
        body: body
    }); },
    /**
     * Retrieves all the meta data of a managed system with the specified managed system name.
     * @param managedsystemName - name of the system.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getManagedSystem: function (managedsystemName) { return new core_1.OpenApiRequestBuilder('get', '/v1/managed-systems/{managedsystemName}', {
        pathParameters: { managedsystemName: managedsystemName }
    }); },
    /**
     * Updates the metadata of the managed system with the specified managed system name.
     * @param managedsystemName - name of the system.
     * @param body - JSON payload of the system.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateManagedSystem: function (managedsystemName, body) { return new core_1.OpenApiRequestBuilder('put', '/v1/managed-systems/{managedsystemName}', {
        pathParameters: { managedsystemName: managedsystemName },
        body: body
    }); },
    /**
     * Deletes a managed system with the specified managed system name.
     * @param managedsystemName - name of the system that should be deleted.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteManagedSystem: function (managedsystemName) { return new core_1.OpenApiRequestBuilder('delete', '/v1/managed-systems/{managedsystemName}', {
        pathParameters: { managedsystemName: managedsystemName }
    }); }
};
//# sourceMappingURL=managed-systems-api.js.map