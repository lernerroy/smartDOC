"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivationApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
/**
 * Representation of the 'ActivationApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
exports.ActivationApi = {
    /**
     * Activates a project with the specified project ID and all its entities such as data objects, rules, rulesets and rule services.
     * @param id - ID of the project whose content should be activated. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    activateProject: function (id) { return new core_1.OpenApiRequestBuilder('put', '/v1/projects/{id}/activation', {
        pathParameters: { id: id }
    }); },
    /**
     * Activates a rule service with the specified rule set ID and all its entities such as data objects, rules and rulesets within the project.
     * @param id - ID of the rule service whose content should be activated. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    activateRuleService: function (id) { return new core_1.OpenApiRequestBuilder('put', '/v1/ruleservices/{id}/activation', {
        pathParameters: { id: id }
    }); }
};
//# sourceMappingURL=activation-api.js.map