import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import type { ManagedSystemResponseObject, ManagedSystemObject } from './schema';
/**
 * Representation of the 'ManagedSystemsApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
export declare const ManagedSystemsApi: {
    /**
     * Retrieves all the managed system. A system represents a remote system where a rule service can be deployed. It contains information about target system in the form of destination and context path.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getManagedSystems: () => OpenApiRequestBuilder<ManagedSystemResponseObject[]>;
    /**
     * Creates a managed system. A system represents a remote system where a rule service can be deployed. It contains information about target system in the form of destination and context path.
     * @param body - JSON payload of the system.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    addManagedSystem: (body: ManagedSystemObject) => OpenApiRequestBuilder<ManagedSystemResponseObject>;
    /**
     * Retrieves all the meta data of a managed system with the specified managed system name.
     * @param managedsystemName - name of the system.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getManagedSystem: (managedsystemName: string) => OpenApiRequestBuilder<ManagedSystemResponseObject>;
    /**
     * Updates the metadata of the managed system with the specified managed system name.
     * @param managedsystemName - name of the system.
     * @param body - JSON payload of the system.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    updateManagedSystem: (managedsystemName: string, body: ManagedSystemObject | undefined) => OpenApiRequestBuilder<ManagedSystemObject>;
    /**
     * Deletes a managed system with the specified managed system name.
     * @param managedsystemName - name of the system that should be deleted.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    deleteManagedSystem: (managedsystemName: string) => OpenApiRequestBuilder<any>;
};
//# sourceMappingURL=managed-systems-api.d.ts.map