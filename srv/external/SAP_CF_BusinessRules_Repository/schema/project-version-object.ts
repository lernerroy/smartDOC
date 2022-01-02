/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { ProjectObject } from './project-object';
    import type { Version } from './version';
    /**
     * Representation of the 'ProjectVersionObject' schema.
     * @example {
     *   "Version": {
     *     "Id": "000000000000000000",
     *     "Description": "Initial",
     *     "Revision": "000000000000000000",
     *     "ParentId": "000000000000000000",
     *     "ChangedOn": "2017-12-19T06:40:17.839Z",
     *     "ChangedBy": "LORIN",
     *     "Project": "439afea5aef1422681f78cce66c9aa90"
     *   }
     * }
     */
    export type ProjectVersionObject = ProjectObject & {
      'Version'?: Version;
    } | Record<string, any>;
