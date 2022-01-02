/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
    import type { VersionObject } from './version-object';
    import type { ProjectObject } from './project-object';
    import type { DataObjectObject } from './data-object-object';
    import type { RuleObject } from './rule-object';
    import type { RuleService } from './rule-service';
    import type { Ruleset } from './ruleset';
    /**
     * Representation of the 'Project' schema.
     */
    export type Project = {
      /**
       * Type of resource
       */
      'Type'?: 'ProjectVersion';
      'Version'?: VersionObject;
      'Project'?: ProjectObject[];
      'DataObject'?: DataObjectObject[];
      'Rule'?: RuleObject[];
      'RuleService'?: RuleService[];
      'Ruleset'?: Ruleset[];
    } | Record<string, any>;
