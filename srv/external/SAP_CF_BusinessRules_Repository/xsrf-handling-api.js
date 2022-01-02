"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XSRFHandlingApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
/**
 * Representation of the 'XSRFHandlingApi'.
 * This API is part of the 'SAP_CF_BusinessRules_Repository' service.
 */
exports.XSRFHandlingApi = {
    /**
     * Requests a new XSRF token. XSRF token can be used for all modifying requests within the same session. <br> This api does not generate xsrf token for OAuth based authentication.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    fetchXsrfToken: function () { return new core_1.OpenApiRequestBuilder('get', '/v1/xsrf-token'); }
};
//# sourceMappingURL=xsrf-handling-api.js.map