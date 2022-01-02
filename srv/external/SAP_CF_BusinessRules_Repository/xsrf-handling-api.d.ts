import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
/**
 * Representation of the 'XSRFHandlingApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
export declare const XSRFHandlingApi: {
    /**
     * Requests a new XSRF token. XSRF token can be used for all modifying requests within the same session. <br> This api does not generate xsrf token for OAuth based authentication.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    fetchXsrfToken: () => OpenApiRequestBuilder<any>;
};
//# sourceMappingURL=xsrf-handling-api.d.ts.map