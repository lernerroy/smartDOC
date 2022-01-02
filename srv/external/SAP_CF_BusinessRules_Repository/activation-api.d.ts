import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
/**
 * Representation of the 'ActivationApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
export declare const ActivationApi: {
    /**
     * Activates a project with the specified project ID and all its entities such as data objects, rules, rulesets and rule services.
     * @param id - ID of the project whose content should be activated. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    activateProject: (id: string) => OpenApiRequestBuilder<any>;
    /**
     * Activates a rule service with the specified rule set ID and all its entities such as data objects, rules and rulesets within the project.
     * @param id - ID of the rule service whose content should be activated. The ID is 32 characters long.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    activateRuleService: (id: string) => OpenApiRequestBuilder<any>;
};
//# sourceMappingURL=activation-api.d.ts.map